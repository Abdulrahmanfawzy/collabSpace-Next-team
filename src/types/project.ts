
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
  status: "Pending" | "In Progress" | "On Hold" | "Completed" | "Cancelled";
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

export interface ProjectFiltersParams {
  page?: number;
  per_page?: number;
  search?: string;
  status?: string;
  priority?: string;
  sort?: string;
}
