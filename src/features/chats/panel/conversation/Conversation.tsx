
"use client";

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
  const isProjectChannel = selectedChat.type === "channel";

  const projectId = isProjectChannel
    ? selectedChat.project.id
    : null;

  return (
    <section className="flex h-full min-h-0 flex-1 flex-col gap-5 overflow-hidden">
      <ChatHeader selectedChat={selectedChat} />

      {projectId !== null ? (
        <>
          <MessageList projectId={projectId} />

          <MessageComposer projectId={projectId} />
        </>
      ) : (
        <div className="flex min-h-0 flex-1 items-center justify-center text-sm text-muted-foreground">
          Direct messages are not connected to the API yet.
        </div>
      )}
    </section>
  );
}
