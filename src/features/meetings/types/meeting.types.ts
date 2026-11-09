
export interface MeetingProject {
  id: number;
  name: string;
}

export interface MeetingCreator {
  id: number;
  name: string;
  email: string;
}

export interface MeetingParticipant {
  id: number;
  name: string;
  email: string;
  avatar_url: string | null;
  job_title: string;
  attended: boolean;
}

export interface Meeting {
  id: number;
  title: string;
  description: string | null;
  meeting_date: string;
  start_time: string;
  end_time: string;
  meeting_link: string | null;
  status: string;
  project_id: number;
  created_by: number;
  project: MeetingProject;
  creator: MeetingCreator;
  participants_count: number;
  participants: MeetingParticipant[];
  summary: string | null;
  created_at: string;
  updated_at: string;
}

export interface PaginationLinks {
  first: string | null;
  last: string | null;
  prev: string | null;
  next: string | null;
}

export interface PaginationMeta {
  current_page: number;
  from: number | null;
  last_page: number;
  per_page: number;
  to: number | null;
  total: number;
}

export interface MeetingsResponse {
  success: boolean;
  message: string;
  data: {
    data: Meeting[];
    links: PaginationLinks;
    meta: PaginationMeta;
  };
}
