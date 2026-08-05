import { createFileRoute } from "@tanstack/react-router";
import { Bell } from "lucide-react";
import { SectionCard } from "@/components/gov/primitives";
import { notifications } from "@/lib/prototype-data";

export const Route = createFileRoute("/portal/notifications")({
  component: Notifications,
});

function Notifications() {
  return (
    <SectionCard title="Notifications" description="Bill, payment and arrear alerts sent via SMS and email">
      <ul className="divide-y divide-border">
        {notifications.map((n) => (
          <li key={n.id} className="flex gap-3 px-4 py-3.5">
            <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
              <Bell className="size-4" />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-semibold">
                {n.title}
                {n.unread && <span className="ml-2 rounded-full bg-primary/12 px-2 py-0.5 text-[10px] font-bold text-primary">New</span>}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">{n.body}</p>
              <p className="num mt-1 text-[10px] text-muted-foreground/80">{n.time}</p>
            </div>
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}
