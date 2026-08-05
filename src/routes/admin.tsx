import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AdminShell } from "@/components/gov/AdminShell";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Portal | UP User Charge Management System" },
      {
        name: "description",
        content:
          "Authority admin workspace for scheme masters, plot allotment, rate notification, monthly demand generation and recovery MIS.",
      },
      { property: "og:title", content: "Admin Portal | UP User Charge Management System" },
      {
        property: "og:description",
        content: "Scheme masters, demand generation, collection MIS and recovery analytics for UP Development Authorities.",
      },
    ],
  }),
  component: () => (
    <AdminShell>
      <Outlet />
    </AdminShell>
  ),
});
