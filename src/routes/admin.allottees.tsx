import { createFileRoute } from "@tanstack/react-router";
import { Search, Eye, Pencil, Users, BadgeCheck, Ban, Phone, Mail } from "lucide-react";
import { useState } from "react";
import { PageHeader, Pager, SectionCard, StatCard, StatusChip } from "@/components/gov/primitives";
import { allottees, inr, rates, schemes } from "@/lib/prototype-data";

export const Route = createFileRoute("/admin/allottees")({
  component: AllotteeManagement,
});

const activeRate = rates.find((r) => r.status === "Active")!.ratePerSqm;

function AllotteeManagement() {
  const [query, setQuery] = useState("");
  const [scheme, setScheme] = useState("All");

  const rows = allottees
    .filter(
      (a) =>
        (scheme === "All" || a.schemeCode === scheme) &&
        (a.name.toLowerCase().includes(query.toLowerCase()) ||
          a.plotNo.toLowerCase().includes(query.toLowerCase()) ||
          a.mobile.includes(query)),
    )
    .slice(0, 20);

  return (
    <>
      <PageHeader
        breadcrumb={["Home", "Masters", "Allottee Management"]}
        title="Allottee Management"
        description="Consolidated allottee ledger with KYC particulars, plot linkage and monthly user charge liability."
        actions={
          <button className="rounded-lg border border-border bg-card px-3 py-2 text-xs font-semibold hover:bg-muted">
            Bulk KYC Verification
          </button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Allottees" value={allottees.length} icon={<Users className="size-5" />} sub="Sample working set" />
        <StatCard label="Active" value={allottees.filter((a) => a.status === "Active").length} tone="success" icon={<BadgeCheck className="size-5" />} delay={60} />
        <StatCard label="Suspended" value={allottees.filter((a) => a.status !== "Active").length} tone="warning" icon={<Ban className="size-5" />} delay={120} />
        <StatCard
          label="Monthly Liability"
          value={inr(allottees.reduce((s, a) => s + a.area * activeRate, 0), { compact: true })}
          sub={`@ ₹${activeRate.toFixed(2)} / sq.m.`}
          delay={180}
        />
      </div>

      <SectionCard className="mt-5" title="Allottee Ledger" description="KYC masked as per data protection guidelines">
        <div className="flex flex-wrap items-center gap-2 border-b border-border bg-muted/40 px-4 py-3">
          <div className="flex min-w-[240px] flex-1 items-center gap-2 rounded-lg border border-border bg-card px-3 py-2">
            <Search className="size-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search allottee name, plot number or mobile"
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
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/60 text-[11px] uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-2.5 text-left font-semibold">Allottee</th>
                <th className="px-4 py-2.5 text-left font-semibold">Contact</th>
                <th className="px-4 py-2.5 text-left font-semibold">Scheme / Plot</th>
                <th className="px-4 py-2.5 text-right font-semibold">Area</th>
                <th className="px-4 py-2.5 text-left font-semibold">KYC</th>
                <th className="px-4 py-2.5 text-left font-semibold">Charge Start</th>
                <th className="px-4 py-2.5 text-right font-semibold">Monthly Charge</th>
                <th className="px-4 py-2.5 text-left font-semibold">Status</th>
                <th className="px-4 py-2.5 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((a) => (
                <tr key={a.id} className="border-t border-border hover:bg-muted/40">
                  <td className="px-4 py-2.5">
                    <p className="font-medium">{a.name}</p>
                    <p className="text-[11px] text-muted-foreground">S/o {a.fatherName}</p>
                  </td>
                  <td className="px-4 py-2.5 text-[11px] text-muted-foreground">
                    <p className="flex items-center gap-1">
                      <Phone className="size-3" /> {a.mobile}
                    </p>
                    <p className="flex items-center gap-1 truncate">
                      <Mail className="size-3" /> {a.email}
                    </p>
                  </td>
                  <td className="px-4 py-2.5 text-xs">
                    <span className="num font-semibold text-primary">{a.plotNo}</span>
                    <span className="block text-[11px] text-muted-foreground">{a.schemeCode}</span>
                  </td>
                  <td className="num px-4 py-2.5 text-right">{a.area}</td>
                  <td className="px-4 py-2.5 text-[11px] text-muted-foreground">
                    <p className="num">{a.aadhaar}</p>
                    <p className="num">{a.pan}</p>
                  </td>
                  <td className="num px-4 py-2.5 text-xs">{a.chargeStartDate}</td>
                  <td className="num px-4 py-2.5 text-right font-semibold">{inr(+(a.area * activeRate).toFixed(2))}</td>
                  <td className="px-4 py-2.5">
                    <StatusChip status={a.status} />
                  </td>
                  <td className="px-4 py-2.5">
                    <div className="flex items-center justify-end gap-1">
                      <button className="grid size-7 place-items-center rounded-md border border-border hover:bg-muted">
                        <Eye className="size-3.5" />
                      </button>
                      <button className="grid size-7 place-items-center rounded-md border border-border hover:bg-muted">
                        <Pencil className="size-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pager from={1} to={rows.length} total={allottees.length} />
      </SectionCard>
    </>
  );
}
