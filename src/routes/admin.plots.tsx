import { createFileRoute } from "@tanstack/react-router";
import { Plus, Search, Pencil, Grid2x2, CheckCircle2, CircleDashed, Ruler } from "lucide-react";
import { useState } from "react";
import { PageHeader, Pager, SectionCard, StatCard, StatusChip } from "@/components/gov/primitives";
import { plots, schemes } from "@/lib/prototype-data";
import { Field, SelectField } from "./admin.schemes";

export const Route = createFileRoute("/admin/plots")({
  component: PlotManagement,
});

function PlotManagement() {
  const [scheme, setScheme] = useState("All");
  const [status, setStatus] = useState("All");
  const [query, setQuery] = useState("");

  const rows = plots
    .filter(
      (p) =>
        (scheme === "All" || p.schemeCode === scheme) &&
        (status === "All" || p.status === status) &&
        (p.plotNo.toLowerCase().includes(query.toLowerCase()) || p.sector.toLowerCase().includes(query.toLowerCase())),
    )
    .slice(0, 25);

  const allottedCount = plots.filter((p) => p.status === "Allotted").length;

  return (
    <>
      <PageHeader
        breadcrumb={["Home", "Masters", "Plot Management"]}
        title="Plot Management"
        description="Plot-level master with area, sector, category and road width. Monthly user charge = plot area (sq.m.) × applicable rate per sq.m."
        actions={
          <button className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90">
            <Plus className="size-4" /> Add Plot
          </button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Plots in Register" value={plots.length} icon={<Grid2x2 className="size-5" />} sub="Digitised sample set" />
        <StatCard label="Allotted" value={allottedCount} tone="success" icon={<CheckCircle2 className="size-5" />} delay={60} />
        <StatCard label="Vacant" value={plots.length - allottedCount} tone="info" icon={<CircleDashed className="size-5" />} delay={120} />
        <StatCard label="Avg. Plot Area" value={`${(plots.reduce((a, p) => a + p.area, 0) / plots.length).toFixed(1)} sq.m.`} icon={<Ruler className="size-5" />} delay={180} />
      </div>

      <div className="mt-5 grid gap-4 xl:grid-cols-4">
        <SectionCard className="xl:col-span-3" title="Plot Register" description="Charge is levied only on plots with status ‘Allotted’">
          <div className="flex flex-wrap items-center gap-2 border-b border-border bg-muted/40 px-4 py-3">
            <div className="flex min-w-[200px] flex-1 items-center gap-2 rounded-lg border border-border bg-card px-3 py-2">
              <Search className="size-4 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search plot number or sector"
                className="w-full bg-transparent text-sm outline-none"
              />
            </div>
            <select value={scheme} onChange={(e) => setScheme(e.target.value)} className="rounded-lg border border-border bg-card px-3 py-2 text-sm">
              <option value="All">All Schemes</option>
              {schemes.map((s) => (
                <option key={s.code} value={s.code}>
                  {s.code}
                </option>
              ))}
            </select>
            <select value={status} onChange={(e) => setStatus(e.target.value)} className="rounded-lg border border-border bg-card px-3 py-2 text-sm">
              <option value="All">All Status</option>
              <option value="Vacant">Vacant</option>
              <option value="Allotted">Allotted</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/60 text-[11px] uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-4 py-2.5 text-left font-semibold">Plot No.</th>
                  <th className="px-4 py-2.5 text-left font-semibold">Scheme</th>
                  <th className="px-4 py-2.5 text-left font-semibold">Sector</th>
                  <th className="px-4 py-2.5 text-left font-semibold">Category</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Area (sq.m.)</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Road (m)</th>
                  <th className="px-4 py-2.5 text-center font-semibold">Corner</th>
                  <th className="px-4 py-2.5 text-left font-semibold">Status</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((p) => (
                  <tr key={p.id} className="border-t border-border hover:bg-muted/40">
                    <td className="num px-4 py-2.5 font-semibold">{p.plotNo}</td>
                    <td className="num px-4 py-2.5 text-xs text-primary">{p.schemeCode}</td>
                    <td className="px-4 py-2.5 text-xs text-muted-foreground">{p.sector}</td>
                    <td className="px-4 py-2.5 text-xs">{p.category}</td>
                    <td className="num px-4 py-2.5 text-right">{p.area}</td>
                    <td className="num px-4 py-2.5 text-right">{p.roadWidth}</td>
                    <td className="px-4 py-2.5 text-center text-xs">{p.corner ? "Yes" : "No"}</td>
                    <td className="px-4 py-2.5">
                      <StatusChip status={p.status} />
                    </td>
                    <td className="px-4 py-2.5 text-right">
                      <button className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 text-[11px] font-semibold hover:bg-muted">
                        <Pencil className="size-3" /> Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pager from={1} to={rows.length} total={plots.length} />
        </SectionCard>

        <SectionCard title="Add / Edit Plot" description="Plot master entry form">
          <div className="grid gap-4 p-4">
            <SelectField label="Scheme" options={schemes.map((s) => s.code)} />
            <Field label="Plot Number" placeholder="e.g. C-214" />
            <Field label="Sector" placeholder="e.g. Sector 6" />
            <SelectField label="Category" options={["Residential", "Commercial", "Institutional", "Group Housing"]} />
            <Field label="Area (Sq. Meter)" placeholder="e.g. 162" />
            <SelectField label="Road Width (m)" options={["9", "12", "18", "24", "30", "45"]} />
            <SelectField label="Corner Plot" options={["No", "Yes"]} />
            <SelectField label="Status" options={["Vacant", "Allotted"]} />
            <div className="flex gap-2 pt-1">
              <button className="flex-1 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90">
                Save Plot
              </button>
              <button className="rounded-lg border border-border bg-card px-3 py-2 text-xs font-semibold hover:bg-muted">Reset</button>
            </div>
          </div>
        </SectionCard>
      </div>
    </>
  );
}
