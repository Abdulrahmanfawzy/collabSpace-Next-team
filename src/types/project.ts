
export interface ProjectTeam {
  id: number;
  name: string;
}

export interface Project {
  id: number;
  name: string;
  description: string;
  start_date: string;
  deadline: string;
  status: "Planning" | "Pending" | "In Progress" | "On Hold" | "Completed" | "Cancelled";
  priority: "Low" | "Medium" | "High" | "Critical";
  progress_percentage: number;
  files_count: number;
  teams: ProjectTeam[];
  created_at: string;
}

export interface ProjectsMeta {
  current_page: number;
  from: number | null;
  last_page: number;
  per_page: number;
  to: number | null;
  total: number;
}

export interface ProjectsLinks {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
}

export interface ProjectsPayload {
  data: Project[];
  links: ProjectsLinks;
  meta: ProjectsMeta;
}

export interface ProjectsResponse {
  success: boolean;
  message: string;
  data: ProjectsPayload;
}
// ------------------- overview -------------------
export interface ProjectOverviewTeam {
  id: number;
  name: string;
  description: string;
  created_by: number;
  members_count: number;
  active_projects_count: number;
  created_at: string;
  updated_at: string;
}

export interface ProjectOverviewMember {
  id: number;
  name: string;
  email: string;
  avatar_url: string | null;
  job_title: string | null;
  role: string;
}

export interface ProjectOverview {
  id: number;
  name: string;
  description: string;
  status: Project["status"];
  priority: Project["priority"];
  progress_percentage: number;
  due_date_indicator: {
    start_date: string;
    deadline: string;
    total_days: number;
    days_remaining: number;
    is_overdue: boolean;
  };
  tasks_statistics: {
    total: number;
    pending: number;
    in_progress: number;
    in_review: number;
    completed: number;
    completion_rate: number;
  };
  counts: {
    files: number;
    meetings: number;
    messages: number;
    teams: number;
    direct_members: number;
  };
  teams: ProjectOverviewTeam[];
  direct_members: ProjectOverviewMember[];
  created_by: number;
  creator: {
    id: number;
    name: string;
    email: string;
  };
  created_at: string;
  updated_at: string;
  chart: ProjectChart;
}

export interface ProjectOverviewResponse {
  success: boolean;
  message: string;
  data: ProjectOverview;
}


export interface ProjectFiltersParams {
  page?: number;
  per_page?: number;
  search?: string;
  status?: string;
  priority?: string;
  sort?: string;
}
type OverviewPeriod = "month" | "year";
export interface ProjectOverviewParams {
  id: number;
  period: OverviewPeriod;
  year: number;
}
//--chart overview
export interface ProjectChartData {
  month: string;
  month_number: number;
  year: number;
  label: string;
  created_tasks: number;
  completed_tasks: number;
  progress_percentage: number;
  is_future: boolean;
}

export interface ProjectChart {
  period: string;
  year: number;
  group_by: string;
  data: ProjectChartData[];
}
// ---------------- add project ----------------

export interface CreateProjectPayload {
  name: string;
  description: string;
  start_date: string;
  deadline: string;
  priority: "Low" | "Medium" | "High" | "Critical";
  status: Project["status"];
  teams: number[];
  members: {
    user_id: number;
    role: string;
  }[];
}

export interface CreateProjectResponse {
  success: boolean;
  message: string;
  data: ProjectOverview;
}

export type UpdateProjectPayload = Pick<
  CreateProjectPayload,
  "name" | "description" | "start_date" | "deadline" | "status" | "priority"
>;

export interface ProjectMutationResponse {
  success: boolean;
  message: string;
}

// -------------update project----------------

export interface UpdatedProject extends Omit<ProjectOverview, "tasks_statistics"> {
  tasks_statistics: ProjectOverview["tasks_statistics"] & {
    pending_percentage: number;
    in_progress_percentage: number;
    in_review_percentage: number;
    completed_percentage: number;
  };
}

export interface UpdateProjectResponse {
  success: boolean;
  message: string;
  data: UpdatedProject;
}