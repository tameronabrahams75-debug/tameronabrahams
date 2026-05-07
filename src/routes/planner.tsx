import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Markdown } from "@/components/Markdown";
import { streamAI } from "@/lib/ai-stream";
import { toast } from "sonner";
import { Sparkles, Loader2, Copy } from "lucide-react";

export const Route = createFileRoute("/planner")({
  head: () => ({ meta: [{ title: "Task Planner — ProductivAI" }] }),
  component: Planner,
});

function Planner() {
  const [tasks, setTasks] = useState("");
  const [horizon, setHorizon] = useState("Daily");
  const [hours, setHours] = useState("8");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const run = async () => {
    if (!tasks.trim()) { toast.error("List your tasks first"); return; }
    setLoading(true); setOutput("");
    const prompt = `Create a ${horizon.toLowerCase()} schedule with about ${hours} working hours per day.
Tasks & goals:
${tasks}

For each task estimate time, assign priority (High / Medium / Low), and group by category. End with productivity tips.`;
    await streamAI({
      mode: "planner", input: prompt,
      onDelta: (c) => setOutput((p) => p + c),
      onDone: () => setLoading(false),
      onError: (m) => { toast.error(m); setLoading(false); },
    });
  };

  return (
    <AppLayout title="AI Task Planner" subtitle="Smart, prioritized schedules in seconds">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border bg-card p-6 shadow-soft space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Plan horizon</Label>
              <Select value={horizon} onValueChange={setHorizon}>
                <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Daily">Daily</SelectItem>
                  <SelectItem value="Weekly">Weekly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Hours / day</Label>
              <Select value={hours} onValueChange={setHours}>
                <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {["4","6","8","10"].map(h => <SelectItem key={h} value={h}>{h}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label>Tasks & goals</Label>
            <Textarea className="mt-1.5" rows={12} placeholder="• Finish Q4 report&#10;• Call with client at 2pm&#10;• Review pull requests..." value={tasks} onChange={(e) => setTasks(e.target.value)} />
          </div>
          <Button onClick={run} disabled={loading} className="w-full bg-gradient-primary shadow-glow hover:opacity-90">
            {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Planning</> : <><Sparkles className="mr-2 h-4 w-4" />Generate Plan</>}
          </Button>
        </div>
        <div className="rounded-2xl border bg-card p-6 shadow-soft min-h-[500px]">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Your Plan</h3>
            <Button variant="ghost" size="sm" disabled={!output} onClick={() => { navigator.clipboard.writeText(output); toast.success("Copied"); }}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <div className="rounded-lg bg-muted/30 p-4 min-h-[400px]">
            {output ? <Markdown>{output}</Markdown> : <p className="text-sm text-muted-foreground">Your prioritized schedule will appear here.</p>}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
