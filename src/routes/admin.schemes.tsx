import { createFileRoute } from "@tanstack/react-router";
import { Plus, Search, Pencil, Trash2, Eye, Filter, MapPin, X } from "lucide-react";
import { useState } from "react";
import { PageHeader, Pager, SectionCard, StatCard, StatusChip } from "@/components/gov/primitives";
import { AUTHORITIES, schemes } from "@/lib/prototype-data";

export const Route = createFileRoute("/admin/schemes")({
  component: SchemeManagement,
});

function SchemeManagement() {
  const [query, setQuery] = useState("");
  const [authority, setAuthority] = useState("All");
  const [open, setOpen] = useState(false);

  const rows = schemes.filter(
    (s) =>
      (authority === "All" || s.authority === authority) &&
      (s.name.toLowerCase().includes(query.toLowerCase()) ||
        s.code.toLowerCase().includes(query.toLowerCase()) ||
        s.location.toLowerCase().includes(query.toLowerCase())),
  );

  return (
    <>
      <PageHeader
        breadcrumb={["Home", "Masters", "Scheme Management"]}
        title="Scheme Management"
        description="Master register of housing and commercial schemes notified by Development Authorities. User charges are levied only on allotted plots of active schemes."
        actions={
          <button
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90"
          >
            <Plus className="size-4" /> Add Scheme
          </button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Schemes" value={schemes.length} sub="Notified & digitised" />
        <StatCard label="Active Schemes" value={schemes.filter((s) => s.status === "Active").length} tone="success" delay={60} />
        <StatCard label="Authorities" value={8} sub="Onboarded on UC-MS" delay={120} />
        <StatCard label="Plots Under Schemes" value={schemes.reduce((a, s) => a + s.totalPlots, 0).toLocaleString("en-IN")} delay={180} />
      </div>

      <SectionCard className="mt-5" title="Scheme Register" description={`${rows.length} scheme(s) matching current filters`}>
        <div className="flex flex-wrap items-center gap-2 border-b border-border bg-muted/40 px-4 py-3">
          <div className="flex min-w-[240px] flex-1 items-center gap-2 rounded-lg border border-border bg-card px-3 py-2">
            <Search className="size-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search scheme code, name or location"
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
          <select
            value={authority}
            onChange={(e) => setAuthority(e.target.value)}
            className="rounded-lg border border-border bg-card px-3 py-2 text-sm"
          >
            <option>All</option>
            {AUTHORITIES.map((a) => (
              <option key={a}>{a}</option>
            ))}
          </select>
          <button className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-xs font-semibold hover:bg-muted">
            <Filter className="size-4" /> More Filters
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/60 text-[11px] uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-2.5 text-left font-semibold">Scheme Code</th>
                <th className="px-4 py-2.5 text-left font-semibold">Scheme Name</th>
                <th className="px-4 py-2.5 text-left font-semibold">Authority</th>
                <th className="px-4 py-2.5 text-left font-semibold">Location</th>
                <th className="px-4 py-2.5 text-right font-semibold">Total Plots</th>
                <th className="px-4 py-2.5 text-right font-semibold">Allotted</th>
                <th className="px-4 py-2.5 text-left font-semibold">Status</th>
                <th className="px-4 py-2.5 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((s) => (
                <tr key={s.id} className="border-t border-border hover:bg-muted/40">
                  <td className="num px-4 py-2.5 font-semibold text-primary">{s.code}</td>
                  <td className="px-4 py-2.5 font-medium">
                    {s.name}
                    <span className="block text-[11px] text-muted-foreground">Launched {s.launchYear}</span>
                  </td>
                  <td className="px-4 py-2.5 text-xs text-muted-foreground">{s.authority}</td>
                  <td className="px-4 py-2.5 text-xs">
                    <span className="inline-flex items-center gap-1 text-muted-foreground">
                      <MapPin className="size-3.5" /> {s.location}
                    </span>
                  </td>
                  <td className="num px-4 py-2.5 text-right">{s.totalPlots.toLocaleString("en-IN")}</td>
                  <td className="num px-4 py-2.5 text-right">{s.allotted.toLocaleString("en-IN")}</td>
                  <td className="px-4 py-2.5">
                    <StatusChip status={s.status} />
                  </td>
                  <td className="px-4 py-2.5">
                    <div className="flex items-center justify-end gap-1">
                      <button title="View" className="grid size-7 place-items-center rounded-md border border-border hover:bg-muted">
                        <Eye className="size-3.5" />
                      </button>
                      <button title="Edit" className="grid size-7 place-items-center rounded-md border border-border hover:bg-muted">
                        <Pencil className="size-3.5" />
                      </button>
                      <button title="Delete" className="grid size-7 place-items-center rounded-md border border-border text-destructive hover:bg-destructive/10">
                        <Trash2 className="size-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pager from={1} to={rows.length} total={rows.length} />
      </SectionCard>

      {open ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-primary-deep/40 p-4 backdrop-blur-sm">
          <div className="surface-card w-full max-w-2xl overflow-hidden">
            <header className="gradient-header flex items-center justify-between px-5 py-3">
              <h2 className="text-sm font-bold">Add New Scheme</h2>
              <button onClick={() => setOpen(false)} className="grid size-7 place-items-center rounded-md bg-white/15">
                <X className="size-4" />
              </button>
            </header>
            <div className="grid gap-4 p-5 sm:grid-cols-2">
              <Field label="Scheme Code" placeholder="e.g. LDA/GOMTI-II/RES" />
              <Field label="Scheme Name" placeholder="e.g. Gomti Nagar Vistar Phase-II" />
              <SelectField label="Authority" options={AUTHORITIES} />
              <Field label="Location / Sector" placeholder="e.g. Sector 6, Gomti Nagar Vistar" />
              <Field label="Total Plots" placeholder="e.g. 1240" />
              <Field label="Launch Year" placeholder="e.g. 2026" />
              <SelectField label="Status" options={["Active", "Inactive"]} />
              <Field label="Board Resolution No." placeholder="e.g. BR/2026/118" />
            </div>
            <footer className="flex items-center justify-end gap-2 border-t border-border bg-muted/40 px-5 py-3">
              <button onClick={() => setOpen(false)} className="rounded-lg border border-border bg-card px-3 py-2 text-xs font-semibold hover:bg-muted">
                Cancel
              </button>
              <button onClick={() => setOpen(false)} className="rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90">
                Save Scheme
              </button>
            </footer>
          </div>
        </div>
      ) : null}
    </>
  );
}

export function Field({ label, placeholder, value }: { label: string; placeholder?: string; value?: string }) {
  return (
    <label className="block">
      <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
      <input
        defaultValue={value}
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/25"
      />
    </label>
  );
}

export function SelectField({ label, options }: { label: string; options: string[] }) {
  return (
    <label className="block">
      <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
      <select className="mt-1.5 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/25">
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}
