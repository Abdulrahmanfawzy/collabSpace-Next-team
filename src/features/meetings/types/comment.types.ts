
export interface MeetingComment {
  id: number;
  meeting_id: number;
  user_id: number;
  body: string;
  parent_id: number | null;
  created_at?: string;
  updated_at?: string;

  // Optional user information
  user?: {
    id: number;
    name: string;
    avatar?: string | null;
  };

  // Replies
  replies?: MeetingComment[];
}

export interface CreateMeetingCommentValues {
  body: string;
  parent_id?: number | null;
}

export interface UpdateMeetingCommentValues {
  body: string;
}
