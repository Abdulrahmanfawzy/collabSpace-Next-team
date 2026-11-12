
import EmptyState from "@/features/chats/panel/EmptyState";
import Conversation from "@/features/chats/panel/conversation/Conversation";

import type { SelectedChat } from "@/features/chats/types/chat.types";
import type { AuthUser } from "@/features/auth/types/auth.types";

interface ChatPanelProps {
  selectedChat: SelectedChat;
  user: AuthUser | null;
}

export default function ChatPanel({
  selectedChat,
  user,
}: ChatPanelProps) {
  return (
    <main className="flex h-full min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
      {selectedChat ? (
        <Conversation
          selectedChat={selectedChat}
          user={user}
        />
      ) : (
        <EmptyState />
      )}
    </main>
  );
}
