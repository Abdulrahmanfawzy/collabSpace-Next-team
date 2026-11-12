import type { ReactNode } from "react";
import { requireAnyPermission } from "@/features/auth/permissions/authorization";

export default async function MeetingsLayout({ children }: { children: ReactNode }) {
  await requireAnyPermission("view_meetings", "join_meeting");
  return children;
}
