import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
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
      {
        property: "og:title",
        content: "Admin Portal | UP User Charge Management System",
      },
      {
        property: "og:description",
        content:
          "Scheme masters, demand generation, collection MIS and recovery analytics for UP Development Authorities.",
      },
    ],
  }),

  component: AdminLayout,
});

function AdminLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn");
    const role = localStorage.getItem("role");

    if (loggedIn !== "true" || role !== "admin") {
      navigate({ to: "/login" });
    }
  }, [navigate]);

  return (
    <AdminShell>
      <Outlet />
    </AdminShell>
  );
}