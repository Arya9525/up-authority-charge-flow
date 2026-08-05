import { createFileRoute } from "@tanstack/react-router";
import { CalendarClock, PlayCircle, CheckCircle2, Info, RefreshCw } from "lucide-react";
import { useState } from "react";
import { PageHeader, Pager, SectionCard, StatCard, StatusChip } from "@/components/gov/primitives";
import { MONTHS, bills, inr, schemes, totals } from "@/lib/prototype-data";
import { SelectField } from "./admin.schemes";

export const Route = createFileRoute("/admin/demand")({
  component: DemandGeneration,
});

const runs = [
  { period: "August 2026", bills: 9076, demand: 41823500, status: "Completed", on: "01-08-2026 06:05 AM", rate: 2.4 },
  { period: "July 2026", bills: 9041, demand: 41712400, status: "Completed", on: "01-07-2026 06:04 AM", rate: 2.4 },
  { period: "June 2026", bills: 8998, demand: 41504900, status: "Completed", on: "01-06-2026 06:07 AM", rate: 2.4 },
  { period: "May 2026", bills: 8954, demand: 41386200, status: "Completed", on: "01-05-2026 06:03 AM", rate: 2.4 },
  { period: "April 2026", bills: 8902, demand: 41190800, status: "Completed", on: "01-04-2026 06:02 AM", rate: 2.4 },
];

function DemandGeneration() {
  const [generated, setGenerated] = useState(false);

  return (
    <>
      <PageHeader
        breadcrumb={["Home", "Revenue Operations", "Monthly Demand Generation"]}
        title="Monthly Demand Generation"
        description="Generate monthly user charge bills for every allotted plot. Each bill permanently stores the area, rate used, monthly charge, arrear and total due."
        actions={
          <button
            onClick={() => setGenerated(true)}
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90"
          >
            <PlayCircle className="size-4" /> Generate Monthly Demand
          </button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Eligible Allotted Plots" value={totals.allotted.toLocaleString("en-IN")} icon={<CheckCircle2 className="size-5" />} tone="success" />
        <StatCard label="Bills in Current Run" value="9,076" icon={<CalendarClock className="size-5" />} delay={60} />
        <StatCard label="Demand Raised" value={inr(totals.monthlyDemand, { compact: true })} delay={120} />
        <StatCard label="Arrear Carried Forward" value={inr(totals.arrear, { compact: true })} tone="destructive" sub="At historical rates" delay={180} />
      </div>

      <div className="mt-5 grid gap-4 xl:grid-cols-3">
        <SectionCard title="Run Parameters" description="Configure the bill run">
          <div className="grid gap-4 p-4">
            <SelectField label="Billing Month" options={MONTHS} />
            <SelectField label="Billing Year" options={["2026", "2027"]} />
            <SelectField label="Authority" options={["All Authorities", ...new Set(schemes.map((s) => s.authority))]} />
            <SelectField label="Scheme Scope" options={["All Active Schemes", ...schemes.map((s) => s.code)]} />
            <SelectField label="Include Arrear Carry Forward" options={["Yes", "No"]} />
            <SelectField label="Notification" options={["SMS + Email", "SMS only", "None"]} />
            <button
              onClick={() => setGenerated(true)}
              className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90"
            >
              <RefreshCw className="size-4" /> Run Demand Generation
            </button>
            {generated ? (
              <div className="rounded-lg border border-success/30 bg-success/10 p-3 text-xs text-success">
                Demand generated successfully — 9,076 bills created, SMS &amp; email dispatched to allottees.
              </div>
            ) : null}
            <p className="flex gap-2 rounded-lg bg-muted/60 p-3 text-[11px] leading-relaxed text-muted-foreground">
              <Info className="mt-0.5 size-3.5 shrink-0" />
              Monthly charge = Plot Area × Rate applicable on the billing month. Older arrears retain their original
              rate and are not recomputed.
            </p>
          </div>
        </SectionCard>

        <SectionCard className="xl:col-span-2" title="Bill Run History" description="Scheduled on 1st of every month, 06:00 AM IST">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/60 text-[11px] uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-4 py-2.5 text-left font-semibold">Billing Period</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Bills Generated</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Rate Used</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Demand Raised</th>
                  <th className="px-4 py-2.5 text-left font-semibold">Executed On</th>
                  <th className="px-4 py-2.5 text-left font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {runs.map((r) => (
                  <tr key={r.period} className="border-t border-border hover:bg-muted/40">
                    <td className="px-4 py-2.5 font-medium">{r.period}</td>
                    <td className="num px-4 py-2.5 text-right">{r.bills.toLocaleString("en-IN")}</td>
                    <td className="num px-4 py-2.5 text-right">₹{r.rate.toFixed(2)}</td>
                    <td className="num px-4 py-2.5 text-right font-semibold">{inr(r.demand)}</td>
                    <td className="num px-4 py-2.5 text-xs text-muted-foreground">{r.on}</td>
                    <td className="px-4 py-2.5">
                      <StatusChip status="Success" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="border-t border-border px-4 py-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Generated Demand Register (sample)</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/60 text-[11px] uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-4 py-2.5 text-left font-semibold">Bill No.</th>
                  <th className="px-4 py-2.5 text-left font-semibold">Scheme / Plot</th>
                  <th className="px-4 py-2.5 text-left font-semibold">Period</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Area</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Rate</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Monthly</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Arrear</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Total Due</th>
                  <th className="px-4 py-2.5 text-left font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {bills.slice(0, 12).map((b) => (
                  <tr key={b.id} className="border-t border-border hover:bg-muted/40">
                    <td className="num px-4 py-2.5 font-semibold text-primary">{b.billNo}</td>
                    <td className="px-4 py-2.5 text-xs">
                      <span className="num font-semibold">{b.plotNo}</span>
                      <span className="block text-[11px] text-muted-foreground">{b.schemeCode}</span>
                    </td>
                    <td className="px-4 py-2.5 text-xs">
                      {b.month} {b.year}
                    </td>
                    <td className="num px-4 py-2.5 text-right">{b.area}</td>
                    <td className="num px-4 py-2.5 text-right">₹{b.rateUsed.toFixed(2)}</td>
                    <td className="num px-4 py-2.5 text-right">{inr(b.monthlyCharge)}</td>
                    <td className="num px-4 py-2.5 text-right">{inr(b.arrear)}</td>
                    <td className="num px-4 py-2.5 text-right font-semibold">{inr(b.totalDue)}</td>
                    <td className="px-4 py-2.5">
                      <StatusChip status={b.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pager from={1} to={12} total={9076} />
        </SectionCard>
      </div>
    </>
  );
}
