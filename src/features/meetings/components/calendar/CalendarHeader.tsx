
"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type CalendarHeaderProps = {
  view: "week" | "month";
  setView: (view: "week" | "month") => void;
  currentDate: Date;
  onNavigate: (direction: -1 | 1) => void;
  onToday: () => void;
};

export default function CalendarHeader({
  view,
  setView,
  currentDate,
  onNavigate,
  onToday,
}: CalendarHeaderProps) {
  const getTitle = () => {
    if (view === "month") {
      return currentDate.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      });
    }

    const start = new Date(currentDate);
    start.setDate(currentDate.getDate() - currentDate.getDay());

    const end = new Date(start);
    end.setDate(start.getDate() + 6);

    const sameMonth = start.getMonth() === end.getMonth();

    if (sameMonth) {
      return `${start.toLocaleDateString("en-US", {
        month: "long",
      })} ${start.getDate()} - ${end.getDate()}, ${end.getFullYear()}`;
    }

    return `${start.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })} - ${end.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })}`;
  };

  return (
    <div className="container mx-auto my-3 flex items-center justify-between rounded-lg bg-app-neutral-light px-6 py-4">
      <div className="flex items-center gap-3">
        <Button
          variant="secondary"
          size="icon-sm"
          className="rounded-full"
          onClick={() => onNavigate(-1)}
          aria-label="Previous"
        >
          <ChevronLeft size={20} />
        </Button>

        <h2 className="text-lg font-semibold">{getTitle()}</h2>

        <Button
          variant="secondary"
          size="icon-sm"
          className="rounded-full"
          onClick={() => onNavigate(1)}
          aria-label="Next"
        >
          <ChevronRight size={20} />
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={onToday}
        >
          Today
        </Button>
      </div>

      <div className="rounded-[30px] border border-border bg-background px-4 py-2">
        <select
          value={view}
          onChange={(event) =>
            setView(event.target.value as "week" | "month")
          }
          className="cursor-pointer bg-transparent text-sm outline-none"
        >
          <option value="week">This week</option>
          <option value="month">This month</option>
        </select>
      </div>
    </div>
  );
}
