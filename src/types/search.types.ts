export interface SearchTeamMember {
  id: number;
  name: string;
}

export interface SearchProjectItem {
  id: number;
  name: string;
  description?: string;
  start_date?: string;
  deadline?: string;
  status?: string;
  priority?: string;
  progress_percentage?: number;
  files_count?: number;
  teams?: SearchTeamMember[];
  created_at?: string;
}

export interface SearchUserItem {
  id: number;
  name: string;
  email: string;
  job_title?: string;
  about?: string;
  years_of_experience?: number;
  phone?: string;
  avatar_url?: string | null;
  status?: string;
  available_status?: string;
  current_project_id?: number | null;
  roles?: string[];
  permissions?: string[];
  created_at?: string;
  updated_at?: string;
}

export interface SearchTaskItem {
  id: number | string;
  title?: string;
  name?: string;
  description?: string;
  status?: string;
  priority?: string;
  project_id?: number;
  created_at?: string;
}

export interface SearchMeetingItem {
  id: number | string;
  title?: string;
  name?: string;
  description?: string;
  start_time?: string;
  date?: string;
  created_at?: string;
}

export interface SearchFileItem {
  id: number | string;
  name: string;
  file_size?: string;
  file_type?: string;
  url?: string;
  created_at?: string;
}

export interface SearchTeamItem {
  id: number | string;
  name: string;
  description?: string;
  members_count?: number;
}

export interface SearchGroup<T> {
  total: number;
  items: T[];
}

export interface SearchResultsGroups {
  projects?: SearchGroup<SearchProjectItem>;
  tasks?: SearchGroup<SearchTaskItem>;
  meetings?: SearchGroup<SearchMeetingItem>;
  files?: SearchGroup<SearchFileItem>;
  teams?: SearchGroup<SearchTeamItem>;
  users?: SearchGroup<SearchUserItem>;
}

export interface SearchData {
  query: string;
  total: number;
  results: SearchResultsGroups;
}

export interface SearchApiResponse {
  success: boolean;
  message?: string;
  data: SearchData;
}

