
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CalendarHeader() {
  return (
    <div className="container mx-auto my-3 flex items-center justify-between rounded-lg bg-app-neutral-light px-6 py-4">
      {/* Date Navigation */}
      <div className="flex items-center gap-3">
        <Button
          variant="secondary"
          size="icon-sm"
          className="rounded-full"
          aria-label="Previous month"
        >
          <ChevronLeft size={20} />
        </Button>

        <h2 className="text-lg font-semibold">
          December 2025
        </h2>

        <Button
          variant="secondary"
          size="icon-sm"
          className="rounded-full"
          aria-label="Next month"
        >
          <ChevronRight size={20} />
        </Button>
      </div>

      {/* Calendar View Selector */}
      <div className="rounded-[30px] border border-border bg-background px-4 py-2">
        <select
          name="calendar-view"
          id="calendar-view"
          defaultValue="week"
          className="cursor-pointer bg-transparent text-sm outline-none"
        >
          <option value="week">This week</option>
          <option value="month">This month</option>
          <option value="year">This year</option>
        </select>
      </div>
    </div>
  );
}
