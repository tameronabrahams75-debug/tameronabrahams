import { createFileRoute, Link } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { Mail, FileText, ListChecks, Search, MessageSquare, TrendingUp, Clock, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — ProductivAI" }] }),
  component: Dashboard,
});

const tools = [
  { to: "/email", icon: Mail, title: "Email Generator", desc: "Draft polished emails by purpose, tone & audience." },
  { to: "/summarize", icon: FileText, title: "Meeting Summarizer", desc: "Distill notes into decisions and action items." },
  { to: "/planner", icon: ListChecks, title: "Task Planner", desc: "Daily & weekly plans, prioritized for you." },
  { to: "/research", icon: Search, title: "Research Assistant", desc: "Summaries, insights & recommendations." },
  { to: "/chat", icon: MessageSquare, title: "AI Chat", desc: "Ask anything — your always-on assistant." },
];

const stats = [
  { label: "Tasks automated this week", value: "37", icon: CheckCircle2 },
  { label: "Hours saved", value: "12.5", icon: Clock },
  { label: "Productivity uplift", value: "+28%", icon: TrendingUp },
];

function Dashboard() {
  return (
    <AppLayout title="Dashboard" subtitle="Your AI productivity command center">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="rounded-3xl border bg-hero p-8 md:p-10 shadow-soft">
          <div className="inline-flex items-center gap-2 rounded-full border bg-card/60 px-3 py-1 text-xs backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" /> AI ready
          </div>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold">Good to see you 👋</h2>
          <p className="mt-2 max-w-xl text-muted-foreground">
            Pick a tool below or start a chat. Everything you create can be copied, refined, or regenerated.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl border bg-card p-5 shadow-soft">
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">{s.label}</p>
                <s.icon className="h-4 w-4 text-primary" />
              </div>
              <p className="mt-2 text-3xl font-bold font-display">{s.value}</p>
            </div>
          ))}
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">AI Tools</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((t) => (
              <Link key={t.to} to={t.to} className="group rounded-2xl border bg-card p-6 shadow-soft transition-smooth hover:shadow-elevated hover:-translate-y-0.5">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-primary shadow-glow">
                  <t.icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <h4 className="mt-4 font-semibold">{t.title}</h4>
                <p className="mt-1 text-sm text-muted-foreground">{t.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
