import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, CreditCard, FileDown, Landmark, Lock, Smartphone } from "lucide-react";
import { useState } from "react";
import { SectionCard } from "@/components/gov/primitives";
import { currentAllottee as me, inr } from "@/lib/prototype-data";

export const Route = createFileRoute("/portal/pay")({
  component: PayOnline,
});

const modes = [
  { id: "UPI", label: "UPI / BHIM", icon: Smartphone },
  { id: "Net Banking", label: "Net Banking", icon: Landmark },
  { id: "Credit Card", label: "Credit Card", icon: CreditCard },
  { id: "Debit Card", label: "Debit Card", icon: CreditCard },
];

function PayOnline() {
  const [mode, setMode] = useState("UPI");
  const [paid, setPaid] = useState(false);

  if (paid) {
    return (
      <div className="surface-card rise-in mx-auto max-w-xl p-8 text-center">
        <span className="mx-auto grid size-14 place-items-center rounded-full bg-success/12 text-success">
          <CheckCircle2 className="size-7" />
        </span>
        <h1 className="mt-4 text-xl font-bold">Payment Successful</h1>
        <p className="mt-1 text-sm text-muted-foreground">Your user charge dues have been cleared. A receipt has been sent to your registered mobile and email.</p>
        <dl className="mt-5 divide-y divide-border rounded-xl border border-border text-sm">
          {[
            ["Receipt Number", "RCPT/2026/40833"],
            ["Transaction ID", "TXN2026885104"],
            ["Payment Date", "05-08-2026, 09:58 AM"],
            ["Payment Mode", mode],
            ["Amount Paid", inr(me.totalDue)],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between px-4 py-2.5">
              <dt className="text-muted-foreground">{k}</dt>
              <dd className="num font-semibold">{v}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-5 flex justify-center gap-2">
          <button className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground">
            <FileDown className="size-4" /> Download Receipt
          </button>
          <button onClick={() => setPaid(false)} className="rounded-lg border border-border bg-card px-3 py-2 text-xs font-semibold hover:bg-muted">
            Back to Payment
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-4 lg:grid-cols-5">
      <SectionCard className="lg:col-span-3" title="Select Payment Mode" description="Secure government payment aggregator">
        <div className="grid gap-3 p-5 sm:grid-cols-2">
          {modes.map((m) => (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              className={`flex items-center gap-3 rounded-xl border p-3 text-left ${mode === m.id ? "border-primary bg-primary/8" : "border-border hover:bg-muted"}`}
            >
              <span className={`grid size-9 place-items-center rounded-lg ${mode === m.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                <m.icon className="size-4" />
              </span>
              <span className="text-sm font-semibold">{m.label}</span>
            </button>
          ))}
          <label className="block sm:col-span-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              {mode === "UPI" ? "UPI ID / VPA" : mode === "Net Banking" ? "Select Bank" : "Card Number"}
            </span>
            <input
              placeholder={mode === "UPI" ? "yourname@upi" : mode === "Net Banking" ? "State Bank of India" : "XXXX XXXX XXXX XXXX"}
              className="mt-1.5 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/25"
            />
          </label>
          <p className="flex gap-2 text-[11px] text-muted-foreground sm:col-span-2">
            <Lock className="mt-0.5 size-3.5 shrink-0 text-primary" /> Your payment is processed over a PCI-DSS compliant encrypted channel. Never share your OTP.
          </p>
        </div>
      </SectionCard>

      <SectionCard className="lg:col-span-2" title="Outstanding Summary" description={`Plot ${me.plotNo} • ${me.scheme}`}>
        <div className="space-y-3 p-5 text-sm">
          <div className="flex justify-between"><span className="text-muted-foreground">Current Bill (Mar 2026)</span><span className="num font-semibold">{inr(me.currentBill)}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Pending Arrear</span><span className="num font-semibold">{inr(me.arrear)}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Interest / Late Fee</span><span className="num font-semibold">₹0.00</span></div>
          <div className="flex items-center justify-between rounded-lg bg-primary/8 px-3 py-3">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Grand Total</span>
            <span className="num text-xl font-bold text-primary">{inr(me.totalDue)}</span>
          </div>
          <button onClick={() => setPaid(true)} className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90">
            Pay Now
          </button>
        </div>
      </SectionCard>
    </div>
  );
}
