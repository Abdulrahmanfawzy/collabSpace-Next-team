
"use client";

import { useState } from "react";
import { Paperclip, Send, Smile } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { useSendMessage } from "@/features/chats/hooks/useSendMessage";

interface MessageComposerProps {
  projectId: number;
}

export default function MessageComposer({
  projectId,
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
      });

      setMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="shrink-0 border-t border-border bg-background px-6 py-4">
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
          placeholder="Type your message..."
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
