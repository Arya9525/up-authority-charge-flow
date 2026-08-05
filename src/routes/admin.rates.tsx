import { createFileRoute } from "@tanstack/react-router";
import { Plus, Lock, Info, IndianRupee, History } from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { PageHeader, SectionCard, StatCard, StatusChip } from "@/components/gov/primitives";
import { rates } from "@/lib/prototype-data";
import { Field, SelectField } from "./admin.schemes";

export const Route = createFileRoute("/admin/rates")({
  component: RateMaster,
});

const active = rates.find((r) => r.status === "Active")!;

function RateMaster() {
  return (
    <>
      <PageHeader
        breadcrumb={["Home", "Masters", "Rate Master"]}
        title="Rate Master"
        description="Yearly notified user charge rate per square meter. Rates are versioned by effective date — historical bills and arrears always retain the rate applicable on their generation date."
        actions={
          <button className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90">
            <Plus className="size-4" /> Notify New Rate
          </button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Active Rate" value={`₹${active.ratePerSqm.toFixed(2)}`} sub={`Effective ${active.effectiveFrom}`} icon={<IndianRupee className="size-5" />} tone="success" />
        <StatCard label="Rate Versions" value={rates.length} sub="FY 2021-22 onwards" icon={<History className="size-5" />} delay={60} />
        <StatCard label="Proposed Rate" value="₹2.75" sub="Pending Board ratification" tone="warning" delay={120} />
        <StatCard label="5-Yr CAGR" value="17.7%" sub="Rate escalation trend" tone="info" delay={180} />
      </div>

      <div className="mt-5 grid gap-4 xl:grid-cols-3">
        <SectionCard className="xl:col-span-2" title="Rate Version History" description="Immutable rate ledger — superseded rates cannot be edited">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/60 text-[11px] uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-4 py-2.5 text-left font-semibold">Effective From</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Rate / Sq.m.</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Change</th>
                  <th className="px-4 py-2.5 text-left font-semibold">Remarks</th>
                  <th className="px-4 py-2.5 text-left font-semibold">Status</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {rates.map((r, i) => {
                  const prev = rates[i - 1];
                  const delta = prev ? ((r.ratePerSqm - prev.ratePerSqm) / prev.ratePerSqm) * 100 : 0;
                  return (
                    <tr key={r.id} className="border-t border-border hover:bg-muted/40">
                      <td className="num px-4 py-2.5 font-semibold">{r.effectiveFrom}</td>
                      <td className="num px-4 py-2.5 text-right font-semibold">₹{r.ratePerSqm.toFixed(2)}</td>
                      <td className="num px-4 py-2.5 text-right text-xs text-muted-foreground">
                        {prev ? `+${delta.toFixed(1)}%` : "Base"}
                      </td>
                      <td className="px-4 py-2.5 text-xs text-muted-foreground">{r.remarks}</td>
                      <td className="px-4 py-2.5">
                        <StatusChip status={r.status === "Active" ? "Active" : "Inactive"} />
                      </td>
                      <td className="px-4 py-2.5 text-right">
                        <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                          <Lock className="size-3" /> Locked
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="h-[200px] border-t border-border p-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={rates.map((r) => ({ year: r.effectiveFrom.slice(-4), rate: r.ratePerSqm }))}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="year" stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ borderRadius: 10, border: "1px solid var(--color-border)", background: "var(--color-card)", fontSize: 12 }}
                  formatter={(v: number) => `₹${v.toFixed(2)} / sq.m.`}
                />
                <Bar dataKey="rate" name="Rate" fill="var(--color-primary)" radius={[4, 4, 0, 0]} maxBarSize={34} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <div className="space-y-4">
          <SectionCard title="Notify New Rate" description="Applies to future monthly demands only">
            <div className="grid gap-4 p-4">
              <Field label="Effective From Date" placeholder="01-04-2027" />
              <Field label="Rate Per Sq. Meter (₹)" placeholder="e.g. 3.10" />
              <label className="block">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Remarks</span>
                <textarea
                  rows={3}
                  placeholder="Board resolution / Government order reference"
                  className="mt-1.5 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/25"
                />
              </label>
              <SelectField label="Status" options={["Inactive (Draft)", "Active"]} />
              <button className="rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90">
                Submit for Approval
              </button>
            </div>
          </SectionCard>

          <div className="surface-card flex gap-3 p-4 text-[11px] leading-relaxed text-muted-foreground">
            <Info className="mt-0.5 size-4 shrink-0 text-primary" />
            <p>
              <strong className="text-foreground">Historical rate protection:</strong> Once a monthly bill is generated,
              its rate, area and computed charge are permanently frozen on the bill record. A future rate revision never
              triggers recalculation of past dues or accumulated arrears.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
