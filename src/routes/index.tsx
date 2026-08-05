import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Building2,
  ShieldCheck,
  Users,
  ArrowRight,
  ReceiptText,
  CalendarClock,
  FileDown,
  Landmark,
  Lock,
  Megaphone,
} from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { inr, totals } from "@/lib/prototype-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "UP User Charge Management System | Development Authorities" },
      {
        name: "description",
        content:
          "Official portal for monthly user charge demand, online payment, arrear tracking and digital receipts across Uttar Pradesh Development Authorities.",
      },
      { property: "og:title", content: "UP User Charge Management System | Development Authorities" },
      {
        property: "og:description",
        content:
          "Monthly demand generation, online collection, automatic arrear computation and executive dashboards for UP Development Authorities.",
      },
    ],
  }),
  component: RedirectToLogin,
});

const features = [
  { icon: CalendarClock, title: "Monthly Demand Generation", body: "Automated bill run for every allotted plot on the 1st of each month." },
  { icon: ReceiptText, title: "Historical Rate Locking", body: "Arrears retain the rate applicable when the bill was generated — never recalculated." },
  { icon: FileDown, title: "Digital Bill & Receipt", body: "Instant PDF bill download and digitally signed receipt after each payment." },
];

function RedirectToLogin() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate({ to: "/login" });
  }, []);

  return null;
}


function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <div className="ashoka-strip h-1.5 w-full" />

      {/* Top utility bar */}
      <div className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-5 py-2 text-[11px] text-muted-foreground">
          <span>Housing &amp; Urban Planning Department, Government of Uttar Pradesh</span>
          <span className="flex items-center gap-3">
            <span>हिन्दी</span>
            <span className="opacity-40">|</span>
            <span>Screen Reader Access</span>
            <span className="opacity-40">|</span>
            <span>A- A A+</span>
          </span>
        </div>
      </div>

      {/* Masthead */}
      <header className="gradient-header">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-4 px-5 py-6">
          <span className="grid size-14 shrink-0 place-items-center rounded-xl bg-white/15 backdrop-blur">
            <Landmark className="size-7" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] opacity-80">
              विकास प्राधिकरण • Development Authority
            </p>
            <h1 className="text-xl font-bold sm:text-2xl">User Charge Management System</h1>
            <p className="mt-0.5 text-xs opacity-85">
              Unified monthly demand, collection &amp; arrear platform for all UP Development Authorities
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="rounded-md bg-white/15 px-3 py-1.5 font-semibold">FY 2026-27</span>
            <span className="hidden rounded-md bg-white/15 px-3 py-1.5 font-semibold sm:inline">
              8 Authorities Onboarded
            </span>
          </div>
        </div>
      </header>

      {/* Scrolling notice */}
      <div className="flex items-center gap-3 overflow-hidden border-b border-border bg-warning/12 px-5 py-2">
        <span className="flex shrink-0 items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-warning-foreground">
          <Megaphone className="size-3.5" /> Notice
        </span>
        <div className="relative flex-1 overflow-hidden">
          <div className="marquee-track flex w-max gap-10 text-xs whitespace-nowrap text-foreground/80">
            {[0, 1].map((k) => (
              <span key={k} className="flex gap-10">
                <span>August 2026 monthly demand has been generated for 9,076 allotted plots.</span>
                <span>Revised user charge rate of ₹2.75 per sq.m. is pending Board ratification.</span>
                <span>Pay arrears before 15 Sep 2026 to avail waiver of interest under OTS-2026.</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-5 py-10">
        {/* Portal choice */}
        <div className="grid gap-5 lg:grid-cols-2">
          <Link
            to="/admin"
            className="surface-card rise-in group relative overflow-hidden p-6 transition-transform hover:-translate-y-1"
          >
            <span className="grid size-12 place-items-center rounded-xl bg-primary/10 text-primary">
              <ShieldCheck className="size-6" />
            </span>
            <h2 className="mt-4 text-lg font-bold">Authority Admin Portal</h2>
            <p className="mt-1.5 text-sm text-muted-foreground">
              For Vice Chairmen, Secretaries, Finance Controllers and scheme operators — scheme &amp; plot masters, rate
              notification, demand run, collection MIS and recovery heat map.
            </p>
            <ul className="mt-4 grid gap-1.5 text-xs text-muted-foreground sm:grid-cols-2">
              <li>• Executive KPI dashboard</li>
              <li>• Monthly demand generation</li>
              <li>• Defaulter &amp; recovery reports</li>
              <li>• Role based access control</li>
            </ul>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
              Enter Admin Portal <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>

          <Link
            to="/portal"
            className="surface-card rise-in group relative overflow-hidden p-6 transition-transform hover:-translate-y-1"
            style={{ animationDelay: "80ms" }}
          >
            <span className="grid size-12 place-items-center rounded-xl bg-success/12 text-success">
              <Users className="size-6" />
            </span>
            <h2 className="mt-4 text-lg font-bold">Allottee Self-Service Portal</h2>
            <p className="mt-1.5 text-sm text-muted-foreground">
              For citizens holding allotted plots — view monthly bill, outstanding arrear, pay online through UPI or
              net banking and download digitally signed receipts.
            </p>
            <ul className="mt-4 grid gap-1.5 text-xs text-muted-foreground sm:grid-cols-2">
              <li>• Current bill &amp; arrear summary</li>
              <li>• UPI / Card / Net Banking</li>
              <li>• Bill &amp; receipt download</li>
              <li>• Payment history &amp; alerts</li>
            </ul>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-success">
              Enter Citizen Portal <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </div>

        {/* Statistics strip */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { l: "Housing Schemes", v: totals.schemes.toString(), s: "Across 8 authorities" },
            { l: "Total Plots", v: totals.plots.toLocaleString("en-IN"), s: `${totals.allotted.toLocaleString("en-IN")} allotted` },
            { l: "Monthly Demand", v: inr(totals.monthlyDemand, { compact: true }), s: "August 2026 bill run" },
            { l: "Recovery Rate", v: `${totals.recovery}%`, s: "Cumulative FY 2026-27" },
          ].map((k, i) => (
            <div key={k.l} className="glass-kpi rise-in p-4" style={{ animationDelay: `${i * 70}ms` }}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.09em] text-muted-foreground">{k.l}</p>
              <p className="num mt-2 text-2xl font-bold">{k.v}</p>
              <p className="mt-1 text-xs text-muted-foreground">{k.s}</p>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="surface-card p-5">
              <f.icon className="size-5 text-primary" />
              <h3 className="mt-3 text-sm font-bold">{f.title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{f.body}</p>
            </div>
          ))}
        </div>

        <div className="surface-card mt-8 flex flex-wrap items-center gap-3 p-4 text-xs text-muted-foreground">
          <Lock className="size-4 shrink-0 text-primary" />
          <span>
            All payments are processed through a PCI-DSS compliant government payment aggregator. Never share your OTP
            or Aadhaar number with anyone.
          </span>
        </div>
      </main>

      <footer className="border-t border-border bg-card">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-5 py-5 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-2">
            <Building2 className="size-4" /> © 2026 Housing &amp; Urban Planning Dept., Govt. of Uttar Pradesh
          </span>
          <span>Designed &amp; hosted by National Informatics Centre • Demonstration prototype</span>
        </div>
      </footer>
    </div>
  );
}
