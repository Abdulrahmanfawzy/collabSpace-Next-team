import type { LucideIcon } from "lucide-react";

export interface DashboardData {
  overview: Overview;
  project_overview: ProjectOverview;
  active_projects: PaginatedResponse<ActiveProject>;
  tasks: PaginatedResponse<Task>;
  teams: PaginatedResponse<Team>;
  upcoming_meetings: { items: Meeting[] };
  recent_files: PaginatedResponse<RecentFile>;
  recent_activity: PaginatedResponse<RecentActivity>;
}

export interface Overview {
  projects: { total: number; active: number; completed: number; average_progress: number };
  tasks: {
    total: number; pending: number; in_progress: number; in_review: number; completed: number;
    pending_percentage: number; in_progress_percentage: number; in_review_percentage: number;
    completed_percentage: number; overdue: number; assigned_to_me: number; completion_rate: number;
    by_priority: { low: number; medium: number; high: number; critical: number };
  };
  meetings: { upcoming_count: number };
  teams: { total: number };
}

export interface ProjectOverview {
  period: string;
  group_by: string;
  data: ProjectOverviewItem[];
}
export interface ProjectOverviewItem { month: string; month_number: number; projects: number; completed_tasks: number }
export interface ActiveProject { id: number; name: string; progress: number; tasks_total: number | null; tasks_completed: number | null }
export type TaskStatus = "pending" | "in_progress" | "in_review" | "completed";
export type Priority = "low" | "medium" | "high" | "critical";
export interface Task {
  id: number; name: string; priority: Priority; status: TaskStatus; status_label: string;
  due_date: string; project: ProjectReference; assignee: User | null;
}
export interface Team { id: number; name: string; description: string; members_count: number; projects_count: number }
export interface TeamMember { id: number; name: string; done: number; total: number; avatarUrl?: string; isLeader?: boolean }
export interface Meeting {
  id: number; title: string; date: string; start_time: string; end_time: string;
  meeting_link: string; project: ProjectReference; creator: { id: number; name: string }; participants: User[];
}
export interface RecentFile {
  id: number; name: string; mime_type: string; file_size_formatted: string; download_url: string;
  uploaded_by: { id: number; name: string }; project: ProjectReference; created_at: string;
}
export interface RecentActivity { id: number; category: string; action: string; description: string; user: User; created_at: string }
export interface ProjectReference { id: number; name: string }
export interface User { id: number; name: string; avatar_url: string | null }
export interface Pagination { current_page: number; per_page: number; total: number }
export interface PaginatedResponse<T> { items: T[]; pagination: Pagination }

export type Stat = {
  title: string; value: number; total: number; change: number; icon: LucideIcon;
  badge: string; track: string; bar: string;
};
export type ProjectColor = "purple" | "teal";
export type ActiveProjectsProps = { projects: ActiveProject[]; viewAllHref?: string };
export type RecentFilesProps = { files: RecentFile[]; viewAllHref?: string };
export type TasksAndTeamsProps = { tasks: Task[]; teams: Team[]; tasksHref?: string };
export type MeetingsAndAskAIProps = { meetings: Meeting[]; meetingsHref?: string };
export type UpcomingMeetingsProps = { meetings: Meeting[]; viewAllHref?: string };
