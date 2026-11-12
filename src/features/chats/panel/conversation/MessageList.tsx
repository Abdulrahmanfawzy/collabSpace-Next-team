
"use client";

import { useEffect, useRef } from "react";

import { useProjectMessages } from "@/features/chats/hooks/useProjectMessages";
import DateDivider from "@/features/chats/panel/conversation/DateDivider";

import type { ChatMessage } from "@/features/chats/types/chat.types";

interface MessageListProps {
  projectId: number;
  onReply: (message: ChatMessage) => void;
}

export default function MessageList({
  projectId,
  onReply,
}: MessageListProps) {
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useProjectMessages(projectId);

  const bottomRef = useRef<HTMLDivElement>(null);

  const chatMessages = data?.data.data ?? [];

  // Scroll to the latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [chatMessages.length]);

  if (isLoading) {
    return (
      <div className="flex min-h-0 flex-1 items-center justify-center text-sm text-muted-foreground">
        Loading messages...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-3">
        <p className="text-sm text-destructive">
          {error instanceof Error
            ? error.message
            : "Failed to load messages."}
        </p>

        <button
          type="button"
          onClick={() => refetch()}
          className="rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto px-6 py-6">
      <DateDivider date="Today" />

      <div className="flex flex-col gap-5">
        {chatMessages.length > 0 ? (
          chatMessages.map((message) => (
            <div
              key={message.id}
              className="group flex items-start gap-3"
            >
              {message.sender.avatar_url ? (
                <img
                  src={message.sender.avatar_url}
                  alt={message.sender.name}
                  width={36}
                  height={36}
                  className="size-9 shrink-0 rounded-full object-cover"
                />
              ) : (
                <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-medium">
                  {message.sender.name.charAt(0).toUpperCase()}
                </div>
              )}

              <div className="flex max-w-[75%] flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">
                    {message.sender.name}
                  </span>

                  <span className="text-xs text-muted-foreground">
                    {new Date(message.created_at).toLocaleTimeString(
                      "en-US",
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}
                  </span>

                  {message.is_edited && (
                    <span className="text-xs text-muted-foreground">
                      (edited)
                    </span>
                  )}
                </div>

                <div className="rounded-2xl rounded-tl-sm bg-muted px-4 py-3 text-sm leading-6 text-foreground">
                  {message.message}
                </div>

                <button
                  type="button"
                  onClick={() => onReply(message)}
                  className="w-fit text-xs text-muted-foreground transition-colors hover:text-primary"
                >
                  Reply
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="py-8 text-center text-sm text-muted-foreground">
            No messages yet. Start the conversation!
          </p>
        )}

        {/* Scroll target */}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
