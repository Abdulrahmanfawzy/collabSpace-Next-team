
interface DirectMessage {
  avatar: string;
  name: string;
  isOnline: boolean;
  time: string;
  message: string;
  unreadCount?: number;
}

interface DirectMessageItemProps {
  message: DirectMessage;
}

export default function DirectMessageItem({
  message,
}: DirectMessageItemProps) {
  return (
    <button
      type="button"
      className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-muted"
    >
      {/* Avatar */}
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

      {/* Message Info */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <h4 className="truncate text-sm font-semibold text-foreground">
            {message.name}
          </h4>

          <span className="shrink-0 text-xs text-muted-foreground">
            {message.time}
          </span>
        </div>

        <div className="mt-1 flex items-center justify-between gap-2">
          <p className="truncate text-sm text-muted-foreground">
            {message.message}
          </p>

          {message.unreadCount ? (
            <span className="flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-primary px-1.5 text-xs font-medium text-primary-foreground">
              {message.unreadCount}
            </span>
          ) : null}
        </div>
      </div>
    </button>
  );
}
