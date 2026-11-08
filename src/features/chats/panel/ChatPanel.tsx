import EmptyState from "@/features/chats/panel/EmptyState";
import Conversation from "@/features/chats/panel/conversation/Conversation";

import type { ComponentType } from "react";
import type { SelectedChat } from "@/features/chats/types/chat.types";

const ConversationWithSelectedChat = Conversation as ComponentType<{
  selectedChat: SelectedChat;
}>;

interface ChatPanelProps {
  selectedChat: SelectedChat;
}

export default function ChatPanel({
  selectedChat,
}: ChatPanelProps) {
  return (
    <main className="flex h-full min-w-0 flex-1 flex-col overflow-hidden">
      {selectedChat ? (
        <ConversationWithSelectedChat selectedChat={selectedChat} />
      ) : (
        <EmptyState />
      )}
    </main>
  );
}