import { permissionsByRole } from "./permissions";
import type { UserRole } from "@/features/auth/types/auth.types";

export type Permission = (typeof permissionsByRole)[UserRole][number];

export function hasPermission(
  roles: readonly UserRole[],
  permission: Permission,
): boolean {
  return roles.some((role) =>
    permissionsByRole[role].some((rolePermission) => rolePermission === permission),
  );
}

export function canViewReports(roles: readonly UserRole[]): boolean {
  return canViewProjectReports(roles) ||
    roles.some((role) => hasPermission([role], "view_personal_reports"));
}

export function canViewProjectReports(roles: readonly UserRole[]): boolean {
  return roles.some((role) =>
    hasPermission([role], "view_all_reports") ||
    hasPermission([role], "view_project_reports"),
  );
}

export function canAccessChats(roles: readonly UserRole[]): boolean {
  return roles.some((role) =>
    hasPermission([role], "access_all_project_chats") ||
    hasPermission([role], "access_project_chats") ||
    hasPermission([role], "send_project_chat"),
  );
}

export function canAccessMeetings(roles: readonly UserRole[]): boolean {
  return roles.some((role) =>
    hasPermission([role], "view_meetings") || hasPermission([role], "join_meeting"),
  );
}
