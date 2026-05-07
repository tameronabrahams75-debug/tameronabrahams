import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Markdown } from "@/components/Markdown";
import { streamAI } from "@/lib/ai-stream";
import { toast } from "sonner";
import { Copy, Sparkles, Loader2 } from "lucide-react";

export const Route = createFileRoute("/summarize")({
  head: () => ({ meta: [{ title: "Meeting Summarizer — ProductivAI" }] }),
  component: Summarize,
});

function Summarize() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const run = async () => {
    if (input.trim().length < 30) { toast.error("Paste meeting notes (at least 30 characters)"); return; }
    setLoading(true); setOutput("");
    await streamAI({
      mode: "summarize", input,
      onDelta: (c) => setOutput((p) => p + c),
      onDone: () => setLoading(false),
      onError: (m) => { toast.error(m); setLoading(false); },
    });
  };

  return (
    <AppLayout title="Meeting Summarizer" subtitle="Notes → decisions, action items & deadlines">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border bg-card p-6 shadow-soft space-y-3">
          <h3 className="font-semibold">Paste meeting notes / transcript</h3>
          <Textarea rows={18} placeholder="Paste the full meeting transcript or notes here..." value={input} onChange={(e) => setInput(e.target.value)} />
          <Button onClick={run} disabled={loading} className="w-full bg-gradient-primary shadow-glow hover:opacity-90">
            {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Summarizing</> : <><Sparkles className="mr-2 h-4 w-4" />Summarize</>}
          </Button>
        </div>
        <div className="rounded-2xl border bg-card p-6 shadow-soft min-h-[500px]">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Summary</h3>
            <Button variant="ghost" size="sm" disabled={!output} onClick={() => { navigator.clipboard.writeText(output); toast.success("Copied"); }}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <div className="rounded-lg bg-muted/30 p-4 min-h-[400px]">
            {output ? <Markdown>{output}</Markdown> : <p className="text-sm text-muted-foreground">Your structured summary will appear here.</p>}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
