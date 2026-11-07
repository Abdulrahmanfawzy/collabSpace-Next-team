
export type ChatTab = "direct" | "projects";

export interface ChatUser {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
}

export interface ChatAttachment {
  id: string;
  name: string;
  url: string;
  type: "image" | "file";
  size?: string;
}

export interface ThreadReply {
  id: string;
  sender: ChatUser;
  text: string;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  sender: ChatUser;
  text: string;
  createdAt: string;
  attachments?: ChatAttachment[];
  replies?: ThreadReply[];
  isPinned?: boolean;
}

export interface ChatConversation {
  id: string;
  type: "direct" | "channel";
  name: string;
  avatar?: string;
  participants: ChatUser[];
  lastMessage?: ChatMessage;
  unreadCount: number;
  isOnline?: boolean;
}

export interface ChatChannel {
  id: string;
  name: string;
  description?: string;
  unreadCount: number;
}

export interface ChatProject {
  id: string;
  name: string;
  channels: ChatChannel[];
}
