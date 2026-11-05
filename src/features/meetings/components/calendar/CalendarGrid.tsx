import { month, meetings } from "@/features/meetings/data/data";
import CardMeeting from "@/features/meetings/components/calendar/CardMeeting";
import Link from "next/link";
const days = month[0];

// Extract the day number from a date string, or use an existing numeric day.
const getDayNumber = (date: string | number) =>
  typeof date === "number" ? date : Number(date.split("-")[2]);

const GRID_COLS = "grid grid-cols-[70px_repeat(7,minmax(0,1fr))]";

export default function CalendarGrid() {
  const currentHour = new Date().getHours();
  const remainingHours = Array.from(
    { length: 24 - currentHour },
    (_, i) => currentHour + i,
  );

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[800px]">
        {/* Header */}
        <div className={GRID_COLS}>
          <div className="border-b p-4 text-sm font-semibold">Time</div>

          {days.map((day) => (
            <div
            
              className="flex flex-col items-center justify-center gap-2 border-b border-l py-4"
            >
              <span className="text-sm text-muted-foreground">{day.name}</span>
              <span className="flex size-9 items-center justify-center rounded-full font-semibold">
                {day.date}
              </span>
            </div>
          ))}
        </div>

        {/* Calendar rows */}
        {remainingHours.map((hour) => (
          <div key={hour} className={GRID_COLS}>
            <div className="border-b p-3 text-xs text-muted-foreground">
              {hour}:00
            </div>

            {days.map((day) => {
              const hourMeetings = meetings.filter(
                (m) =>
                  getDayNumber(m.date) === Number(day.date) &&
                  Number(m.startTime.split(":")[0]) === hour,
              );

              return (
                <div
                  
                  className="flex min-h-24 flex-col items-center gap-2 border-b border-l p-2"
                >
                  <div className="flex flex-col items-center text-xs text-muted-foreground">
                    <span>{day.name}</span>
                    <span className="font-semibold text-foreground">
                      {day.date}
                    </span>
                  </div>

                  {hourMeetings.map((m) => (
                    <Link href={`/meetings/${m.id}`}>
                      <CardMeeting key={m.id} meeting={m} className="w-full" />
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
