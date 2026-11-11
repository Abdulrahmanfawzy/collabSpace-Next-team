
export interface ChatSender {
  id: number;
  name: string;
  email: string;
  avatar_url: string | null;
  job_title: string | null;
}

export interface ChatMessage {
  id: number;
  project_id: number;
  message: string;
  is_edited: boolean;
  sender: ChatSender;

  // Shapes not fully verified yet
  parent: unknown | null;
  attachment: unknown | null;
  mentions: unknown[];

  is_read_by_me: boolean;
  readers_count: number;
  created_at: string;
  updated_at: string;
}

export interface PaginationLink {
  url: string | null;
  label: string;
  page: number | null;
  active: boolean;
}

export interface PaginationMeta {
  current_page: number;
  from: number | null;
  last_page: number;
  links: PaginationLink[];
  path: string;
  per_page: number;
  to: number | null;
  total: number;
}

export interface ChatPaginationLinks {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
}

export interface PaginatedChatMessages {
  data: ChatMessage[];
  links: ChatPaginationLinks;
  meta: PaginationMeta;
}

export interface ChatMessagesResponse {
  success: boolean;
  message: string;
  data: PaginatedChatMessages;
}

export interface ChatMessageResponse {
  success: boolean;
  message: string;
  data: ChatMessage;
}
