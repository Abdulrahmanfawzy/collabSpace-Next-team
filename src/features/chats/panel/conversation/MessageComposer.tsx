
"use client";

import { useState } from "react";
import { Paperclip, Send, Smile, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { useSendMessage } from "@/features/chats/hooks/useSendMessage";
import type { ChatMessage } from "@/features/chats/types/chat.types";

interface MessageComposerProps {
  projectId: number;
  replyTo: ChatMessage | null;
  onCancelReply: () => void;
}

export default function MessageComposer({
  projectId,
  replyTo,
  onCancelReply,
}: MessageComposerProps) {
  const [message, setMessage] = useState("");

  const {
    mutateAsync: sendMessage,
    isPending,
  } = useSendMessage(projectId);

  const handleSend = async () => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage || isPending) return;

    try {
      await sendMessage({
        message: trimmedMessage,
        parent_id: replyTo?.id ?? null,
        file_attachment_id: null,
        mentions: [],
      });

      setMessage("");
      onCancelReply();
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="shrink-0 border-t border-border bg-background px-6 py-4">
      {replyTo && (
        <div className="mb-3 flex items-start justify-between rounded-lg border border-border bg-muted/50 p-3">
          <div className="min-w-0">
            <p className="text-xs font-medium text-primary">
              Replying to {replyTo.sender.name}
            </p>

            <p className="mt-1 truncate text-sm text-muted-foreground">
              {replyTo.message}
            </p>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Cancel reply"
            className="size-7 shrink-0 rounded-full"
            onClick={onCancelReply}
            disabled={isPending}
          >
            <X className="size-4" />
          </Button>
        </div>
      )}

      <div className="flex items-end gap-3 rounded-2xl border border-border bg-background p-3">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Attach file"
          className="shrink-0 rounded-full"
          disabled
        >
          <Paperclip className="size-5" />
        </Button>

        <Textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder={
            replyTo ? "Write your reply..." : "Type your message..."
          }
          rows={1}
          disabled={isPending}
          className="max-h-32 min-h-10 resize-none border-0 bg-transparent shadow-none focus-visible:ring-0"
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              void handleSend();
            }
          }}
        />

        <div className="flex shrink-0 items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Add emoji"
            className="rounded-full"
            disabled
          >
            <Smile className="size-5" />
          </Button>

          <Button
            type="button"
            size="icon"
            aria-label="Send message"
            disabled={!message.trim() || isPending}
            onClick={() => void handleSend()}
            className="rounded-full"
          >
            <Send className="size-5" />
          </Button>
        </div>
      </div>

      <p className="mt-2 text-center text-xs text-muted-foreground">
        {isPending
          ? "Sending message..."
          : "Press Enter to send, Shift + Enter for a new line"}
      </p>
    </div>
  );
}
