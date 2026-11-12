"use client";

import { hasPermission } from "@/features/permissions/hasPermission";
import { useProjectRoles } from "./project-permissions-provider";

export function useProjectPermissions() {
  const roles = useProjectRoles();

  return {
    canCreateProject: hasPermission(roles, "create_project"),
    canEditProject: hasPermission(roles, "edit_project"),
    canDeleteProject: hasPermission(roles, "delete_project"),
    canAssignProjectMember: hasPermission(roles, "assign_project_member"),
    canViewTasks: hasPermission(roles, "view_tasks"),
    canCreateTask: hasPermission(roles, "create_task"),
    canEditTask: hasPermission(roles, "edit_task"),
    canDeleteTask: hasPermission(roles, "delete_task"),
    canUpdateTaskStatus: hasPermission(roles, "update_task_status"),
    canViewTeams: hasPermission(roles, "view_teams"),
    canUploadFile: hasPermission(roles, "upload_file"),
    canDeleteFile: hasPermission(roles, "delete_file"),
  };
}
