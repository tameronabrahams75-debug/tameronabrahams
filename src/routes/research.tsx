import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Markdown } from "@/components/Markdown";
import { streamAI } from "@/lib/ai-stream";
import { toast } from "sonner";
import { Search, Loader2, Copy } from "lucide-react";

export const Route = createFileRoute("/research")({
  head: () => ({ meta: [{ title: "Research Assistant — ProductivAI" }] }),
  component: Research,
});

function Research() {
  const [query, setQuery] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const run = async () => {
    if (!query.trim()) { toast.error("Enter a topic, question, or paste an article"); return; }
    setLoading(true); setOutput("");
    await streamAI({
      mode: "research", input: query,
      onDelta: (c) => setOutput((p) => p + c),
      onDone: () => setLoading(false),
      onError: (m) => { toast.error(m); setLoading(false); },
    });
  };

  return (
    <AppLayout title="AI Research Assistant" subtitle="Summaries, insights & recommendations">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="rounded-2xl border bg-card p-6 shadow-soft">
          <div className="flex items-center gap-2 rounded-xl border bg-background p-2 shadow-soft">
            <Search className="ml-2 h-4 w-4 text-muted-foreground" />
            <Textarea
              rows={2}
              className="border-0 shadow-none focus-visible:ring-0 resize-none"
              placeholder="Research a topic, paste an article, or ask a question..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button onClick={run} disabled={loading} className="bg-gradient-primary shadow-glow hover:opacity-90">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Research"}
            </Button>
          </div>
        </div>

        <div className="rounded-2xl border bg-card p-6 shadow-soft min-h-[400px]">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Insights</h3>
            <Button variant="ghost" size="sm" disabled={!output} onClick={() => { navigator.clipboard.writeText(output); toast.success("Copied"); }}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <div className="rounded-lg bg-muted/30 p-4 min-h-[300px]">
            {output ? <Markdown>{output}</Markdown> : <p className="text-sm text-muted-foreground">Insights, simplified explanations, and recommendations will appear here.</p>}
          </div>
          <p className="mt-3 text-[11px] text-muted-foreground">⚠️ AI summaries can omit nuance — verify critical facts independently.</p>
        </div>
      </div>
    </AppLayout>
  );
}
