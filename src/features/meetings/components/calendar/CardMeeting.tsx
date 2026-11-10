import type { Meeting } from "@/features/meetings/data/data";

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
      className={`w-full rounded-md border p-2 ${meeting.color} ${className ?? ""}`}
    >
      <h4 className="text-xs font-semibold">
        {meeting.title}
      </h4>

      <p className="mt-1 text-xs">
        {meeting.startTime} - {meeting.endTime}
      </p>
    </div>
  );
}