import type { ChatProject } from "@/features/chats/types/chat.types";
import { Button } from "@/components/ui/button";

type Channel = ChatProject["channels"][number];

interface ChannelItemProps {
  channel: Channel;
  isActive?: boolean;
  onClick?: () => void;
  onSelect?: () => void;
}

export default function ChannelItem({
  channel,
  isActive = false,
  onClick,
  onSelect,
}: ChannelItemProps) {
  return (
    <Button
      type="button"
      onClick={() => {
        onClick?.();
        onSelect?.();
      }}
      className={`flex w-full items-center justify-between gap-2 rounded-md px-4 py-2 pl-5 text-left transition-colors hover:bg-muted ${
        isActive ? "bg-muted text-foreground" : "text-muted-foreground"
      }`}
    >
      <div className="flex min-w-0 items-center gap-2">
        <span className="text-sm">#</span>

        <span className="truncate text-sm">
          {channel.name}
        </span>
      </div>

      {channel.unreadCount > 0 && (
        <span className="flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-primary px-1.5 text-xs text-primary-foreground">
          {channel.unreadCount}
        </span>
      )}
    </Button>
  );
}