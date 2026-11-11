import CalendarGrid from "./CalendarGrid";
import CardMeeting from "./CardMeeting";
import Link from "next/link";
import type { Meeting } from "@/features/meetings/types/meeting.types";

type CalendarMoodProps = {
  view: "week" | "month";
  meetings: Meeting[];
};

const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export default function CalendarMood({
  view,
  meetings,
}: CalendarMoodProps) {
  if (view === "week") {
    return <CalendarGrid meetings={meetings} />;
  }

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days = Array.from(
    { length: firstDay + daysInMonth },
    (_, index) => {
      if (index < firstDay) return null;

      return new Date(year, month, index - firstDay + 1);
    }
  );

  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <div className="grid grid-cols-7">
      {weekdays.map((day) => (
        <div key={day} className="border-b p-3 text-center text-sm font-semibold">
          {day.slice(0, 3)}
        </div>
      ))}

      {days.map((day, index) => {
        if (!day) {
          return <div key={`empty-${index}`} className="min-h-32 border-b border-l" />;
        }

        const dateKey = formatDate(day);

        const dayMeetings = meetings.filter(
          (meeting) => meeting.meeting_date === dateKey
        );

        return (
          <div
            key={dateKey}
            className="flex min-h-32 flex-col gap-2 border-b border-l p-2"
          >
            <span className="text-sm font-semibold">
              {day.getDate()}
            </span>

            {dayMeetings.map((meeting) => (
              <Link
                key={meeting.id}
                href={`/meetings/${meeting.id}`}
                className="w-full"
              >
                <CardMeeting meeting={meeting} />
              </Link>
            ))}
          </div>
        );
      })}
    </div>
  );
}