import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function StatCard({
  label,
  value,
  sub,
  icon,
  tone = "primary",
  delay = 0,
}: {
  label: string;
  value: ReactNode;
  sub?: ReactNode;
  icon?: ReactNode;
  tone?: "primary" | "success" | "warning" | "destructive" | "info";
  delay?: number;
}) {
  const toneRing: Record<string, string> = {
    primary: "bg-primary/10 text-primary",
    success: "bg-success/12 text-success",
    warning: "bg-warning/18 text-warning-foreground",
    destructive: "bg-destructive/10 text-destructive",
    info: "bg-info/12 text-info",
  };
  return (
    <div className="glass-kpi rise-in p-4" style={{ animationDelay: `${delay}ms` }}>
      <div className="relative flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.09em] text-muted-foreground">{label}</p>
          <p className="num mt-2 truncate text-2xl font-bold text-foreground">{value}</p>
          {sub ? <p className="mt-1 text-xs text-muted-foreground">{sub}</p> : null}
        </div>
        {icon ? (
          <span className={cn("grid size-10 shrink-0 place-items-center rounded-lg", toneRing[tone])}>{icon}</span>
        ) : null}
      </div>
    </div>
  );
}

export function StatusChip({ status }: { status: string }) {
  const map: Record<string, string> = {
    Paid: "bg-success/12 text-success border-success/25",
    Success: "bg-success/12 text-success border-success/25",
    Active: "bg-success/12 text-success border-success/25",
    Excellent: "bg-success/12 text-success border-success/25",
    Allotted: "bg-primary/10 text-primary border-primary/25",
    Unpaid: "bg-info/12 text-info border-info/25",
    Pending: "bg-info/12 text-info border-info/25",
    Vacant: "bg-muted text-muted-foreground border-border",
    Inactive: "bg-muted text-muted-foreground border-border",
    Cancelled: "bg-muted text-muted-foreground border-border",
    "Partially Paid": "bg-warning/20 text-warning-foreground border-warning/35",
    Average: "bg-warning/20 text-warning-foreground border-warning/35",
    Suspended: "bg-warning/20 text-warning-foreground border-warning/35",
    Poor: "bg-saffron/18 text-foreground border-saffron/40",
    Overdue: "bg-destructive/10 text-destructive border-destructive/25",
    Failed: "bg-destructive/10 text-destructive border-destructive/25",
    Critical: "bg-destructive/10 text-destructive border-destructive/25",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold whitespace-nowrap",
        map[status] ?? "bg-muted text-muted-foreground border-border",
      )}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

export function PageHeader({
  title,
  description,
  breadcrumb,
  actions,
}: {
  title: string;
  description?: string;
  breadcrumb: string[];
  actions?: ReactNode;
}) {
  return (
    <div className="rise-in mb-5 flex flex-wrap items-end justify-between gap-4">
      <div>
        <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
          {breadcrumb.map((b, i) => (
            <span key={b} className="flex items-center gap-1.5">
              {i > 0 && <span className="opacity-50">/</span>}
              <span className={i === breadcrumb.length - 1 ? "font-semibold text-primary" : ""}>{b}</span>
            </span>
          ))}
        </nav>
        <h1 className="mt-1.5 text-2xl font-bold tracking-tight">{title}</h1>
        {description ? <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{description}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
    </div>
  );
}

export function SectionCard({
  title,
  description,
  actions,
  children,
  className,
}: {
  title?: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("surface-card rise-in overflow-hidden", className)}>
      {title ? (
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3">
          <div>
            <h2 className="text-sm font-bold tracking-tight">{title}</h2>
            {description ? <p className="mt-0.5 text-xs text-muted-foreground">{description}</p> : null}
          </div>
          {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
        </header>
      ) : null}
      {children}
    </section>
  );
}

export function Pager({ from, to, total }: { from: number; to: number; total: number }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-4 py-3 text-xs text-muted-foreground">
      <span className="num">
        Showing {from}–{to} of {total.toLocaleString("en-IN")} records
      </span>
      <div className="flex items-center gap-1">
        <button className="rounded-md border border-border px-2.5 py-1 font-medium hover:bg-muted" type="button">
          Previous
        </button>
        {[1, 2, 3, 4].map((p) => (
          <button
            key={p}
            type="button"
            className={cn(
              "num rounded-md border px-2.5 py-1 font-medium",
              p === 1 ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-muted",
            )}
          >
            {p}
          </button>
        ))}
        <span className="px-1">…</span>
        <button className="rounded-md border border-border px-2.5 py-1 font-medium hover:bg-muted" type="button">
          Next
        </button>
      </div>
    </div>
  );
}
