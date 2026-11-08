"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";


type CalendarHeaderProps = {
  view: "week" | "month";
  setView: (view: "week" | "month") => void;
};

export default function CalendarHeader({ view, setView }: CalendarHeaderProps) {
  

  return (
    <div className="container mx-auto my-3 flex items-center justify-between rounded-lg bg-app-neutral-light px-6 py-4">
      <div className="flex items-center gap-3">
        <Button variant="secondary" size="icon-sm" className="rounded-full">
          <ChevronLeft size={20} />
        </Button>

        <h2 className="text-lg font-semibold">
          December 2025
        </h2>

        <Button variant="secondary" size="icon-sm" className="rounded-full">
          <ChevronRight size={20} />
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