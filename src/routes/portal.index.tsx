import { createFileRoute, Link } from "@tanstack/react-router";
import { CreditCard, FileDown, ReceiptText, AlertTriangle } from "lucide-react";
import { PageHeader, SectionCard, StatCard, StatusChip } from "@/components/gov/primitives";
import { allotteeArrearBreakup, allotteeBills, currentAllottee as me, inr } from "@/lib/prototype-data";

export const Route = createFileRoute("/portal/")({
  component: AllotteeDashboard,
});

function AllotteeDashboard() {
  return (
    <>
      <div className="surface-card rise-in mb-5 flex flex-wrap items-center justify-between gap-4 p-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">Namaste 🙏</p>
          <h1 className="mt-1 text-xl font-bold">{me.name}</h1>
          <p className="num mt-0.5 text-xs text-muted-foreground">
            {me.allotteeCode} • {me.scheme} • Plot {me.plotNo}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link to="/portal/pay" className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90">
            <CreditCard className="size-4" /> Pay Online
          </Link>
          <button className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-xs font-semibold hover:bg-muted">
            <FileDown className="size-4" /> Download Bill
          </button>
          <button className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-xs font-semibold hover:bg-muted">
            <ReceiptText className="size-4" /> Download Receipt
          </button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Current Month Bill" value={inr(me.currentBill)} sub={`March 2026 @ ₹${me.currentRate.toFixed(2)}/sq.m.`} />
        <StatCard label="Pending Arrear" value={inr(me.arrear)} tone="destructive" sub="At historical rates" delay={60} />
        <StatCard label="Total Due" value={inr(me.totalDue)} tone="warning" sub="Payable by 15 Mar 2026" delay={120} />
        <StatCard label="Plot Area" value={`${me.area} sq.m.`} sub={me.category} tone="info" delay={180} />
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-3">
        <SectionCard title="Profile Summary">
          <dl className="divide-y divide-border text-sm">
            {[
              ["Father's Name", me.fatherName],
              ["Mobile", me.mobile],
              ["Email", me.email],
              ["Aadhaar", me.aadhaar],
              ["PAN", me.pan],
              ["Occupation", me.occupation],
              ["Address", me.address],
            ].map(([k, v]) => (
              <div key={k} className="flex gap-3 px-4 py-2.5">
                <dt className="w-28 shrink-0 text-xs text-muted-foreground">{k}</dt>
                <dd className="min-w-0 flex-1 text-xs font-medium">{v}</dd>
              </div>
            ))}
          </dl>
        </SectionCard>

        <SectionCard title="Plot &amp; Scheme Details">
          <dl className="divide-y divide-border text-sm">
            {[
              ["Scheme", me.scheme],
              ["Scheme Code", me.schemeCode],
              ["Plot Number", me.plotNo],
              ["Sector", me.sector],
              ["Area", `${me.area} sq.m.`],
              ["Allotment Date", me.allotmentDate],
              ["Possession Date", me.possessionDate],
              ["Charge Start Date", me.chargeStartDate],
            ].map(([k, v]) => (
              <div key={k} className="flex gap-3 px-4 py-2.5">
                <dt className="w-28 shrink-0 text-xs text-muted-foreground">{k}</dt>
                <dd className="num min-w-0 flex-1 text-xs font-medium">{v}</dd>
              </div>
            ))}
          </dl>
        </SectionCard>

        <SectionCard title="Arrear Break-up" description="Rate applicable at time of billing is retained">
          <ul className="divide-y divide-border">
            {allotteeArrearBreakup.map((a) => (
              <li key={a.period} className="flex items-center justify-between gap-3 px-4 py-2.5">
                <div>
                  <p className="text-xs font-semibold">{a.period}</p>
                  <p className="num text-[11px] text-muted-foreground">{a.months} months @ ₹{a.rate.toFixed(2)}/sq.m.</p>
                </div>
                <div className="text-right">
                  <p className="num text-sm font-bold">{inr(a.amount)}</p>
                  <StatusChip status={a.status} />
                </div>
              </li>
            ))}
          </ul>
          <p className="flex gap-2 border-t border-border px-4 py-3 text-[11px] text-muted-foreground">
            <AlertTriangle className="mt-0.5 size-3.5 shrink-0 text-warning-foreground" />
            Interest at 12% p.a. applies on dues outstanding beyond 15 days.
          </p>
        </SectionCard>
      </div>

      <SectionCard className="mt-4" title="My Bills" description="Monthly user charge bills issued to this plot">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/60 text-[11px] uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-2.5 text-left font-semibold">Bill No.</th>
                <th className="px-4 py-2.5 text-left font-semibold">Month</th>
                <th className="px-4 py-2.5 text-right font-semibold">Area</th>
                <th className="px-4 py-2.5 text-right font-semibold">Rate</th>
                <th className="px-4 py-2.5 text-right font-semibold">Monthly</th>
                <th className="px-4 py-2.5 text-right font-semibold">Arrear</th>
                <th className="px-4 py-2.5 text-right font-semibold">Total</th>
                <th className="px-4 py-2.5 text-left font-semibold">Status</th>
                <th className="px-4 py-2.5 text-right font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {allotteeBills.map((b) => (
                <tr key={b.billNo} className="border-t border-border hover:bg-muted/40">
                  <td className="num px-4 py-2.5 font-semibold text-primary">{b.billNo}</td>
                  <td className="px-4 py-2.5 text-xs">{b.month}</td>
                  <td className="num px-4 py-2.5 text-right">{b.area}</td>
                  <td className="num px-4 py-2.5 text-right">₹{b.rate.toFixed(2)}</td>
                  <td className="num px-4 py-2.5 text-right">{inr(b.amount)}</td>
                  <td className="num px-4 py-2.5 text-right">{inr(b.arrear)}</td>
                  <td className="num px-4 py-2.5 text-right font-semibold">{inr(b.total)}</td>
                  <td className="px-4 py-2.5"><StatusChip status={b.status} /></td>
                  <td className="px-4 py-2.5 text-right">
                    <button className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 text-[11px] font-semibold hover:bg-muted">
                      <FileDown className="size-3" /> PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </>
  );
}
