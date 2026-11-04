
"use client";

import { useState } from "react";
import CalendarHeader from "@/features/meetings/components/calendar/CalendarHeader";
import CalenderMood from "@/features/meetings/components/calendar/calenderMood";
export default function MeetingsCalendar() {
  const [view, setView] = useState<"week" | "month">("month");

  return (
    <div>
      <CalendarHeader view={view} setView={setView} />
      <CalenderMood view={view} />
    </div>
  );
}
