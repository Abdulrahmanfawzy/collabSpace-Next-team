import {
  permissionsByRole,
} from "./permissions";

import type { UserRole } from "@/features/auth/types/auth.types";

export type Permission =
  (typeof permissionsByRole)[UserRole][number];

export function hasPermission(
  roles: UserRole[],
  permission: Permission
): boolean {
  return roles.some((role) =>
    permissionsByRole[role].includes(
      permission as never
    )
  );
}