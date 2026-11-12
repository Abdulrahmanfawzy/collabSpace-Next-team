
export interface CommentAuthor {
  id: number;
  name: string;
  avatar_url: string | null;
  job_title: string | null;
}

export interface MeetingComment {
  id: number;
  meeting_id: number;
  parent_id: number | null;
  body: string;
  is_edited: boolean;
  author: CommentAuthor;
  can_edit: boolean;
  can_delete: boolean;
  replies_count: number;
  replies: MeetingComment[];
  created_at: string;
  updated_at: string;
}

export interface MeetingCommentsResponse {
  success: boolean;
  message: string;
  data: {
    data: MeetingComment[];
    links: {
      first: string | null;
      last: string | null;
      prev: string | null;
      next: string | null;
    };
    meta: {
      current_page: number;
      last_page: number;
      per_page: number;
      total: number;
    };
  };
}

export interface CreateMeetingCommentValues {
  body: string;
  parent_id?: number | null;
}

export interface UpdateMeetingCommentValues {
  body: string;
}
