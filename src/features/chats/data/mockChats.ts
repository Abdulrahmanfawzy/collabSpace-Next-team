
import meAvatar from "@/assets/me.jpg";
import ahmedAvatar from "@/assets/avatars/ahmed.jpg";
import mahmoudAvatar from "@/assets/avatars/mahmoud.jpg";
import mohanadAvatar from "@/assets/avatars/mohanad.jpg";
import nadirAvatar from "@/assets/avatars/nadir.jpg";
import omarAvatar from "@/assets/avatars/omar.jpg";

import type {
  ChatUser,
  ChatMessage,
  ChatConversation,
  ChatProject,
} from "../types/chat.types";

// ==============================
// Current User
// ==============================

export const currentUser: ChatUser = {
  id: "user-0",
  name: "Abdulrahim Elsayed",
  avatar: meAvatar.src,
  isOnline: true,
};

// ==============================
// Chat Users
// ==============================

export const chatUsers: ChatUser[] = [
  {
    id: "user-1",
    name: "Mohamed Ahmed",
    avatar: ahmedAvatar.src,
    isOnline: true,
  },
  {
    id: "user-2",
    name: "Salah Ali",
    avatar: mohanadAvatar.src,
    isOnline: false,
  },
  {
    id: "user-3",
    name: "Ramzy Khaled",
    avatar: omarAvatar.src,
    isOnline: true,
  },
  {
    id: "user-4",
    name: "Sohaib Rady",
    avatar: nadirAvatar.src,
    isOnline: false,
  },
  {
    id: "user-5",
    name: "Mohamed Ahmed",
    avatar: mahmoudAvatar.src,
    isOnline: true,
  },
];

// ==============================
// Chat Messages
// ==============================

export const chatMessages: ChatMessage[] = [
  {
    id: "msg-1",
    conversationId: "conv-1",
    sender: chatUsers[0],
    text: "Yes, we can do this and everything is ready.",
    createdAt: "2026-11-07T17:22:00",
    replies: [
      {
        id: "reply-1",
        sender: currentUser,
        text: "Perfect! Let's start working on it.",
        createdAt: "2026-11-07T17:25:00",
      },
    ],
  },
  {
    id: "msg-2",
    conversationId: "conv-2",
    sender: chatUsers[1],
    text: "Please try and do this and let me know.",
    createdAt: "2026-11-07T19:22:00",
  },
  {
    id: "msg-3",
    conversationId: "conv-3",
    sender: chatUsers[2],
    text: "I don't know and everything looks different.",
    createdAt: "2026-11-07T17:22:00",
  },
  {
    id: "msg-4",
    conversationId: "conv-4",
    sender: chatUsers[3],
    text: "Please call me later for more details.",
    createdAt: "2026-11-07T17:22:00",
  },
  {
    id: "msg-5",
    conversationId: "conv-5",
    sender: chatUsers[4],
    text: "Yes, we can do this and everything is ready.",
    createdAt: "2026-11-07T17:22:00",
    isPinned: true,
  },
];

// ==============================
// Direct Conversations
// ==============================

export const directConversations: ChatConversation[] = [
  {
    id: "conv-1",
    type: "direct",
    name: chatUsers[0].name,
    avatar: chatUsers[0].avatar,
    participants: [currentUser, chatUsers[0]],
    lastMessage: chatMessages[0],
    unreadCount: 0,
    isOnline: chatUsers[0].isOnline,
  },
  {
    id: "conv-2",
    type: "direct",
    name: chatUsers[1].name,
    avatar: chatUsers[1].avatar,
    participants: [currentUser, chatUsers[1]],
    lastMessage: chatMessages[1],
    unreadCount: 0,
    isOnline: chatUsers[1].isOnline,
  },
  {
    id: "conv-3",
    type: "direct",
    name: chatUsers[2].name,
    avatar: chatUsers[2].avatar,
    participants: [currentUser, chatUsers[2]],
    lastMessage: chatMessages[2],
    unreadCount: 0,
    isOnline: chatUsers[2].isOnline,
  },
  {
    id: "conv-4",
    type: "direct",
    name: chatUsers[3].name,
    avatar: chatUsers[3].avatar,
    participants: [currentUser, chatUsers[3]],
    lastMessage: chatMessages[3],
    unreadCount: 0,
    isOnline: chatUsers[3].isOnline,
  },
  {
    id: "conv-5",
    type: "direct",
    name: chatUsers[4].name,
    avatar: chatUsers[4].avatar,
    participants: [currentUser, chatUsers[4]],
    lastMessage: chatMessages[4],
    unreadCount: 0,
    isOnline: chatUsers[4].isOnline,
  },
];

// ==============================
// Project Chats
// ==============================

export const chatProjects: ChatProject[] = [
  {
    id: "project-1",
    name: "CollabSpace AI",
    channels: [
      {
        id: "channel-1",
        name: "general",
        description: "General project discussions",
        unreadCount: 3,
      },
      {
        id: "channel-2",
        name: "design",
        description: "UI/UX design discussions",
        unreadCount: 0,
      },
      {
        id: "channel-3",
        name: "development",
        description: "Development discussions",
        unreadCount: 1,
      },
    ],
  },
  {
    id: "project-2",
    name: "Safarni",
    channels: [
      {
        id: "channel-4",
        name: "general",
        description: "General discussions",
        unreadCount: 0,
      },
      {
        id: "channel-5",
        name: "frontend",
        description: "Frontend development discussions",
        unreadCount: 2,
      },
    ],
  },
];
