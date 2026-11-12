import type { ReactNode } from "react";
import { requireAnyPermission } from "@/features/auth/permissions/authorization";

export default async function ProjectsLayout({ children }: { children: ReactNode }) {
  await requireAnyPermission("view_projects");
  return children;
}
