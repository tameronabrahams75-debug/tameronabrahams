import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Markdown } from "@/components/Markdown";
import { streamAI, type ChatMsg } from "@/lib/ai-stream";
import { toast } from "sonner";
import { Send, Sparkles, Loader2, Trash2 } from "lucide-react";

export const Route = createFileRoute("/chat")({
  head: () => ({ meta: [{ title: "AI Chat — ProductivAI" }] }),
  component: Chat,
});

const SUGGESTIONS = [
  "Help me prepare for a 1:1 with my manager",
  "Draft an OKR for Q1 product growth",
  "Summarize the benefits of async communication",
  "Give me 5 tips to run efficient stand-ups",
];

function Chat() {
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const send = async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || loading) return;
    setInput("");
    const userMsg: ChatMsg = { role: "user", content };
    const next = [...messages, userMsg];
    setMessages(next);
    setLoading(true);

    let acc = "";
    setMessages((m) => [...m, { role: "assistant", content: "" }]);
    await streamAI({
      mode: "chat",
      messages: next,
      onDelta: (c) => {
        acc += c;
        setMessages((m) => {
          const copy = [...m];
          copy[copy.length - 1] = { role: "assistant", content: acc };
          return copy;
        });
      },
      onDone: () => setLoading(false),
      onError: (msg) => {
        toast.error(msg);
        setLoading(false);
        setMessages((m) => m.slice(0, -1));
      },
    });
  };

  return (
    <AppLayout title="AI Chat" subtitle="Your always-on workplace assistant">
      <div className="mx-auto flex h-[calc(100vh-9rem)] max-w-4xl flex-col rounded-2xl border bg-card shadow-soft">
        <div className="flex items-center justify-between border-b px-5 py-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary shadow-glow">
              <Sparkles className="h-4 w-4 text-primary-foreground" />
            </div>
            <div>
              <p className="text-sm font-semibold">ProductivAI</p>
              <p className="text-[11px] text-muted-foreground">Online · ready to help</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setMessages([])} disabled={!messages.length}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-primary shadow-glow">
                <Sparkles className="h-7 w-7 text-primary-foreground" />
              </div>
              <h3 className="mt-4 text-xl font-semibold">How can I help today?</h3>
              <p className="mt-1 text-sm text-muted-foreground">Ask me anything about your work.</p>
              <div className="mt-6 grid w-full max-w-lg gap-2 sm:grid-cols-2">
                {SUGGESTIONS.map((s) => (
                  <button key={s} onClick={() => send(s)} className="rounded-xl border bg-background p-3 text-left text-sm transition-smooth hover:border-primary hover:shadow-soft">
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                  m.role === "user"
                    ? "bg-gradient-primary text-primary-foreground shadow-glow"
                    : "bg-muted text-foreground"
                }`}>
                  {m.role === "assistant"
                    ? (m.content ? <Markdown>{m.content}</Markdown> : <Loader2 className="h-4 w-4 animate-spin" />)
                    : <p className="whitespace-pre-wrap">{m.content}</p>}
                </div>
              </div>
            ))
          )}
          <div ref={endRef} />
        </div>

        <form className="border-t p-3" onSubmit={(e) => { e.preventDefault(); send(); }}>
          <div className="flex items-end gap-2">
            <Textarea
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
              placeholder="Message ProductivAI..."
              className="resize-none min-h-[44px] max-h-40"
            />
            <Button type="submit" disabled={loading || !input.trim()} className="bg-gradient-primary shadow-glow hover:opacity-90">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </div>
          <p className="mt-2 text-[11px] text-muted-foreground text-center">AI may produce inaccurate info — please verify before relying on it.</p>
        </form>
      </div>
    </AppLayout>
  );
}
