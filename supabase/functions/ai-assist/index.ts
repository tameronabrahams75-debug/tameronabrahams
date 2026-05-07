// AI assistant edge function for ProductivAI
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPTS: Record<string, string> = {
  email: `You are a professional email writer. Generate a polished email based on the user's specification.
Always respond with this exact format:
Subject: <a clear subject line>

<email body in plain text, properly formatted with greeting, body paragraphs, and sign-off>

Adapt tone and audience as requested. Be concise, clear, and professional.`,

  summarize: `You are a meeting notes analyst. From the provided notes/transcript, output STRICT markdown using exactly these sections:
## Summary
A 2-3 sentence overview.
## Key Discussion Points
- bullet list
## Decisions Made
- bullet list
## Action Items
- **Owner** — Task — _Deadline (if mentioned, else "TBD")_
## Deadlines
- list dates with context, or "None mentioned"`,

  planner: `You are a productivity coach building an actionable schedule. Output markdown:
## Schedule
A time-blocked plan as a list (e.g. "**09:00 – 10:30** — Task — _High priority · ~90 min · Deep Work_").
## Priorities
Group tasks by priority (High / Medium / Low).
## Productivity Tips
3-5 tailored tips.`,

  research: `You are a research assistant. Given a topic or text, return markdown:
## TL;DR
One paragraph plain-language summary.
## Key Insights
- 4-6 bullet insights
## Simplified Explanation
A short, easy-to-understand explanation as if to a smart non-expert.
## Recommendations
- actionable next steps`,

  chat: `You are ProductivAI, a friendly, concise workplace productivity assistant. Help with emails, planning, summarizing, research, and general work questions. Use markdown when helpful. Always remind users to review AI-generated content before acting on it when stakes are high.`,
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { mode, messages, input } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const system = SYSTEM_PROMPTS[mode] ?? SYSTEM_PROMPTS.chat;
    const chatMessages = messages
      ? messages
      : [{ role: "user", content: input ?? "" }];

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [{ role: "system", content: system }, ...chatMessages],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429)
        return new Response(JSON.stringify({ error: "Rate limit reached. Please try again in a moment." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      if (response.status === 402)
        return new Response(JSON.stringify({ error: "AI credits exhausted. Add credits in Settings → Workspace → Usage." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("ai-assist error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
