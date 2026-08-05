import { createFileRoute } from "@tanstack/react-router";
import { FileSignature, Info, Save, RotateCcw, XCircle, CheckCircle2 } from "lucide-react";
import { PageHeader, SectionCard, StatusChip } from "@/components/gov/primitives";
import { allottees, currentAllottee, plots, rates, schemes } from "@/lib/prototype-data";
import { Field, SelectField } from "./admin.schemes";

export const Route = createFileRoute("/admin/allotment")({
  component: PlotAllotment,
});

const activeRate = rates.find((r) => r.status === "Active")!;

function PlotAllotment() {
  const vacant = plots.filter((p) => p.status === "Vacant").slice(0, 40);
  const recent = allottees.slice(0, 6);

  return (
    <>
      <PageHeader
        breadcrumb={["Home", "Masters", "Plot Allotment"]}
        title="Plot Allotment"
        description="Register an allottee against a vacant plot. User charge liability begins from the User Charge Start Date recorded below."
        actions={
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-xs font-semibold text-muted-foreground">
            <FileSignature className="size-4" /> Allotment File No. LDA/ALT/2026/0891
          </span>
        }
      />

      <div className="grid gap-4 xl:grid-cols-3">
        <SectionCard className="xl:col-span-2" title="Allotment Entry Form" description="All fields marked as per UP Urban Planning &amp; Development Act, 1973">
          <div className="grid gap-4 p-5 sm:grid-cols-2">
            <SelectField label="Select Scheme" options={schemes.map((s) => `${s.code} — ${s.name}`)} />
            <SelectField label="Select Plot (Vacant only)" options={vacant.map((p) => `${p.plotNo} • ${p.sector} • ${p.area} sq.m.`)} />
            <Field label="Plot Area (Sq. Meter)" value="162" />
            <Field label="Plot Category" value="Residential" />

            <div className="sm:col-span-2 mt-1 border-t border-border pt-4">
              <p className="text-[11px] font-bold uppercase tracking-wider text-primary">Allottee Particulars</p>
            </div>
            <Field label="Allottee Name" placeholder="e.g. Rajesh Kumar Singh" />
            <Field label="Father's / Husband's Name" placeholder="e.g. Shri Ram Naresh Singh" />
            <Field label="Mobile Number" placeholder="10 digit mobile number" />
            <Field label="Email Address" placeholder="name@example.com" />
            <label className="block sm:col-span-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Correspondence Address</span>
              <textarea
                rows={2}
                placeholder="House / Plot, Street, Locality, City, PIN"
                className="mt-1.5 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/25"
              />
            </label>
            <Field label="Aadhaar Number" placeholder="XXXX XXXX 1234" />
            <Field label="PAN Number" placeholder="ABCDE1234F" />
            <SelectField
              label="Occupation"
              options={["Government Service", "Business", "Private Service", "Retired (Pensioner)", "Professional", "Agriculture"]}
            />
            <Field label="Allotment Date" placeholder="DD-MM-YYYY" />
            <Field label="Possession Date" placeholder="DD-MM-YYYY" />
            <Field label="User Charge Start Date" placeholder="DD-MM-YYYY" />
            <SelectField label="Allotment Status" options={["Active", "Suspended", "Cancelled"]} />
          </div>

          <div className="flex flex-wrap items-center justify-end gap-2 border-t border-border bg-muted/40 px-5 py-3">
            <button className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-xs font-semibold hover:bg-muted">
              <XCircle className="size-4" /> Cancel
            </button>
            <button className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-xs font-semibold hover:bg-muted">
              <RotateCcw className="size-4" /> Update
            </button>
            <button className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90">
              <Save className="size-4" /> Save Allotment
            </button>
          </div>
        </SectionCard>

        <div className="space-y-4">
          <SectionCard title="Charge Computation Preview" description="Auto-calculated from plot area and active rate">
            <div className="space-y-3 p-4 text-sm">
              {[
                ["Plot Area", "162.00 sq.m."],
                ["Applicable Rate", `₹${activeRate.ratePerSqm.toFixed(2)} / sq.m.`],
                ["Rate Effective From", activeRate.effectiveFrom],
              ].map(([k, v]) => (
                <div key={k} className="flex items-center justify-between">
                  <span className="text-muted-foreground">{k}</span>
                  <span className="num font-semibold">{v}</span>
                </div>
              ))}
              <div className="flex items-center justify-between rounded-lg bg-primary/8 px-3 py-2.5">
                <span className="text-xs font-bold uppercase tracking-wider text-primary">Monthly User Charge</span>
                <span className="num text-lg font-bold text-primary">₹{(162 * activeRate.ratePerSqm).toFixed(2)}</span>
              </div>
              <p className="flex gap-2 rounded-lg bg-muted/60 p-3 text-[11px] leading-relaxed text-muted-foreground">
                <Info className="mt-0.5 size-3.5 shrink-0" />
                On rate revision, only future monthly demands use the new rate. Previously generated bills and accrued
                arrears retain their historical rate and are never recalculated.
              </p>
            </div>
          </SectionCard>

          <SectionCard title="Recent Allotments" description="Last 6 entries recorded">
            <ul className="divide-y divide-border">
              {recent.map((a) => (
                <li key={a.id} className="flex items-center justify-between gap-3 px-4 py-2.5">
                  <div className="min-w-0">
                    <p className="truncate text-xs font-semibold">{a.name}</p>
                    <p className="num truncate text-[11px] text-muted-foreground">
                      {a.plotNo} • {a.schemeCode} • {a.area} sq.m.
                    </p>
                  </div>
                  <StatusChip status={a.status} />
                </li>
              ))}
            </ul>
          </SectionCard>

          <SectionCard title="Verification Checklist">
            <ul className="space-y-2 p-4 text-xs">
              {["Aadhaar e-KYC verified", "PAN validated with NSDL", "Registry / lease deed uploaded", "Possession certificate issued"].map((c) => (
                <li key={c} className="flex items-center gap-2 text-muted-foreground">
                  <CheckCircle2 className="size-4 shrink-0 text-success" /> {c}
                </li>
              ))}
            </ul>
          </SectionCard>
        </div>
      </div>

      <p className="mt-4 text-[11px] text-muted-foreground">
        Reference sample allottee for the citizen portal demo: {currentAllottee.name} ({currentAllottee.allotteeCode}).
      </p>
    </>
  );
}
