"use client";

import { useEffect, useState } from "react";
import CalendarHeader from "@/features/meetings/components/calendar/CalendarHeader";
import CalenderMood from "@/features/meetings/components/calendar/calenderMood";

type CalendarView = "week" | "month";

export default function MeetingsCalendar() {
  const [view, setView] = useState<CalendarView>("month");
  const [isLoaded, setIsLoaded] = useState(false);

  // 1. Get saved view from localStorage
  useEffect(() => {
    const savedView = localStorage.getItem("calendar-view");

    if (savedView === "week" || savedView === "month") {
      setView(savedView);
    }

    setIsLoaded(true);
  }, []);

  // 2. Save view whenever it changes
  useEffect(() => {
    if (!isLoaded) return;

    localStorage.setItem("calendar-view", view);
  }, [view, isLoaded]);

  if (!isLoaded) return null;

  return (
    <div>
      <CalendarHeader view={view} setView={setView} />
      <CalenderMood view={view} />
    </div>
  );
}