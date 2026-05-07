import type { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/lib/theme";

export function AppLayout({ children, title, subtitle }: { children: ReactNode; title?: string; subtitle?: string }) {
  const { theme, toggle } = useTheme();
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-2 border-b bg-background/80 px-4 backdrop-blur">
            <div className="flex items-center gap-3">
              <SidebarTrigger />
              {title && (
                <div className="flex flex-col leading-tight">
                  <h1 className="text-sm font-semibold">{title}</h1>
                  {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
                </div>
              )}
            </div>
            <Button variant="ghost" size="icon" onClick={toggle} aria-label="Toggle theme">
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </header>
          <main className="flex-1 p-4 md:p-8">{children}</main>
          <footer className="border-t px-6 py-3 text-center text-xs text-muted-foreground">
            ⚠️ AI-generated content may be inaccurate. Always review before sending or sharing.
          </footer>
        </div>
      </div>
    </SidebarProvider>
  );
}
