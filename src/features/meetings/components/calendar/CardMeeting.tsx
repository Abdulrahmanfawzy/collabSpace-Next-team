import type { Meeting } from "@/features/meetings/types/meeting.types";

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
      className={`w-full rounded-md border border-primary/20 bg-primary/5 p-2 ${className ?? ""}`}
    >
      <h4 className="text-xs font-semibold line-clamp-2">
        {meeting.title}
      </h4>

      <p className="mt-1 text-xs text-muted-foreground">
        {meeting.start_time.slice(0, 5)} -{" "}
        {meeting.end_time.slice(0, 5)}
      </p>
    </div>
  );
}