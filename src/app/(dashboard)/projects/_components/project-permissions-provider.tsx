"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { UserRole } from "@/features/auth/types/auth.types";

const ProjectRolesContext = createContext<UserRole[] | null>(null);

export function ProjectPermissionsProvider({
  roles,
  children,
}: {
  roles: UserRole[];
  children: ReactNode;
}) {
  return (
    <ProjectRolesContext.Provider value={roles}>
      {children}
    </ProjectRolesContext.Provider>
  );
}

export function useProjectRoles() {
  const roles = useContext(ProjectRolesContext);

  if (!roles) {
    throw new Error(
      "Project permission checks must be used within ProjectPermissionsProvider."
    );
  }

  return roles;
}
