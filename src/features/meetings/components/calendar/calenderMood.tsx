import CalendarGrid from "./CalendarGrid";
import { month } from "@/features/meetings/data/data";

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
      {days.map((day, index) => (
        <div
          key={index}
          className="flex flex-col items-center gap-2 py-4"
        >
          <span>{day.name}</span>
          <span>{day.date}</span>
        </div>
      ))}
    </div>
  );
}