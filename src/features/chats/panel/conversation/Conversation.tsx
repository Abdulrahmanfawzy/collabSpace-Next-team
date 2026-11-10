import ChatHeader from "@/features/chats/panel/conversation/ChatHeader";
import MessageList from "@/features/chats/panel/conversation/MessageList";
import MessageComposer from "@/features/chats/panel/conversation/MessageComposer";

import type { SelectedChat } from "@/features/chats/types/chat.types";

interface ConversationProps {
  selectedChat: NonNullable<SelectedChat>;
}

export default function Conversation({
  selectedChat,
}: ConversationProps) {
  const chatId =
    selectedChat.type === "direct"
      ? selectedChat.conversation.id
      : selectedChat.channel.id;

  return (
    <section className="flex h-full min-h-0 gap-5 flex-1 flex-col overflow-hidden">
      <ChatHeader selectedChat={selectedChat} />

      <MessageList chatId={chatId} />

      <MessageComposer />
    </section>
  );
}