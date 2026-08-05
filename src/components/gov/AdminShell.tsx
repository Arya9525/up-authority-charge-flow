import {
  Link,
  useRouterState,
  useNavigate,
} from "@tanstack/react-router";
import {
  LayoutDashboard,
  Layers3,
  Grid2x2,
  FileSignature,
  Users,
  IndianRupee,
  CalendarClock,
  ReceiptText,
  CreditCard,
  BarChart3,
  ShieldCheck,
  Settings,
  Building2,
  Bell,
  Search,
  LogOut,
  ChevronRight,
} from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type NavItem = { to: string; label: string; icon: typeof LayoutDashboard; exact?: boolean };

const nav: { group: string; items: NavItem[] }[] = [
  { group: "Overview", items: [{ to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true }] },
  {
    group: "Masters",
    items: [
      { to: "/admin/schemes", label: "Scheme Management", icon: Layers3 },
      { to: "/admin/plots", label: "Plot Management", icon: Grid2x2 },
      { to: "/admin/allotment", label: "Plot Allotment", icon: FileSignature },
      { to: "/admin/allottees", label: "Allottee Management", icon: Users },
      { to: "/admin/rates", label: "Rate Master", icon: IndianRupee },
    ],
  },
  {
    group: "Revenue Operations",
    items: [
      { to: "/admin/demand", label: "Monthly Demand Generation", icon: CalendarClock },
      { to: "/admin/bills", label: "Bills", icon: ReceiptText },
      { to: "/admin/payments", label: "Payments", icon: CreditCard },
      { to: "/admin/reports", label: "Reports", icon: BarChart3 },
    ],
  },
  {
    group: "Administration",
    items: [
      { to: "/admin/users", label: "User Management", icon: ShieldCheck },
      { to: "/admin/settings", label: "Settings", icon: Settings },
    ],
  },
];

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const navigate = useNavigate();

const logout = () => {
  localStorage.removeItem("loggedIn");
  localStorage.removeItem("role");

  window.location.href = "/login";
};

const switchToPortal = () => {
  localStorage.removeItem("loggedIn");
  localStorage.removeItem("role");

  window.location.href = "/login";
};
  return (
    <div className="min-h-screen w-full bg-background">
      <div className="ashoka-strip h-1 w-full" />
      <div className="flex">
        {/* Sidebar */}
        <aside className="sticky top-0 hidden h-screen w-[264px] shrink-0 flex-col overflow-y-auto bg-sidebar text-sidebar-foreground lg:flex">
          <div className="flex items-center gap-3 border-b border-sidebar-border px-4 py-4">
            <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-sidebar-primary/20 text-sidebar-primary-foreground">
              <Building2 className="size-5" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-sidebar-accent-foreground">UC-MS Portal</p>
              <p className="truncate text-[11px] text-sidebar-foreground/70">Govt. of Uttar Pradesh</p>
            </div>
          </div>

          <nav className="flex-1 space-y-5 px-3 py-4">
            {nav.map((section) => (
              <div key={section.group}>
                <p className="px-2 pb-2 text-[10px] font-bold uppercase tracking-[0.14em] text-sidebar-foreground/50">
                  {section.group}
                </p>
                <ul className="space-y-0.5">
                  {section.items.map((item) => {
                    const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
                    return (
                      <li key={item.to}>
                        <Link
                          to={item.to}
                          className={cn(
                            "group flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] font-medium transition-colors",
                            active
                              ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                              : "text-sidebar-foreground/85 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                          )}
                        >
                          <item.icon className="size-4 shrink-0" />
                          <span className="truncate">{item.label}</span>
                          {active && <ChevronRight className="ml-auto size-3.5 opacity-80" />}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>

          <div className="border-t border-sidebar-border p-3">
            <button
  onClick={switchToPortal}
  className="flex w-full items-center gap-2 rounded-lg bg-sidebar-accent px-3 py-2 text-xs font-semibold text-sidebar-accent-foreground hover:opacity-90"
>
  <Users className="size-4" />
  Switch to Allottee Portal
</button>
            <p className="mt-3 px-1 text-[10px] leading-relaxed text-sidebar-foreground/50">
              NIC Cloud • v3.4.1 • Last sync 05 Aug 2026, 09:45 AM
            </p>
          </div>
        </aside>

        {/* Main */}
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-20 border-b border-border bg-card/85 backdrop-blur-md">
            <div className="flex items-center gap-3 px-4 py-3">
              <div className="hidden min-w-0 flex-1 items-center gap-2 rounded-lg border border-border bg-muted/60 px-3 py-2 md:flex">
                <Search className="size-4 shrink-0 text-muted-foreground" />
                <input
                  placeholder="Search scheme, plot number, allottee, bill number or receipt…"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
                <kbd className="rounded border border-border bg-card px-1.5 py-0.5 text-[10px] text-muted-foreground">
                  Ctrl K
                </kbd>
              </div>
              <div className="flex flex-1 items-center gap-2 md:hidden">
                <span className="text-sm font-bold">UC-MS Admin</span>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <span className="hidden rounded-md border border-border bg-muted/60 px-2.5 py-1.5 text-[11px] font-semibold text-muted-foreground xl:inline">
                  FY 2026-27 • Q2
                </span>
                <button
                  type="button"
                  className="relative grid size-9 place-items-center rounded-lg border border-border bg-card hover:bg-muted"
                >
                  <Bell className="size-4" />
                  <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-destructive" />
                </button>
                <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-2 py-1.5">
                  <span className="grid size-7 place-items-center rounded-md bg-primary text-[11px] font-bold text-primary-foreground">
                    AM
                  </span>
                  <div className="hidden leading-tight sm:block">
                    <p className="text-xs font-semibold">Anurag Mishra, IAS</p>
                    <p className="text-[10px] text-muted-foreground">Vice Chairman • LDA</p>
                  </div>
                  <button
  onClick={logout}
  className="ml-1 rounded-md p-1 transition hover:bg-muted"
  title="Logout"
>
  <LogOut className="size-4 text-muted-foreground" />
</button>
                </div>
              </div>
            </div>
          </header>

          <main className="min-w-0 flex-1 p-4 md:p-6">{children}</main>

          <footer className="border-t border-border bg-card px-6 py-4 text-[11px] text-muted-foreground">
            © 2026 Housing &amp; Urban Planning Department, Government of Uttar Pradesh. Designed &amp; hosted by
            National Informatics Centre. This is a demonstration prototype.
          </footer>
        </div>
      </div>
    </div>
  );
}
