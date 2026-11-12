import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { hasPermission, type Permission } from "./hasPermission";

export async function requireAnyPermission(...permissions: Permission[]) {
  const session = await auth();
  if (!session?.backendToken) redirect("/login");

  const roles = session.user?.roles ?? [];
  if (!permissions.some((permission) => hasPermission(roles, permission))) {
    redirect("/forbidden");
  }

  return session;
}
