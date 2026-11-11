export interface ProjectFile {
  id: number;
  name: string;
  uploadedBy: string;
  size: string;
  uploadedAt: string;
  downloadUrl: string;
}

export interface ApiProjectFile {
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
  created_at: string;
  updated_at: string;
}

export interface ProjectFilesPagination {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface ProjectFilesListResult {
  files: ProjectFile[];
  pagination: ProjectFilesPagination;
}

export interface ProjectFilesResponse {
  success: boolean;
  message: string;
  data: {
    data: ApiProjectFile[];
    links: {
      first: string | null;
      last: string | null;
      prev: string | null;
      next: string | null;
    };
    meta: ProjectFilesPagination;
  };
}

export interface UploadProjectFileResponse {
  success: boolean;
  message: string;
  data: ApiProjectFile;
}
