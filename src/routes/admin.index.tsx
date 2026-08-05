import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Layers3,
  Grid2x2,
  CheckCircle2,
  CircleDashed,
  CalendarClock,
  Wallet,
  AlertTriangle,
  Hourglass,
  TrendingUp,
  Download,
  FileSpreadsheet,
  ArrowUpRight,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { PageHeader, SectionCard, StatCard, StatusChip } from "@/components/gov/primitives";
import {
  auditTrail,
  inr,
  monthlyTrend,
  paymentModeSplit,
  paymentStatusSplit,
  recoveryBand,
  schemeWiseCollection,
  totals,
} from "@/lib/prototype-data";

export const Route = createFileRoute("/admin/")({
  component: Dashboard,
});

const axis = {
  stroke: "var(--color-muted-foreground)",
  fontSize: 11,
  tickLine: false,
  axisLine: false,
};

const tooltipStyle = {
  contentStyle: {
    borderRadius: 10,
    border: "1px solid var(--color-border)",
    background: "var(--color-card)",
    fontSize: 12,
    boxShadow: "var(--shadow-card)",
  },
};

function Dashboard() {
  return (
    <>
      <PageHeader
        breadcrumb={["Home", "Admin", "Dashboard"]}
        title="Executive Dashboard"
        description="Consolidated user charge demand, collection and recovery position across all onboarded Development Authorities — August 2026."
        actions={
          <>
            <button className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-xs font-semibold hover:bg-muted">
              <FileSpreadsheet className="size-4" /> Export Excel
            </button>
            <button className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90">
              <Download className="size-4" /> Download MIS Pack
            </button>
          </>
        }
      />

      {/* KPI grid */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5">
        <StatCard label="Total Schemes" value={totals.schemes} sub="8 authorities • 2 inactive" icon={<Layers3 className="size-5" />} delay={0} />
        <StatCard label="Total Plots" value={totals.plots.toLocaleString("en-IN")} sub="Surveyed & digitised" icon={<Grid2x2 className="size-5" />} delay={40} />
        <StatCard label="Allotted Plots" value={totals.allotted.toLocaleString("en-IN")} sub="Charge applicable" icon={<CheckCircle2 className="size-5" />} tone="success" delay={80} />
        <StatCard label="Vacant Plots" value={totals.vacant.toLocaleString("en-IN")} sub="No charge levied" icon={<CircleDashed className="size-5" />} tone="info" delay={120} />
        <StatCard label="Monthly Demand" value={inr(totals.monthlyDemand, { compact: true })} sub="Aug 2026 bill run" icon={<CalendarClock className="size-5" />} delay={160} />
        <StatCard label="Current Collection" value={inr(totals.collection, { compact: true })} sub="+8.4% over Jul 2026" icon={<Wallet className="size-5" />} tone="success" delay={200} />
        <StatCard label="Outstanding Due" value={inr(totals.outstanding, { compact: true })} sub="Current month unpaid" icon={<AlertTriangle className="size-5" />} tone="warning" delay={240} />
        <StatCard label="Pending Arrear" value={inr(totals.arrear, { compact: true })} sub="Historical rates locked" icon={<Hourglass className="size-5" />} tone="destructive" delay={280} />
        <StatCard label="Recovery %" value={`${totals.recovery}%`} sub="Target 85% by Mar 2027" icon={<TrendingUp className="size-5" />} tone="primary" delay={320} />
        <div className="glass-kpi rise-in flex flex-col justify-between p-4" style={{ animationDelay: "360ms" }}>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.09em] text-muted-foreground">Bill Run Status</p>
            <p className="mt-2 text-sm font-bold">August 2026 — Completed</p>
          </div>
          <Link to="/admin/demand" className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary">
            Open demand register <ArrowUpRight className="size-3.5" />
          </Link>
        </div>
      </div>

      {/* Charts row 1 */}
      <div className="mt-5 grid gap-4 xl:grid-cols-3">
        <SectionCard
          className="xl:col-span-2"
          title="Collection vs Demand Trend"
          description="Figures in ₹ crore — FY 2026-27"
        >
          <div className="h-[300px] p-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyTrend}>
                <defs>
                  <linearGradient id="gDemand" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-chart-2)" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="var(--color-chart-2)" stopOpacity={0.02} />
                  </linearGradient>
                  <linearGradient id="gColl" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-success)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="var(--color-success)" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="month" {...axis} />
                <YAxis {...axis} />
                <Tooltip {...tooltipStyle} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 11 }} />
                <Area type="monotone" dataKey="demand" name="Demand" stroke="var(--color-chart-2)" fill="url(#gDemand)" strokeWidth={2} />
                <Area type="monotone" dataKey="collection" name="Collection" stroke="var(--color-success)" fill="url(#gColl)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard title="Payment Status Split" description="Share of bills, August 2026">
          <div className="h-[300px] p-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={paymentStatusSplit} dataKey="value" nameKey="name" innerRadius={58} outerRadius={92} paddingAngle={3}>
                  {paymentStatusSplit.map((d) => (
                    <Cell key={d.name} fill={d.color} stroke="var(--color-card)" strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip {...tooltipStyle} formatter={(v: number) => `${v}%`} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
      </div>

      {/* Charts row 2 */}
      <div className="mt-4 grid gap-4 xl:grid-cols-3">
        <SectionCard title="Monthly Collection Trend" description="Realisation against monthly demand (₹ crore)">
          <div className="h-[260px] p-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="month" {...axis} />
                <YAxis {...axis} />
                <Tooltip {...tooltipStyle} />
                <Line type="monotone" dataKey="collection" name="Collection" stroke="var(--color-primary)" strokeWidth={2.5} dot={{ r: 3 }} activeDot={{ r: 5 }} />
                <Line type="monotone" dataKey="arrear" name="Arrear" stroke="var(--color-destructive)" strokeWidth={2} strokeDasharray="5 4" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard title="Monthly Demand Trend" description="Demand raised per month (₹ crore)">
          <div className="h-[260px] p-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="month" {...axis} />
                <YAxis {...axis} domain={[35, 43]} />
                <Tooltip {...tooltipStyle} />
                <Bar dataKey="demand" name="Demand" fill="var(--color-primary)" radius={[4, 4, 0, 0]} maxBarSize={22} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard title="Payment Mode Preference" description="Share of successful online transactions">
          <div className="h-[260px] p-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={paymentModeSplit} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" horizontal={false} />
                <XAxis type="number" {...axis} />
                <YAxis type="category" dataKey="name" width={82} {...axis} />
                <Tooltip {...tooltipStyle} formatter={(v: number) => `${v}%`} />
                <Bar dataKey="value" name="Share" fill="var(--color-chart-2)" radius={[0, 4, 4, 0]} maxBarSize={18} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
      </div>

      {/* Scheme wise + heat map */}
      <div className="mt-4 grid gap-4 xl:grid-cols-3">
        <SectionCard
          className="xl:col-span-2"
          title="Scheme Wise Collection"
          description="Demand vs collection (₹ crore) for top schemes"
          actions={
            <Link to="/admin/reports" className="text-xs font-semibold text-primary">
              View full report
            </Link>
          }
        >
          <div className="h-[290px] p-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={schemeWiseCollection}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="code" {...axis} interval={0} angle={-12} dy={8} height={44} />
                <YAxis {...axis} />
                <Tooltip {...tooltipStyle} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="demand" name="Demand" fill="var(--color-chart-2)" radius={[4, 4, 0, 0]} maxBarSize={18} />
                <Bar dataKey="collection" name="Collection" fill="var(--color-success)" radius={[4, 4, 0, 0]} maxBarSize={18} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard title="Recovery Heat Map" description="Scheme wise recovery performance band">
          <div className="grid grid-cols-2 gap-2 p-4">
            {schemeWiseCollection.map((s) => {
              const band = recoveryBand(s.recovery);
              const bg =
                band.tone === "success"
                  ? "bg-success/15 border-success/30"
                  : band.tone === "warning"
                    ? "bg-warning/20 border-warning/35"
                    : band.tone === "saffron"
                      ? "bg-saffron/20 border-saffron/40"
                      : "bg-destructive/15 border-destructive/30";
              return (
                <div key={s.code} className={`rounded-lg border p-3 transition-transform hover:scale-[1.03] ${bg}`}>
                  <p className="truncate text-[11px] font-bold">{s.code}</p>
                  <p className="num mt-1 text-lg font-bold">{s.recovery}%</p>
                  <p className="truncate text-[10px] text-muted-foreground">{band.label}</p>
                </div>
              );
            })}
          </div>
          <div className="flex flex-wrap items-center gap-3 border-t border-border px-4 py-3 text-[10px] text-muted-foreground">
            <span className="flex items-center gap-1.5"><span className="size-2.5 rounded bg-success" /> Excellent ≥85%</span>
            <span className="flex items-center gap-1.5"><span className="size-2.5 rounded bg-warning" /> Average 70-85%</span>
            <span className="flex items-center gap-1.5"><span className="size-2.5 rounded bg-saffron" /> Poor 55-70%</span>
            <span className="flex items-center gap-1.5"><span className="size-2.5 rounded bg-destructive" /> Critical &lt;55%</span>
          </div>
        </SectionCard>
      </div>

      {/* Scheme table + audit */}
      <div className="mt-4 grid gap-4 xl:grid-cols-3">
        <SectionCard className="xl:col-span-2" title="Authority Performance Register" description="Recovery position against demand raised">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/60 text-[11px] uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-4 py-2.5 text-left font-semibold">Scheme</th>
                  <th className="px-4 py-2.5 text-left font-semibold">Authority</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Demand (₹ Cr)</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Collection (₹ Cr)</th>
                  <th className="px-4 py-2.5 text-left font-semibold">Recovery</th>
                </tr>
              </thead>
              <tbody>
                {schemeWiseCollection.map((s) => {
                  const band = recoveryBand(s.recovery);
                  return (
                    <tr key={s.code} className="border-t border-border hover:bg-muted/40">
                      <td className="px-4 py-2.5 font-medium">{s.scheme}</td>
                      <td className="px-4 py-2.5 text-xs text-muted-foreground">{s.authority}</td>
                      <td className="num px-4 py-2.5 text-right">{s.demand.toFixed(2)}</td>
                      <td className="num px-4 py-2.5 text-right">{s.collection.toFixed(2)}</td>
                      <td className="px-4 py-2.5">
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-20 overflow-hidden rounded-full bg-muted">
                            <div
                              className={
                                band.tone === "success"
                                  ? "h-full rounded-full bg-success"
                                  : band.tone === "warning"
                                    ? "h-full rounded-full bg-warning"
                                    : band.tone === "saffron"
                                      ? "h-full rounded-full bg-saffron"
                                      : "h-full rounded-full bg-destructive"
                              }
                              style={{ width: `${s.recovery}%` }}
                            />
                          </div>
                          <span className="num text-xs font-semibold">{s.recovery}%</span>
                          <StatusChip status={band.label} />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </SectionCard>

        <SectionCard title="Recent Activity" description="System audit trail">
          <ul className="divide-y divide-border">
            {auditTrail.map((a) => (
              <li key={a.time} className="px-4 py-3">
                <p className="text-xs font-semibold">{a.action}</p>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  {a.user} • {a.module}
                </p>
                <p className="text-[10px] text-muted-foreground/80">{a.time}</p>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>
    </>
  );
}
