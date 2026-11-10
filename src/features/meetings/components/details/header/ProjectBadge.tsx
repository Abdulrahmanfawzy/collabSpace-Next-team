
import { CalendarDays, Clipboard, Clock } from "lucide-react";
import Image from "next/image";

export interface MeetingParticipant {
  id: number;
  name: string;
  email: string;
  avatar_url: string | null;
  job_title: string;
  attended: boolean;
}

type Props = {
  name: string;
  startTime: string;
  endTime: string;
  year?: number;
  participants: MeetingParticipant[];
};

export default function ProjectBadge({
  name,
  startTime,
  endTime,
  year,
  participants = [],
}: Props) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      {/* Project */}
      <div className="flex items-center gap-2">
        <Clipboard className="h-4 w-4 text-primary" />

        <h3 className="inline-flex w-fit items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
          {name}
        </h3>
      </div>

      {/* Year */}
      <div className="flex items-center gap-2">
        <CalendarDays className="h-4 w-4 text-muted-foreground" />

        <span className="text-sm text-muted-foreground">
          {year}
        </span>
      </div>

      {/* Participants */}
      <div className="flex items-center">
        {participants.slice(0, 5).map((participant) => (
          <div
            key={participant.id}
            className="-ml-2 first:ml-0"
            title={participant.name}
          >
            <Image
              src={participant.avatar_url || "/default-avatar.png"}
              alt={participant.name}
              width={32}
              height={32}
              className="h-8 w-8 rounded-full border-2 border-background object-cover"
            />
          </div>
        ))}

        {participants.length > 5 && (
          <span className="ml-2 text-xs text-muted-foreground">
            +{participants.length - 5}
          </span>
        )}
      </div>

      {/* Meeting Time */}
      <div className="flex items-center gap-2">
        <Clock className="h-4 w-4 text-muted-foreground" />

        <span className="text-sm text-muted-foreground">
          {startTime.slice(0, 5)} - {endTime.slice(0, 5)}
        </span>
      </div>
    </div>
  );
}
