"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import CalendarHeader from "@/features/meetings/components/calendar/CalendarHeader";
import CalendarMood from "@/features/meetings/components/calendar/calenderMood";
import { meetingService } from "@/features/meetings/services/meeting.service";

type CalendarView = "week" | "month";

export default function MeetingsCalendar() {
  const [view, setView] = useState<CalendarView>("month");
  const [currentDate, setCurrentDate] = useState(() => new Date());
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedView = localStorage.getItem("calendar-view");

    if (savedView === "week" || savedView === "month") {
      setView(savedView);
    }

    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("calendar-view", view);
    }
  }, [view, isLoaded]);

  const navigate = (direction: -1 | 1) => {
    setCurrentDate((previous) => {
      const next = new Date(previous);

      if (view === "month") {
        next.setDate(1);
        next.setMonth(next.getMonth() + direction);
      } else {
        next.setDate(next.getDate() + direction * 7);
      }

      return next;
    });
  };

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["meetings", "calendar", "all"],
    queryFn: () =>
      meetingService.getMeetings({
        project_id: undefined, // يلغي default مشروع 1
        time_filter: "all", // الماضي والقادم
        per_page: 100,
      }),
    staleTime: 60 * 1000,
  });

  if (!isLoaded) return null;

  const meetings = data?.data.data ?? [];

  return (
    <div>
      <CalendarHeader
        view={view}
        setView={setView}
        currentDate={currentDate}
        onNavigate={navigate}
        onToday={() => setCurrentDate(new Date())}
      />

      {isLoading && (
        <div className="flex min-h-48 items-center justify-center">
          Loading meetings...
        </div>
      )}

      {isError && (
        <div className="flex min-h-48 flex-col items-center justify-center gap-3">
          <p className="text-sm text-destructive">
            {error instanceof Error
              ? error.message
              : "Failed to load meetings."}
          </p>

          <button
            onClick={() => refetch()}
            className="rounded-md border px-4 py-2 text-sm"
          >
            Try again
          </button>
        </div>
      )}

      {!isLoading && !isError && (
        <CalendarMood
          view={view}
          meetings={meetings}
          currentDate={currentDate}
        />
      )}
    </div>
  );
}