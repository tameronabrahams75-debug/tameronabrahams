import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Markdown } from "@/components/Markdown";
import { streamAI } from "@/lib/ai-stream";
import { toast } from "sonner";
import { Copy, RotateCw, Sparkles, Loader2 } from "lucide-react";

export const Route = createFileRoute("/email")({
  head: () => ({ meta: [{ title: "Email Generator — ProductivAI" }] }),
  component: EmailGen,
});

function EmailGen() {
  const [purpose, setPurpose] = useState("");
  const [audience, setAudience] = useState("Client");
  const [tone, setTone] = useState("Formal");
  const [context, setContext] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!purpose.trim()) { toast.error("Please describe the email purpose"); return; }
    setLoading(true); setOutput("");
    const prompt = `Write a ${tone.toLowerCase()} email to a ${audience.toLowerCase()}.
Purpose: ${purpose}
${context ? `Additional context: ${context}` : ""}`;
    await streamAI({
      mode: "email",
      input: prompt,
      onDelta: (c) => setOutput((p) => p + c),
      onDone: () => setLoading(false),
      onError: (m) => { toast.error(m); setLoading(false); },
    });
  };

  const copy = () => {
    navigator.clipboard.writeText(output);
    toast.success("Copied to clipboard");
  };

  return (
    <AppLayout title="Smart Email Generator" subtitle="Draft polished emails in seconds">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border bg-card p-6 shadow-soft space-y-4">
          <div>
            <Label>Email purpose</Label>
            <Input className="mt-1.5" placeholder="e.g. Follow up on yesterday's proposal" value={purpose} onChange={(e) => setPurpose(e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Audience</Label>
              <Select value={audience} onValueChange={setAudience}>
                <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Client">Client</SelectItem>
                  <SelectItem value="Manager">Manager</SelectItem>
                  <SelectItem value="Team Member">Team Member</SelectItem>
                  <SelectItem value="Customer">Customer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Tone</Label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Formal">Formal</SelectItem>
                  <SelectItem value="Friendly">Friendly</SelectItem>
                  <SelectItem value="Persuasive">Persuasive</SelectItem>
                  <SelectItem value="Informal">Informal</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label>Additional context (optional)</Label>
            <Textarea className="mt-1.5" rows={5} placeholder="Names, dates, key points to include..." value={context} onChange={(e) => setContext(e.target.value)} />
          </div>
          <Button onClick={generate} disabled={loading} className="w-full bg-gradient-primary shadow-glow hover:opacity-90">
            {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Generating</> : <><Sparkles className="mr-2 h-4 w-4" />Generate Email</>}
          </Button>
        </div>

        <div className="rounded-2xl border bg-card p-6 shadow-soft min-h-[400px] flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Preview</h3>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" disabled={!output || loading} onClick={generate}><RotateCw className="h-4 w-4" /></Button>
              <Button variant="ghost" size="sm" disabled={!output} onClick={copy}><Copy className="h-4 w-4" /></Button>
            </div>
          </div>
          <div className="flex-1 rounded-lg bg-muted/30 p-4 overflow-auto">
            {output ? <Markdown>{output}</Markdown> : <p className="text-sm text-muted-foreground">Your generated email will appear here.</p>}
          </div>
          <p className="mt-3 text-[11px] text-muted-foreground">⚠️ Review for accuracy and tone before sending.</p>
        </div>
      </div>
    </AppLayout>
  );
}
