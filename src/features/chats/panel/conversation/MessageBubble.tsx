
import Image from "next/image";

import type { Message } from "@/features/chats/data/messages";
import TagChip from "@/features/chats/panel/conversation/TagChip";

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({
  message,
}: MessageBubbleProps) {
  const { sender, content, timestamp, isOwn, tags } = message;

  return (
    <div
      className={`flex items-start gap-3 ${
        isOwn ? "flex-row-reverse" : "flex-row"
      }`}
    >
      {/* Avatar */}
      {!isOwn && (
        <Image
          src={sender.avatarUrl}
          alt={sender.name}
          width={36}
          height={36}
          className="size-9 shrink-0 rounded-full object-cover"
        />
      )}

      {/* Message Content */}
      <div
        className={`flex max-w-[75%] flex-col gap-2 ${
          isOwn ? "items-end" : "items-start"
        }`}
      >
        {/* Sender Info */}
        <div className="flex items-center gap-2">
          {!isOwn && (
            <span className="text-sm font-medium text-foreground">
              {sender.name}
            </span>
          )}

          <span className="text-xs text-muted-foreground">
            {timestamp}
          </span>
        </div>

        {/* Bubble */}
        <div
          className={`rounded-2xl px-4 py-3 text-sm leading-6 ${
            isOwn
              ? "rounded-tr-sm bg-primary text-primary-foreground"
              : "rounded-tl-sm bg-muted text-foreground"
          }`}
        >
          {content}
        </div>

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <TagChip key={tag} label={tag} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
