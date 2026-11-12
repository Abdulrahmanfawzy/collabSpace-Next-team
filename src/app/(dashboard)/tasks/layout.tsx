import type { ReactNode } from "react";
import { requireAnyPermission } from "@/features/auth/permissions/authorization";

export default async function TasksLayout({ children }: { children: ReactNode }) {
  await requireAnyPermission("view_tasks");
  return children;
}
