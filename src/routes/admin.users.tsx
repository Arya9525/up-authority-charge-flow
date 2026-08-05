import { createFileRoute } from "@tanstack/react-router";
import { UserPlus, ShieldCheck } from "lucide-react";
import { PageHeader, SectionCard, StatCard, StatusChip } from "@/components/gov/primitives";
import { adminUsers, auditTrail } from "@/lib/prototype-data";

export const Route = createFileRoute("/admin/users")({
  component: UserManagement,
});

function UserManagement() {
  return (
    <>
      <PageHeader
        breadcrumb={["Home", "Administration", "User Management"]}
        title="User Management"
        description="Role based access control for authority officials. Roles govern module visibility, approval powers and financial limits."
        actions={
          <button className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90">
            <UserPlus className="size-4" /> Add User
          </button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Users" value={adminUsers.length} icon={<ShieldCheck className="size-5" />} />
        <StatCard label="Active" value={adminUsers.filter((u) => u.status === "Active").length} tone="success" delay={60} />
        <StatCard label="Roles Configured" value={6} delay={120} />
        <StatCard label="Authorities" value={8} tone="info" delay={180} />
      </div>

      <div className="mt-5 grid gap-4 xl:grid-cols-3">
        <SectionCard className="xl:col-span-2" title="Official Users" description="Mapped to authority and designation">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/60 text-[11px] uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-4 py-2.5 text-left font-semibold">Officer</th>
                  <th className="px-4 py-2.5 text-left font-semibold">Authority</th>
                  <th className="px-4 py-2.5 text-left font-semibold">Role</th>
                  <th className="px-4 py-2.5 text-left font-semibold">Last Login</th>
                  <th className="px-4 py-2.5 text-left font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {adminUsers.map((u) => (
                  <tr key={u.id} className="border-t border-border hover:bg-muted/40">
                    <td className="px-4 py-2.5">
                      <p className="font-medium">{u.name}</p>
                      <p className="text-[11px] text-muted-foreground">{u.designation} • {u.email}</p>
                    </td>
                    <td className="px-4 py-2.5 text-xs text-muted-foreground">{u.authority}</td>
                    <td className="px-4 py-2.5 text-xs font-semibold text-primary">{u.role}</td>
                    <td className="num px-4 py-2.5 text-xs text-muted-foreground">{u.lastLogin}</td>
                    <td className="px-4 py-2.5"><StatusChip status={u.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        <SectionCard title="Audit Trail" description="Privileged actions log">
          <ul className="divide-y divide-border">
            {auditTrail.map((a) => (
              <li key={a.time} className="px-4 py-3">
                <p className="text-xs font-semibold">{a.action}</p>
                <p className="mt-1 text-[11px] text-muted-foreground">{a.user} • {a.module}</p>
                <p className="text-[10px] text-muted-foreground/80">{a.time}</p>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>
    </>
  );
}
