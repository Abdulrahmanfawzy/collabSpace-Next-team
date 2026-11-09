import CardMeeting from "@/features/meetings/components/calendar/CardMeeting";
import type { Meeting } from "@/features/meetings/types/meeting.types";
import Link from "next/link";

type CalendarGridProps = {
  meetings: Meeting[];
};

const GRID_COLS = "grid grid-cols-[70px_repeat(7,minmax(0,1fr))]";

const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export default function CalendarGrid({
  meetings,
}: CalendarGridProps) {
  const today = new Date();

  // Start week from Sunday
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - today.getDay());

  const days = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(weekStart);
    date.setDate(weekStart.getDate() + index);
    return date;
  });

  const hours = Array.from({ length: 24 }, (_, index) => index);

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[800px]">
        {/* Header */}
        <div className={GRID_COLS}>
          <div className="border-b p-4 text-sm font-semibold">
            Time
          </div>

          {days.map((day) => (
            <div
              key={formatDate(day)}
              className="flex flex-col items-center justify-center gap-2 border-b border-l py-4"
            >
              <span className="text-sm text-muted-foreground">
                {day.toLocaleDateString("en-US", {
                  weekday: "short",
                })}
              </span>

              <span
                className={`flex size-9 items-center justify-center rounded-full font-semibold ${
                  formatDate(day) === formatDate(today)
                    ? "bg-primary text-primary-foreground"
                    : ""
                }`}
              >
                {day.getDate()}
              </span>
            </div>
          ))}
        </div>

        {/* Calendar rows */}
        {hours.map((hour) => (
          <div key={hour} className={GRID_COLS}>
            <div className="border-b p-3 text-xs text-muted-foreground">
              {String(hour).padStart(2, "0")}:00
            </div>

            {days.map((day) => {
              const dateKey = formatDate(day);

              const hourMeetings = meetings.filter(
                (meeting) =>
                  meeting.meeting_date === dateKey &&
                  Number(meeting.start_time.split(":")[0]) === hour
              );

              return (
                <div
                  key={`${dateKey}-${hour}`}
                  className="flex min-h-24 flex-col gap-2 border-b border-l p-2"
                >
                  {hourMeetings.map((meeting) => (
                    <Link
                      key={meeting.id}
                      href={`/meetings/${meeting.id}`}
                      className="w-full"
                    >
                      <CardMeeting
                        meeting={meeting}
                        className="w-full"
                      />
                    </Link>
                  ))}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}