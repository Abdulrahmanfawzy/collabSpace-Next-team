import type { ApiResponse } from "@/features/auth/types/auth.types";

export type ProfileUser = {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  jobTitle: string;
  company: string;
  location: string;
  avatar: string;
  bio: string;
  experience: string;
  joinDate: string;
  skills: string[];
};


export type ProfileActivity = {
  id: number;
  title: string;
  timestamp: string;
};

export interface ApiProfileActivity {
  id: number;
  category: string;
  action: string;
  description: string;
  user: {
    id: number;
    name: string;
    avatar_url: string | null;
  };
  created_at: string;
}

export interface ProfileActivitiesPagination {
  current_page: number;
  data: ApiProfileActivity[];
  first_page_url?: string | null;
  from?: number | null;
  last_page: number;
  last_page_url?: string | null;
  links?: Array<{
    url: string | null;
    label: string;
    active: boolean;
  }>;
  next_page_url?: string | null;
  path?: string;
  per_page: number;
  prev_page_url?: string | null;
  to?: number | null;
  total: number;
}

export interface ProfileTaskProject {
  id: number;
  name: string;
  description: string;
  start_date: string;
  deadline: string;
  priority: string;
  status: string;
  progress_percentage: number;
  created_by: number;
  created_at: string;
  updated_at: string;
}

export interface ProfileTaskTeam {
  id: number;
  name: string;
  description: string;
  created_by: number;
  created_at: string;
  updated_at: string;
}

export interface ProfileTask {
  id: number;
  name: string;
  description: string;
  project_id: number;
  team_id: number;
  assigned_to: number;
  created_by: number;
  priority: string;
  status: string;
  due_date: string | null;
  hours_spent: number;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
  project: ProfileTaskProject | null;
  team: ProfileTaskTeam | null;
}

export interface ProfileTasksPagination {
  current_page: number;
  data: ProfileTask[];
  first_page_url?: string | null;
  from?: number | null;
  last_page: number;
  last_page_url?: string | null;
  links?: Array<{
    url: string | null;
    label: string;
    page?: number | null;
    active: boolean;
  }>;
  next_page_url?: string | null;
  path?: string;
  per_page: number;
  prev_page_url?: string | null;
  to?: number | null;
  total: number;
}

export type PDFFile = {
  id: number;
  name: string;
  author: string;
  date: string;
  size: string;
  url: string;
};

export interface ProfileFileProject {
  id: number;
  name: string;
}

export interface ProfileFileTask {
  id: number;
  name: string;
}

export interface ProfileFileUploader {
  id: number;
  name: string;
  email: string;
}

export interface ProfileFileApiItem {
  id: number;
  name: string;
  file_path: string;
  file_size: number;
  file_size_formatted: string;
  mime_type: string;
  url: string;
  project_id: number;
  task_id: number | null;
  uploaded_by: string;
  uploaded_by_id: number;
  project: ProfileFileProject | null;
  task: ProfileFileTask | null;
  uploader: ProfileFileUploader;
  created_at: string;
  updated_at: string;
}

export interface ProfileFilesPaginationLink {
  url: string | null;
  label: string;
  page: number | null;
  active: boolean;
}

export interface ProfileFilesPaginationMeta {
  current_page: number;
  from: number | null;
  last_page: number;
  links: ProfileFilesPaginationLink[];
  path: string;
  per_page: number;
  to: number | null;
  total: number;
}

export interface ProfileFilesPaginationLinks {
  first: string | null;
  last: string | null;
  prev: string | null;
  next: string | null;
}

export interface ProfileFilesData {
  data: ProfileFileApiItem[];
  links: ProfileFilesPaginationLinks;
  meta: ProfileFilesPaginationMeta;
}



export type ProfileFilesApiResponse = ApiResponse<ProfileFilesData>;
