import EmptyState from "@/features/chats/panel/EmptyState";
import Conversation from "@/features/chats/panel/conversation/Conversation";

import type { SelectedChat } from "@/features/chats/types/chat.types";

interface ChatPanelProps {
  selectedChat: SelectedChat;
}

export default function ChatPanel({ selectedChat }: ChatPanelProps) {
  return (
    <main className="flex h-full min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
      {selectedChat ? (
        <Conversation selectedChat={selectedChat} />
      ) : (
        <EmptyState />
      )}
    </main>
  );
}