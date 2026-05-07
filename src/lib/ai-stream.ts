const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-assist`;

export type ChatMsg = { role: "user" | "assistant"; content: string };

export async function streamAI({
  mode,
  messages,
  input,
  onDelta,
  onDone,
  onError,
}: {
  mode: "email" | "summarize" | "planner" | "research" | "chat";
  messages?: ChatMsg[];
  input?: string;
  onDelta: (chunk: string) => void;
  onDone: () => void;
  onError?: (msg: string) => void;
}) {
  try {
    const resp = await fetch(CHAT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({ mode, messages, input }),
    });

    if (!resp.ok || !resp.body) {
      let msg = "Request failed";
      try {
        const data = await resp.json();
        msg = data.error || msg;
      } catch {}
      onError?.(msg);
      return;
    }

    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let buf = "";
    let done = false;

    while (!done) {
      const { done: d, value } = await reader.read();
      if (d) break;
      buf += decoder.decode(value, { stream: true });

      let idx: number;
      while ((idx = buf.indexOf("\n")) !== -1) {
        let line = buf.slice(0, idx);
        buf = buf.slice(idx + 1);
        if (line.endsWith("\r")) line = line.slice(0, -1);
        if (!line || line.startsWith(":")) continue;
        if (!line.startsWith("data: ")) continue;
        const json = line.slice(6).trim();
        if (json === "[DONE]") { done = true; break; }
        try {
          const parsed = JSON.parse(json);
          const c = parsed.choices?.[0]?.delta?.content;
          if (c) onDelta(c);
        } catch {
          buf = line + "\n" + buf;
          break;
        }
      }
    }
    onDone();
  } catch (e) {
    onError?.(e instanceof Error ? e.message : "Unknown error");
  }
}
