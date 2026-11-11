import type { StaticImageData } from "next/image"

export type TaskStatus =
  | "todo"
  | "in-progress"
  | "in-review"
  | "completed"

export type TaskPriority = "critical" | "high" | "medium" | "low"

export interface TaskFilters {
  page?: number;
  project_id?: number;
  status?: "Pending" | "In Progress" | "In Review" | "Completed";
  priority?: "Low" | "Medium" | "High" | "Critical";
  assigned_to?: number;
  due_date?: string;
  overdue?: 0 | 1;
  per_page?: number;
}

export interface Task {
  id: string
  name: string
  description: string | null
  status: TaskStatus
  priority: TaskPriority
  progress?: number
  assignees: {
    id: string
    name: string
    avatar: string | StaticImageData | null
  }[]
  commentsCount: number
  dueDate: string
  reviewer?: {
  name: string
  avatar: string | StaticImageData | null
}
}

export interface TaskColumn {
  id: TaskStatus
  title: string
  tasks: Task[]
}

export interface TaskBoardProps {
  columns: TaskColumn[]
  onAddTask?: (status: TaskStatus) => void
  onTaskClick?: (task: Task) => void
}

export interface ApiTaskAssignee {
  id: number | string;
  name: string;
  avatar_url?: string | null;
  avatar?: string | null;
}

export interface ApiTask {
  id: number | string;
  name?: string;
  title?: string;
  description?: string | null;
  status: string;
  priority: string;
  progress?: number | null;
  progress_percentage?: number | null;
  due_date?: string | null;
  completed_at?: string | null;
  hours_spent?: number | null;
  assigned_to?: number | string | ApiTaskAssignee | null;
  assignee?: ApiTaskAssignee | null;
  assignees?: ApiTaskAssignee[];
  assigned_users?: ApiTaskAssignee[];
  comments_count?: number;
  comments?: unknown[];
  reviewer?: ApiTaskAssignee | null;
}

export interface TasksPage {
  data: ApiTask[];
  links?: {
    first?: string | null;
    last?: string | null;
    prev?: string | null;
    next?: string | null;
  };
  meta?: {
    current_page?: number;
    last_page?: number;
    per_page?: number;
    total?: number;
  };
  current_page?: number;
  last_page?: number;
  per_page?: number;
  total?: number;
}

export interface TasksPagination {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface TasksListResult {
  tasks: ApiTask[];
  pagination: TasksPagination;
}

export interface TasksResponse {
  success: boolean;
  message: string;
  data: ApiTask[] | TasksPage;
}