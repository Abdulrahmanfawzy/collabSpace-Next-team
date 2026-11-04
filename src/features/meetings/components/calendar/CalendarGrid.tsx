
import { Fragment } from "react";
import { month } from "@/features/meetings/data/data";

const days = month[0];

const startHour = new Date().getHours();
const endHour = 18;

const hours = Array.from(
  { length: Math.max(0, endHour - startHour + 1) },
  (_, index) => startHour + index
);

export default function CalendarGrid() {
  const todayIndex = new Date().getDay();

  return (
    <div className="overflow-x-auto">
      <div className="grid min-w-[800px] grid-cols-[70px_repeat(7,minmax(0,1fr))]">

        {/* Header */}
        <div className="h-12 border-b border-border" />

        {/* Days */}
        
        {days.map((day, index) => (
          <div
            key={index}
            className={`flex h-12 flex-col items-center justify-center border-b border-border ${
              index === todayIndex ? "bg-blue-50" : ""
            }`}
          >
            <div className="flex flex-col items-center gap-2 accordion py-4 m-4">
            <span>{day.name}</span>
            <span>{day.date}</span>
                </div>
          </div>
        ))}

        {/* Hours */}
        {hours.map((hour) => (
          <Fragment key={hour}>
            <div className="h-24 border-b border-border pt-3 text-center text-sm">
              {hour}:00
            </div>

            {days.map((day, index) => (
              <div
                key={`${hour}-${index}`}
                className={`h-24 border-b border-border border-l border-border ${
                  index === todayIndex ? "bg-blue-50" : ""
                }`}
              >
                <div className="flex flex-col items-center gap-2 accordion py-4 m-4">
                  <span>{day.name}</span>
                  <span>{day.date}</span>
                </div>
                {/* Meeting will be here */}
              </div>
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
