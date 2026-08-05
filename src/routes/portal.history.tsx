import { createFileRoute } from "@tanstack/react-router";
import { FileDown } from "lucide-react";
import { SectionCard, StatCard, StatusChip } from "@/components/gov/primitives";
import { allotteePayments, inr } from "@/lib/prototype-data";

export const Route = createFileRoute("/portal/history")({
  component: PaymentHistory,
});

function PaymentHistory() {
  const paid = allotteePayments.filter((p) => p.status === "Success");
  return (
    <>
      <div className="mb-4 grid gap-4 sm:grid-cols-3">
        <StatCard label="Total Paid (FY)" value={inr(paid.reduce((s, p) => s + p.amount, 0))} tone="success" />
        <StatCard label="Successful Payments" value={paid.length} delay={60} />
        <StatCard label="Failed Attempts" value={allotteePayments.length - paid.length} tone="destructive" delay={120} />
      </div>

      <SectionCard title="Payment History" description="All transactions against Plot C-214">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/60 text-[11px] uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-2.5 text-left font-semibold">Receipt Number</th>
                <th className="px-4 py-2.5 text-left font-semibold">Payment Date</th>
                <th className="px-4 py-2.5 text-right font-semibold">Amount</th>
                <th className="px-4 py-2.5 text-left font-semibold">Transaction ID</th>
                <th className="px-4 py-2.5 text-left font-semibold">Mode</th>
                <th className="px-4 py-2.5 text-left font-semibold">Status</th>
                <th className="px-4 py-2.5 text-right font-semibold">Receipt</th>
              </tr>
            </thead>
            <tbody>
              {allotteePayments.map((p) => (
                <tr key={p.receiptNo} className="border-t border-border hover:bg-muted/40">
                  <td className="num px-4 py-2.5 font-semibold text-primary">{p.receiptNo}</td>
                  <td className="num px-4 py-2.5 text-xs">{p.date}</td>
                  <td className="num px-4 py-2.5 text-right font-semibold">{inr(p.amount)}</td>
                  <td className="num px-4 py-2.5 text-xs text-muted-foreground">{p.txnId}</td>
                  <td className="px-4 py-2.5 text-xs">{p.mode}</td>
                  <td className="px-4 py-2.5"><StatusChip status={p.status} /></td>
                  <td className="px-4 py-2.5 text-right">
                    <button
                      disabled={p.status !== "Success"}
                      className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 text-[11px] font-semibold hover:bg-muted disabled:opacity-40"
                    >
                      <FileDown className="size-3" /> Download
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
