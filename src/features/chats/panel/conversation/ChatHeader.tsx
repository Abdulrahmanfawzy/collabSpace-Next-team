
import {
  MoreVertical,
  Phone,
  Search,
  Video,
} from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import { Button } from "@/components/ui/button";

interface ChatHeaderProps {
  name?: string;
  role?: string;
  avatarUrl?: string;
}

export default function ChatHeader({
  name = "Mohamed Ahmed",
  role = "Senior UI/UX",
  avatarUrl = "/avatars/mohamed-ahmed.jpg",
}: ChatHeaderProps) {
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <header className="mx-6 mt-5 flex shrink-0 items-center justify-between rounded-2xl bg-background px-4 py-3 shadow-sm">
      {/* User Info */}
      <div className="flex min-w-0 items-center gap-3">
        <Avatar size="lg" className="size-12">
          <AvatarImage src={avatarUrl} alt={name} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>

        <div className="min-w-0">
          <h2 className="truncate text-sm font-medium text-foreground">
            {name}
          </h2>

          <p className="truncate text-xs text-muted-foreground">
            {role}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex shrink-0 items-center gap-2">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Search in conversation"
          className="rounded-full"
        >
          <Search className="size-5" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Voice call"
          className="rounded-full"
        >
          <Phone className="size-5" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Video call"
          className="rounded-full"
        >
          <Video className="size-5" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="More options"
          className="rounded-full"
        >
          <MoreVertical className="size-5" />
        </Button>
      </div>
    </header>
  );
}
