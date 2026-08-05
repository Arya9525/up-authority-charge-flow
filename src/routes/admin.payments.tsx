import { createFileRoute } from "@tanstack/react-router";
import { CreditCard, Smartphone, Landmark, CheckCircle2, FileDown, Search } from "lucide-react";
import { useState } from "react";
import { PageHeader, Pager, SectionCard, StatCard, StatusChip } from "@/components/gov/primitives";
import { inr, payments, totals } from "@/lib/prototype-data";

export const Route = createFileRoute("/admin/payments")({
  component: Payments,
});

const modes = [
  { id: "UPI", label: "UPI / BHIM", icon: Smartphone, hint: "PhonePe, GPay, Paytm, BHIM" },
  { id: "Net Banking", label: "Net Banking", icon: Landmark, hint: "58 banks incl. SBI, PNB, BoB" },
  { id: "Credit Card", label: "Credit Card", icon: CreditCard, hint: "Visa, Mastercard, RuPay" },
  { id: "Debit Card", label: "Debit Card", icon: CreditCard, hint: "All Indian banks" },
];

function Payments() {
  const [mode, setMode] = useState("UPI");
  const [done, setDone] = useState(false);
  const [q, setQ] = useState("");
  const rows = payments.filter((p) => p.allottee.toLowerCase().includes(q.toLowerCase()) || p.receiptNo.toLowerCase().includes(q.toLowerCase())).slice(0, 15);

  return (
    <>
      <PageHeader
        breadcrumb={["Home", "Revenue Operations", "Payments"]}
        title="Payments &amp; Collection Counter"
        description="Accept payment against any outstanding bill through the integrated government payment aggregator and issue a digitally signed receipt instantly."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Collection (Aug 2026)" value={inr(totals.collection, { compact: true })} tone="success" />
        <StatCard label="Transactions" value={payments.length} sub="Sample set" delay={60} />
        <StatCard label="Failed Transactions" value={payments.filter((p) => p.status === "Failed").length} tone="destructive" delay={120} />
        <StatCard label="Avg. Ticket Size" value={inr(payments.reduce((s, p) => s + p.amount, 0) / payments.length)} delay={180} />
      </div>

      <div className="mt-5 grid gap-4 xl:grid-cols-3">
        <SectionCard className="xl:col-span-2" title="Payment Gateway" description="UP Government Payment Aggregator • PCI-DSS compliant">
          <div className="grid gap-4 p-5">
            <div className="grid gap-3 sm:grid-cols-2">
              {modes.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMode(m.id)}
                  className={`flex items-center gap-3 rounded-xl border p-3 text-left transition-colors ${mode === m.id ? "border-primary bg-primary/8" : "border-border bg-card hover:bg-muted"}`}
                >
                  <span className={`grid size-9 place-items-center rounded-lg ${mode === m.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                    <m.icon className="size-4" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold">{m.label}</span>
                    <span className="block truncate text-[11px] text-muted-foreground">{m.hint}</span>
                  </span>
                </button>
              ))}
            </div>

            <div className="rounded-xl border border-border bg-muted/40 p-4 text-sm">
              <div className="flex items-center justify-between"><span className="text-muted-foreground">Bill No.</span><span className="num font-semibold">UC/2026/10231</span></div>
              <div className="mt-2 flex items-center justify-between"><span className="text-muted-foreground">Current Charge</span><span className="num">₹388.80</span></div>
              <div className="mt-2 flex items-center justify-between"><span className="text-muted-foreground">Arrear</span><span className="num">₹1,944.00</span></div>
              <div className="mt-3 flex items-center justify-between border-t border-border pt-3"><span className="font-bold">Amount Payable</span><span className="num text-lg font-bold text-primary">₹2,332.80</span></div>
            </div>

            <button onClick={() => setDone(true)} className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90">
              Proceed to Pay ₹2,332.80 via {mode}
            </button>

            {done ? (
              <div className="rounded-xl border border-success/30 bg-success/10 p-4">
                <p className="flex items-center gap-2 text-sm font-bold text-success"><CheckCircle2 className="size-4" /> Payment Successful</p>
                <div className="mt-3 grid gap-2 text-xs sm:grid-cols-2">
                  <p>Transaction ID: <span className="num font-semibold">TXN2026884917</span></p>
                  <p>Payment Date: <span className="num font-semibold">05-08-2026, 09:52 AM</span></p>
                  <p>Amount: <span className="num font-semibold">₹2,332.80</span></p>
                  <p>Receipt No.: <span className="num font-semibold">RCPT/2026/40822</span></p>
                </div>
                <button className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-success px-3 py-2 text-xs font-semibold text-success-foreground">
                  <FileDown className="size-4" /> Generate Digital Receipt
                </button>
              </div>
            ) : null}
          </div>
        </SectionCard>

        <SectionCard title="Transaction Log" description="Latest receipts issued">
          <div className="flex items-center gap-2 border-b border-border bg-muted/40 px-4 py-3">
            <Search className="size-4 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search receipt or allottee" className="w-full bg-transparent text-sm outline-none" />
          </div>
          <ul className="divide-y divide-border">
            {rows.map((p) => (
              <li key={p.id} className="flex items-center justify-between gap-3 px-4 py-2.5">
                <div className="min-w-0">
                  <p className="num truncate text-xs font-semibold text-primary">{p.receiptNo}</p>
                  <p className="truncate text-[11px] text-muted-foreground">{p.allottee} • {p.mode}</p>
                  <p className="num text-[10px] text-muted-foreground/80">{p.txnId} • {p.date}</p>
                </div>
                <div className="text-right">
                  <p className="num text-sm font-bold">{inr(p.amount)}</p>
                  <StatusChip status={p.status} />
                </div>
              </li>
            ))}
          </ul>
          <Pager from={1} to={rows.length} total={payments.length} />
        </SectionCard>
      </div>
    </>
  );
}
