export interface Message {
  id: string;
  chatId: string;
  sender: {
    id: string;
    name: string;
    avatarUrl: string;
  };
  content: string;
  timestamp: string;
  date: string;
  isOwn: boolean;
  tags?: string[];
}

export const messages: Message[] = [
  {
    id: "msg-1",
    chatId: "conversation-1",
    sender: {
      id: "user-1",
      name: "Mohamed Ahmed",
      avatarUrl: "/avatars/mohamed-ahmed.jpg",
    },
    content:
      "Hey team! I've finished the initial design for the dashboard. What do you think?",
    timestamp: "10:30 AM",
    date: "2026-11-08",
    isOwn: false,
    tags: ["Design"],
  },
  {
    id: "msg-2",
    chatId: "conversation-1",
    sender: {
      id: "user-2",
      name: "Abdulrahim Elsayed",
      avatarUrl: "/avatars/abdulrahim.jpg",
    },
    content:
      "Looks great! I really like the overall layout. The navigation is clean and easy to use.",
    timestamp: "10:32 AM",
    date: "2026-11-08",
    isOwn: true,
  },
  {
    id: "msg-3",
    chatId: "conversation-1",
    sender: {
      id: "user-3",
      name: "Ahmed Hassan",
      avatarUrl: "/avatars/ahmed-hassan.jpg",
    },
    content:
      "Agreed! I think we should also check the responsive behavior on mobile screens.",
    timestamp: "10:35 AM",
    date: "2026-11-08",
    isOwn: false,
    tags: ["Feedback"],
  },
  {
    id: "msg-4",
    chatId: "conversation-1",
    sender: {
      id: "user-1",
      name: "Mohamed Ahmed",
      avatarUrl: "/avatars/mohamed-ahmed.jpg",
    },
    content:
      "Good point. I'll prepare the mobile version and share it with everyone.",
    timestamp: "10:38 AM",
    date: "2026-11-08",
    isOwn: false,
  },
  {
    id: "msg-5",
    chatId: "conversation-1",
    sender: {
      id: "user-2",
      name: "Abdulrahim Elsayed",
      avatarUrl: "/avatars/abdulrahim.jpg",
    },
    content:
      "Perfect! I'll start working on the frontend implementation.",
    timestamp: "10:42 AM",
    date: "2026-11-08",
    isOwn: true,
    tags: ["Development"],
  },
];