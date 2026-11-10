
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

export interface MeetingSummary {
  id: number;
  meeting_id: number;
  summary: string;
  decisions_made: string[];
  action_items: string[];
  assigned_tasks: string[];
  risks: string[];
  next_steps: string[];
  generated_by_ai: boolean;
  created_at: string;
  updated_at: string;
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
  summary: MeetingSummary | null;
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

export interface MeetingDetailsResponse {
  success: boolean;
  message: string;
  data: Meeting;
}

export interface CreateMeetingValues {
  title: string;
  description: string;
  meeting_date: string;
  start_time: string;
  end_time: string;
  meeting_link: string;
  project_id: number;
  participants: number[];
}
