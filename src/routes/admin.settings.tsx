import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, SectionCard } from "@/components/gov/primitives";
import { Field, SelectField } from "./admin.schemes";

export const Route = createFileRoute("/admin/settings")({
  component: Settings,
});

function Settings() {
  return (
    <>
      <PageHeader
        breadcrumb={["Home", "Administration", "Settings"]}
        title="System Settings"
        description="Billing cycle, notification, gateway and organisation configuration for the User Charge Management System."
        actions={
          <button className="rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90">
            Save Settings
          </button>
        }
      />

      <div className="grid gap-4 xl:grid-cols-3">
        <SectionCard title="Billing Configuration">
          <div className="grid gap-4 p-4">
            <SelectField label="Bill Generation Day" options={["1st of month", "5th of month", "10th of month"]} />
            <Field label="Payment Due Days" value="15" />
            <Field label="Late Payment Interest (% p.a.)" value="12" />
            <SelectField label="Arrear Recalculation on Rate Change" options={["Disabled (recommended)", "Enabled"]} />
            <SelectField label="Rounding" options={["Nearest ₹1", "Two decimals"]} />
          </div>
        </SectionCard>

        <SectionCard title="Notification Settings">
          <div className="grid gap-4 p-4">
            <SelectField label="Bill Generated Alert" options={["SMS + Email", "SMS only", "Email only", "Disabled"]} />
            <SelectField label="Payment Success Receipt" options={["SMS + Email", "Email only"]} />
            <SelectField label="Payment Failure Alert" options={["SMS + Email", "SMS only"]} />
            <SelectField label="Pending Bill Reminder" options={["Weekly", "Fortnightly", "Monthly"]} />
            <SelectField label="Arrear Reminder" options={["Monthly", "Quarterly"]} />
            <Field label="SMS Sender ID" value="UPUCMS" />
          </div>
        </SectionCard>

        <SectionCard title="Gateway &amp; Organisation">
          <div className="grid gap-4 p-4">
            <SelectField label="Payment Aggregator" options={["UP Govt. Payment Aggregator", "SBI ePay", "BillDesk"]} />
            <Field label="Merchant Code" value="UPUCMS2026" />
            <SelectField label="Enabled Modes" options={["UPI, Net Banking, Credit & Debit Card", "UPI & Net Banking only"]} />
            <Field label="Department" value="Housing & Urban Planning Dept., Govt. of UP" />
            <Field label="Support Helpline" value="1800-180-5555" />
            <SelectField label="Financial Year" options={["2026-27", "2025-26"]} />
          </div>
        </SectionCard>
      </div>
    </>
  );
}
