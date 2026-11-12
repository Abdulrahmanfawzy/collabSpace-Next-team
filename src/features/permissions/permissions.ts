export const adminPermissions = [
  // Dashboard
  "view_dashboard",
  "view_analytics",

  // Users
  "view_users",
  "create_user",
  "update_user",
  "delete_user",

  // Projects
  "view_projects",
  "create_project",
  "edit_project",
  "delete_project",

  // Tasks
  "view_tasks",
  "create_task",
  "edit_task",
  "delete_task",
  "update_task_status",

  // Teams
  "view_teams",
  "create_team",
  "edit_team",
  "delete_team",
  "assign_project_member",

  // Files & Chat
  "upload_file",
  "delete_file",
  "access_all_project_chats",

  // Meetings
  "view_meetings",
  "schedule_meeting",
  "cancel_meeting",
  "reschedule_meeting",

  // Reports
  "view_all_reports",
  "generate_report",

  // AI & System
  "configure_ai",
  "use_ai_assistant",
  "manage_permissions",
  "manage_system_settings",
] as const;

export const managerPermissions = [
  "view_dashboard",
  "view_analytics",

  "view_projects",
  "create_project",
  "edit_project",

  "view_tasks",
  "create_task",
  "edit_task",
  "delete_task",
  "update_task_status",

  "view_teams",
  "assign_project_member",

  "upload_file",
  "delete_file",

  "view_meetings",
  "schedule_meeting",

  "generate_project_report",
  "view_project_reports",
] as const;

export const memberPermissions = [
  "view_dashboard",

  "view_projects",
  "view_tasks",
  "update_task_status",

  "upload_file",
  "send_project_chat",

  "view_meetings",
  "join_meeting",

  "view_personal_reports",
] as const;

// -------------------------------------------
export const permissionsByRole = {
  "Administrator": adminPermissions,
  "Project Manager": managerPermissions,
  "Team Member": memberPermissions,
} as const;