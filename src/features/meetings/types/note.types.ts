export interface MeetingNote {
  id: number;
  meeting_id: number;
  content: string;
  created_at?: string;
  updated_at?: string;
}

export interface CreateMeetingNoteValues {
  content: string;
}