
import type { Meeting } from "@/features/meetings/types/meeting.types";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {Plus} from "lucide-react"

type CardMeetingProps = {
  meeting: Meeting;
  className?: string;
};

export default function CardMeeting({
  meeting,
  className,
}: CardMeetingProps) {
  return (
    <div
      className={`w-full rounded-md border border-primary/20 bg-primary/5 p-2 ${
        className ?? ""
      }`}
    >
      {/* Meeting Title */}
      <h4 className="line-clamp-2 text-xs font-semibold">
        {meeting.title}
      </h4>

      {/* Meeting Time */}
      <p className="mt-1 text-xs text-muted-foreground">
        {meeting.start_time.slice(0, 5)} -{" "}
        {meeting.end_time.slice(0, 5)}
      </p>

      {/* Meeting Status */}
      <p className="mt-1 text-[10px] text-muted-foreground">
        {meeting.status}
      </p>

      {/* Participants */}
      <div className="mt-2 flex items-center gap-1">
        {meeting.participants.slice(0, 3).map((participant) => (
          <div
            key={participant.id}
            className="flex items-center"
            title={participant.name}
          >
            <img
              src={participant.avatar_url || "/default-avatar.png"}
              alt={participant.name}
              className="h-6 w-6 rounded-full border-2 border-background object-cover"
            />
          </div>
        ))}

        {meeting.participants_count > 3 && (
          <span className="text-[10px] text-muted-foreground">
            +{meeting.participants_count - 3}
          </span>
        )}

        {/* View Meeting */}
        <Button
          asChild
          size="sm"
          variant="outline"
          className="ml-auto h-7 px-2 text-xs"
        >
          <Link href={`/meetings/${meeting.id}`}>
            join <Plus className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
