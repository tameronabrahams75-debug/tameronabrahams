import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Sparkles, Mail, FileText, ListChecks, Search, MessageSquare, ShieldCheck, Zap, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ProductivAI Assistant — AI-powered Workplace Productivity" },
      { name: "description", content: "Generate emails, summarize meetings, plan tasks, research topics, and chat — all powered by AI." },
    ],
  }),
  component: Landing,
});

const features = [
  { icon: Mail, title: "Smart Email Generator", desc: "Draft polished emails in seconds with the right tone for every audience." },
  { icon: FileText, title: "Meeting Summarizer", desc: "Turn long transcripts into decisions, action items, and deadlines." },
  { icon: ListChecks, title: "AI Task Planner", desc: "Generate prioritized daily and weekly schedules tailored to your goals." },
  { icon: Search, title: "Research Assistant", desc: "Summarize articles and topics with key insights and recommendations." },
  { icon: MessageSquare, title: "AI Chat", desc: "An always-on workplace assistant ready for any productivity question." },
  { icon: ShieldCheck, title: "Responsible AI", desc: "Transparent disclaimers and review prompts on every output." },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-primary shadow-glow">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-display text-lg font-bold">ProductivAI</span>
          </Link>
          <nav className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm"><Link to="/chat">Try Chat</Link></Button>
            <Button asChild size="sm" className="bg-gradient-primary shadow-glow hover:opacity-90">
              <Link to="/dashboard">Open App <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </nav>
        </div>
      </header>

      <section className="relative overflow-hidden bg-hero">
        <div className="mx-auto max-w-7xl px-6 py-24 md:py-32 text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border bg-card/50 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
            <Zap className="h-3 w-3 text-primary" /> Powered by Lovable AI · No setup required
          </div>
          <h1 className="mt-6 text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight">
            Your AI workplace<br />
            <span className="gradient-text">productivity assistant</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Automate emails, meetings, planning, and research. ProductivAI helps professionals,
            students and teams work faster, communicate clearer, and decide smarter.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" className="bg-gradient-primary shadow-glow hover:opacity-90">
              <Link to="/dashboard">Launch Dashboard <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/email">Generate an Email</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold">Everything you need to work smarter</h2>
          <p className="mt-3 text-muted-foreground">Six AI-powered tools, one elegant workspace.</p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="group relative rounded-2xl border bg-card p-6 shadow-soft transition-smooth hover:shadow-elevated hover:-translate-y-1">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-primary shadow-glow">
                <f.icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t bg-muted/30">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">Built with responsible AI in mind</h2>
          <p className="mt-4 text-muted-foreground">
            ProductivAI shows transparent disclaimers, encourages review of generated content, and avoids
            harmful or biased outputs. You're always in control.
          </p>
          <Button asChild size="lg" className="mt-8 bg-gradient-primary shadow-glow hover:opacity-90">
            <Link to="/dashboard">Get Started Free</Link>
          </Button>
        </div>
      </section>

      <footer className="border-t">
        <div className="mx-auto max-w-7xl px-6 py-8 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} ProductivAI Assistant · AI outputs may be inaccurate — please review before use.
        </div>
      </footer>
    </div>
  );
}
