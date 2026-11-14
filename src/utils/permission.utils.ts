
import type {
  AuthUser,
  UserRole,
} from "@/features/auth/types/auth.types";

export type Permission = NonNullable<AuthUser["permissions"]>[number];

export function hasPermission(
  user: AuthUser | null | undefined,
  permission: string
): boolean {
  return user?.permissions?.includes(permission) ?? false;
}

export function hasAnyPermission(
  user: AuthUser | null | undefined,
  permissions: string[]
): boolean {
  return permissions.some((permission) =>
    hasPermission(user, permission)
  );
}

export function hasAllPermissions(
  user: AuthUser | null | undefined,
  permissions: string[]
): boolean {
  return permissions.every((permission) =>
    hasPermission(user, permission)
  );
}

export function hasRole(
  roles: UserRole[],
  role: UserRole
): boolean {
  return roles.includes(role);
}
