
import { format } from "date-fns";
import type { ChatConversation } from "@/features/chats/types/chat.types";

interface DirectMessageItemProps {
  message: ChatConversation;
  onSelect: () => void;
}

export default function DirectMessageItem({
  message,
  onSelect,
}: DirectMessageItemProps) {
  const lastMessage = message.lastMessage;
  const lastMessageText =
    typeof lastMessage === "string" ? lastMessage : lastMessage?.text ?? "";
  const lastMessageTime =
    typeof lastMessage === "string" || !lastMessage?.createdAt
      ? ""
      : format(new Date(lastMessage.createdAt), "h:mm a");

  return (
    <button
      type="button"
      onClick={onSelect}
      className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-muted"
    >
      <div className="relative shrink-0">
        <img
          src={message.avatar}
          alt={message.name}
          className="h-11 w-11 rounded-full object-cover"
        />

        {message.isOnline && (
          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background bg-green-500" />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <h4 className="truncate text-sm font-semibold text-foreground">
            {message.name}
          </h4>

          <span className="shrink-0 text-xs text-muted-foreground">
            {lastMessageTime}
          </span>
        </div>

        <div className="mt-1 flex items-center justify-between gap-2">
          <p className="truncate text-sm text-muted-foreground">
            {lastMessage?.text ?? ""}
          </p>

          {!!message.unreadCount && (
            <span className="flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-primary px-1.5 text-xs text-primary-foreground">
              {message.unreadCount}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}
