import CalendarGrid from "./CalendarGrid";
import { month, meetings } from "@/features/meetings/data/data";
import CardMeeting from "./CardMeeting";
import Link from "next/link";

type CalendarMoodProps = {
  view: "week" | "month";
};

export default function CalendarMood({ view }: CalendarMoodProps) {
  if (view === "week") {
    return <CalendarGrid />;
  }

  const days = month.flat();

  return (
    <div className="grid grid-cols-7">
      {days.map((day, index) => {
        const dayMeetings = meetings.filter(
          (m) => m.day === day.name && m.date === day.date
        );

        return (
          <div
            key={index}
            className="flex flex-col items-center gap-2 py-4"
          >
            <span>{day.name}</span>
            <span>{day.date}</span>

            {dayMeetings.map((m) => (
              <Link
                key={m.id}
                href={`/meetings/${m.id}`}
                className="w-full"
              >
                <CardMeeting meeting={m} className="w-full" />
              </Link>
            ))}
          </div>
        );
      })}
    </div>
  );
}