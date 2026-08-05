import { createFileRoute } from "@tanstack/react-router";
import { FileSpreadsheet, FileDown, BarChart3 } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { PageHeader, SectionCard, StatCard, StatusChip } from "@/components/gov/primitives";
import { bills, inr, monthlyTrend, recoveryBand, schemeWiseCollection, totals } from "@/lib/prototype-data";

export const Route = createFileRoute("/admin/reports")({
  component: Reports,
});

const reportList = [
  "Collection Report", "Demand Report", "Current Due Report", "Pending Arrear Report",
  "Scheme Wise Collection", "Monthly Collection", "Recovery Percentage", "Defaulter List",
  "Daily Collection", "Yearly Collection",
];

function Reports() {
  const defaulters = bills.filter((b) => b.status === "Overdue" || b.status === "Unpaid").slice(0, 12);

  return (
    <>
      <PageHeader
        breadcrumb={["Home", "Revenue Operations", "Reports"]}
        title="Reports &amp; MIS"
        description="Statutory and management reports on demand, collection, arrears and recovery — exportable to PDF and Excel."
        actions={
          <>
            <button className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-xs font-semibold hover:bg-muted"><FileSpreadsheet className="size-4" /> Export Excel</button>
            <button className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90"><FileDown className="size-4" /> Export PDF</button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Demand (FY)" value={inr(totals.monthlyDemand * 12, { compact: true })} />
        <StatCard label="Collection (FY)" value={inr(totals.collection * 12, { compact: true })} tone="success" delay={60} />
        <StatCard label="Pending Arrear" value={inr(totals.arrear, { compact: true })} tone="destructive" delay={120} />
        <StatCard label="Recovery %" value={`${totals.recovery}%`} tone="info" delay={180} />
      </div>

      <div className="mt-5 grid gap-4 xl:grid-cols-4">
        <SectionCard title="Report Library" description="Select a report to generate">
          <ul className="divide-y divide-border">
            {reportList.map((r) => (
              <li key={r}>
                <button className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-xs font-medium hover:bg-muted/50">
                  <BarChart3 className="size-3.5 text-primary" /> {r}
                </button>
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard className="xl:col-span-3" title="Demand vs Collection vs Arrear" description="Monthly consolidated position (₹ crore)">
          <div className="h-[280px] p-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="month" stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid var(--color-border)", background: "var(--color-card)", fontSize: 12 }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="demand" name="Demand" fill="var(--color-chart-2)" radius={[4, 4, 0, 0]} maxBarSize={14} />
                <Bar dataKey="collection" name="Collection" fill="var(--color-success)" radius={[4, 4, 0, 0]} maxBarSize={14} />
                <Bar dataKey="arrear" name="Arrear" fill="var(--color-destructive)" radius={[4, 4, 0, 0]} maxBarSize={14} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-2">
        <SectionCard title="Scheme Wise Recovery Report" description="Recovery percentage with performance band">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/60 text-[11px] uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-4 py-2.5 text-left font-semibold">Scheme</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Demand (₹ Cr)</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Collection (₹ Cr)</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Recovery</th>
                  <th className="px-4 py-2.5 text-left font-semibold">Band</th>
                </tr>
              </thead>
              <tbody>
                {schemeWiseCollection.map((s) => (
                  <tr key={s.code} className="border-t border-border hover:bg-muted/40">
                    <td className="px-4 py-2.5 font-medium">{s.scheme}</td>
                    <td className="num px-4 py-2.5 text-right">{s.demand.toFixed(2)}</td>
                    <td className="num px-4 py-2.5 text-right">{s.collection.toFixed(2)}</td>
                    <td className="num px-4 py-2.5 text-right font-semibold">{s.recovery}%</td>
                    <td className="px-4 py-2.5"><StatusChip status={recoveryBand(s.recovery).label} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        <SectionCard title="Defaulter List" description="Allottees with unpaid or overdue bills">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/60 text-[11px] uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-4 py-2.5 text-left font-semibold">Allottee</th>
                  <th className="px-4 py-2.5 text-left font-semibold">Plot</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Arrear</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Total Due</th>
                  <th className="px-4 py-2.5 text-left font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {defaulters.map((b) => (
                  <tr key={b.id} className="border-t border-border hover:bg-muted/40">
                    <td className="px-4 py-2.5">{b.allottee}</td>
                    <td className="num px-4 py-2.5 text-xs">{b.plotNo}</td>
                    <td className="num px-4 py-2.5 text-right">{inr(b.arrear)}</td>
                    <td className="num px-4 py-2.5 text-right font-semibold">{inr(b.totalDue)}</td>
                    <td className="px-4 py-2.5"><StatusChip status={b.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>
      </div>
    </>
  );
}
