import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { Landmark, LayoutDashboard, CreditCard, ReceiptText, Bell, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { currentAllottee } from "@/lib/prototype-data";

export const Route = createFileRoute("/portal")({
  head: () => ({
    meta: [
      { title: "Allottee Self-Service Portal | UP User Charge System" },
      { name: "description", content: "View your monthly user charge bill, pending arrear and pay online with instant digital receipts." },
      { property: "og:title", content: "Allottee Self-Service Portal | UP User Charge System" },
      { property: "og:description", content: "Monthly bill, arrear summary, online payment and receipt download for plot allottees." },
    ],
  }),
  component: PortalLayout,
});

const links = [
  { to: "/portal", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/portal/pay", label: "Pay Online", icon: CreditCard },
  { to: "/portal/history", label: "Payment History", icon: ReceiptText },
  { to: "/portal/notifications", label: "Notifications", icon: Bell },
];

function PortalLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="min-h-screen bg-background">
      <div className="ashoka-strip h-1.5 w-full" />
      <header className="gradient-header">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-5 py-4">
          <span className="grid size-11 place-items-center rounded-xl bg-white/15"><Landmark className="size-5" /></span>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] opacity-80">Allottee Self-Service</p>
            <h1 className="truncate text-lg font-bold">User Charge Portal</h1>
          </div>
          <Link to="/admin" className="rounded-lg bg-white/15 px-3 py-1.5 text-[11px] font-semibold">
            <ShieldCheck className="mr-1 inline size-3.5" /> Admin Portal
          </Link>
          <div className="flex items-center gap-2 rounded-lg bg-white/15 px-2.5 py-1.5">
            <span className="grid size-7 place-items-center rounded-md bg-white/25 text-[11px] font-bold">RS</span>
            <div className="hidden leading-tight sm:block">
              <p className="text-xs font-semibold">{currentAllottee.name}</p>
              <p className="num text-[10px] opacity-80">{currentAllottee.allotteeCode}</p>
            </div>
          </div>
        </div>
        <nav className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-5">
          {links.map((l) => {
            const active = l.exact ? pathname === l.to : pathname.startsWith(l.to);
            return (
              <Link
                key={l.to}
                to={l.to}
                className={cn(
                  "flex items-center gap-1.5 rounded-t-lg px-3.5 py-2.5 text-xs font-semibold whitespace-nowrap",
                  active ? "bg-background text-primary" : "text-primary-foreground/85 hover:bg-white/10",
                )}
              >
                <l.icon className="size-3.5" /> {l.label}
              </Link>
            );
          })}
        </nav>
      </header>
      <main className="mx-auto max-w-6xl px-5 py-6">
        <Outlet />
      </main>
      <footer className="border-t border-border bg-card px-5 py-4 text-center text-[11px] text-muted-foreground">
        © 2026 Housing &amp; Urban Planning Department, Govt. of Uttar Pradesh • Helpline 1800-180-5555
      </footer>
    </div>
  );
}
