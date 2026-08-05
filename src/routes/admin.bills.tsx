import { createFileRoute } from "@tanstack/react-router";
import { Search, Eye, FileDown, Printer } from "lucide-react";
import { useState } from "react";
import { PageHeader, Pager, SectionCard, StatCard, StatusChip } from "@/components/gov/primitives";
import { MONTHS, bills, inr, schemes } from "@/lib/prototype-data";

export const Route = createFileRoute("/admin/bills")({
  component: BillManagement,
});

function BillManagement() {
  const [q, setQ] = useState("");
  const [scheme, setScheme] = useState("All");
  const [month, setMonth] = useState("All");
  const [status, setStatus] = useState("All");

  const rows = bills
    .filter(
      (b) =>
        (scheme === "All" || b.schemeCode === scheme) &&
        (month === "All" || b.month === month) &&
        (status === "All" || b.status === status) &&
        (b.billNo.toLowerCase().includes(q.toLowerCase()) ||
          b.allottee.toLowerCase().includes(q.toLowerCase()) ||
          b.plotNo.toLowerCase().includes(q.toLowerCase())),
    )
    .slice(0, 20);

  const sum = (k: "totalDue" | "monthlyCharge" | "arrear") => bills.reduce((s, b) => s + b[k], 0);

  return (
    <>
      <PageHeader
        breadcrumb={["Home", "Revenue Operations", "Bills"]}
        title="Bill Management"
        description="Search, view, print and download monthly user charge bills. Every bill is an immutable record of area, rate used and dues."
        actions={
          <>
            <button className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-xs font-semibold hover:bg-muted">
              <Printer className="size-4" /> Bulk Print
            </button>
            <button className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90">
              <FileDown className="size-4" /> Download PDFs
            </button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Bills in Register" value={bills.length} sub="Sample working set" />
        <StatCard label="Current Charges" value={inr(sum("monthlyCharge"), { compact: true })} delay={60} />
        <StatCard label="Arrear Component" value={inr(sum("arrear"), { compact: true })} tone="destructive" delay={120} />
        <StatCard label="Total Due" value={inr(sum("totalDue"), { compact: true })} tone="warning" delay={180} />
      </div>

      <SectionCard className="mt-5" title="Bill Search" description={`${rows.length} bill(s) shown`}>
        <div className="flex flex-wrap items-center gap-2 border-b border-border bg-muted/40 px-4 py-3">
          <div className="flex min-w-[220px] flex-1 items-center gap-2 rounded-lg border border-border bg-card px-3 py-2">
            <Search className="size-4 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Bill number, allottee or plot" className="w-full bg-transparent text-sm outline-none" />
          </div>
          <select value={scheme} onChange={(e) => setScheme(e.target.value)} className="rounded-lg border border-border bg-card px-3 py-2 text-sm">
            <option value="All">All Schemes</option>
            {schemes.map((s) => (
              <option key={s.code} value={s.code}>{s.code}</option>
            ))}
          </select>
          <select value={month} onChange={(e) => setMonth(e.target.value)} className="rounded-lg border border-border bg-card px-3 py-2 text-sm">
            <option value="All">All Months</option>
            {MONTHS.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
          <select className="rounded-lg border border-border bg-card px-3 py-2 text-sm">
            <option>2026</option>
            <option>2025</option>
          </select>
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="rounded-lg border border-border bg-card px-3 py-2 text-sm">
            <option value="All">All Status</option>
            {["Paid", "Unpaid", "Partially Paid", "Overdue"].map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/60 text-[11px] uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-2.5 text-left font-semibold">Bill No.</th>
                <th className="px-4 py-2.5 text-left font-semibold">Allottee</th>
                <th className="px-4 py-2.5 text-left font-semibold">Scheme / Plot</th>
                <th className="px-4 py-2.5 text-left font-semibold">Period</th>
                <th className="px-4 py-2.5 text-right font-semibold">Area</th>
                <th className="px-4 py-2.5 text-right font-semibold">Rate</th>
                <th className="px-4 py-2.5 text-right font-semibold">Current Due</th>
                <th className="px-4 py-2.5 text-right font-semibold">Arrear</th>
                <th className="px-4 py-2.5 text-right font-semibold">Total Due</th>
                <th className="px-4 py-2.5 text-left font-semibold">Status</th>
                <th className="px-4 py-2.5 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((b) => (
                <tr key={b.id} className="border-t border-border hover:bg-muted/40">
                  <td className="num px-4 py-2.5 font-semibold text-primary">{b.billNo}</td>
                  <td className="px-4 py-2.5">{b.allottee}</td>
                  <td className="px-4 py-2.5 text-xs">
                    <span className="num font-semibold">{b.plotNo}</span>
                    <span className="block text-[11px] text-muted-foreground">{b.schemeCode}</span>
                  </td>
                  <td className="px-4 py-2.5 text-xs">{b.month} {b.year}</td>
                  <td className="num px-4 py-2.5 text-right">{b.area}</td>
                  <td className="num px-4 py-2.5 text-right">₹{b.rateUsed.toFixed(2)}</td>
                  <td className="num px-4 py-2.5 text-right">{inr(b.currentDue)}</td>
                  <td className="num px-4 py-2.5 text-right">{inr(b.arrear)}</td>
                  <td className="num px-4 py-2.5 text-right font-semibold">{inr(b.totalDue)}</td>
                  <td className="px-4 py-2.5"><StatusChip status={b.status} /></td>
                  <td className="px-4 py-2.5">
                    <div className="flex items-center justify-end gap-1">
                      <button title="View Bill" className="grid size-7 place-items-center rounded-md border border-border hover:bg-muted"><Eye className="size-3.5" /></button>
                      <button title="Download PDF" className="grid size-7 place-items-center rounded-md border border-border hover:bg-muted"><FileDown className="size-3.5" /></button>
                      <button title="Print" className="grid size-7 place-items-center rounded-md border border-border hover:bg-muted"><Printer className="size-3.5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pager from={1} to={rows.length} total={bills.length} />
      </SectionCard>
    </>
  );
}
