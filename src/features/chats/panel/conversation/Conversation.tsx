
"use client";

import { useState } from "react";

import ChatHeader from "@/features/chats/panel/conversation/ChatHeader";
import MessageList from "@/features/chats/panel/conversation/MessageList";
import MessageComposer from "@/features/chats/panel/conversation/MessageComposer";

import type {
  ChatMessage,
  SelectedChat,
} from "@/features/chats/types/chat.types";

interface ConversationProps {
  selectedChat: NonNullable<SelectedChat>;
}

export default function Conversation({
  selectedChat,
}: ConversationProps) {
  const [replyTo, setReplyTo] = useState<ChatMessage | null>(null);

  const isProjectChannel = selectedChat.type === "channel";

  const projectId = isProjectChannel
    ? selectedChat.project.id
    : null;

  return (
    <section className="flex h-full min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
      <div className="shrink-0">
        <ChatHeader selectedChat={selectedChat} />
      </div>

      {projectId !== null ? (
        <>
          <MessageList
            projectId={projectId}
            onReply={setReplyTo}
          />

          <div className="shrink-0">
            <MessageComposer
              projectId={projectId}
              replyTo={replyTo}
              onCancelReply={() => setReplyTo(null)}
            />
          </div>
        </>
      ) : (
        <div className="flex min-h-0 flex-1 items-center justify-center text-sm text-muted-foreground">
          Direct messages are not connected to the API yet.
        </div>
      )}
    </section>
  );
}
