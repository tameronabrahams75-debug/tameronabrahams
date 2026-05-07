import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { useTheme } from "@/lib/theme";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Moon, Sun, ShieldCheck, Sparkles } from "lucide-react";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings — ProductivAI" }] }),
  component: Settings,
});

function Settings() {
  const { theme, toggle } = useTheme();
  return (
    <AppLayout title="Settings" subtitle="Customize your ProductivAI experience">
      <div className="mx-auto max-w-3xl space-y-6">
        <section className="rounded-2xl border bg-card p-6 shadow-soft">
          <h3 className="font-semibold flex items-center gap-2"><Sparkles className="h-4 w-4 text-primary" /> Appearance</h3>
          <div className="mt-4 flex items-center justify-between rounded-xl border p-4">
            <div className="flex items-center gap-3">
              {theme === "dark" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              <div>
                <Label>Dark mode</Label>
                <p className="text-xs text-muted-foreground">Switch between light and dark themes.</p>
              </div>
            </div>
            <Switch checked={theme === "dark"} onCheckedChange={toggle} />
          </div>
        </section>

        <section className="rounded-2xl border bg-card p-6 shadow-soft">
          <h3 className="font-semibold flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" /> Responsible AI</h3>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li>• AI-generated content may contain inaccuracies — always review before sharing.</li>
            <li>• ProductivAI does not store conversations on your device beyond this session.</li>
            <li>• Avoid pasting confidential or personally-identifying information.</li>
            <li>• Outputs are filtered to reduce harmful or biased content but are not guaranteed to be free of bias.</li>
          </ul>
        </section>

        <section className="rounded-2xl border bg-card p-6 shadow-soft">
          <h3 className="font-semibold">About</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            ProductivAI Assistant · v1.0 · Powered by Lovable AI
          </p>
          <Button variant="outline" className="mt-4">Send feedback</Button>
        </section>
      </div>
    </AppLayout>
  );
}
