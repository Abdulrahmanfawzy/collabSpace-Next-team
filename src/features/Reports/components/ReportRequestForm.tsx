"use client";

import { useState, type FormEvent } from "react";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function ReportRequestForm() {
  const [isReady, setIsReady] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsReady(true);
  }

  return (
    <Card className="rounded-xl border-0 bg-white shadow-none">
      <CardHeader className="flex flex-row items-center justify-between px-4 pb-3 pt-4 sm:px-5">
        <CardTitle className="text-base font-medium">Submit a detailed report</CardTitle>
        <Sparkles aria-hidden="true" className="size-4 text-indigo-600" />
      </CardHeader>
      <CardContent className="px-4 pb-4 sm:px-5">
        <form className="space-y-2.5" onSubmit={handleSubmit} onChange={() => setIsReady(false)}>
          <label className="sr-only" htmlFor="report-type">Report type</label>
          <select
            id="report-type"
            name="reportType"
            required
            defaultValue=""
            className="h-9 w-full rounded-lg border border-border bg-white px-3 text-xs text-muted-foreground outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/10"
          >
            <option value="" disabled>Select report type</option>
            <option value="project-summary">Project summary</option>
            <option value="project-activity">Project activity</option>
            <option value="completion-status">Completion status</option>
          </select>

          <label className="sr-only" htmlFor="report-note">Add note</label>
          <Input id="report-note" name="note" placeholder="Add note" className="h-9 text-xs" />

          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            <label className="sr-only" htmlFor="report-start-date">Start date</label>
            <Input id="report-start-date" name="startDate" type="date" required className="h-9 text-xs" />
            <label className="sr-only" htmlFor="report-end-date">End date</label>
            <Input id="report-end-date" name="endDate" type="date" required className="h-9 text-xs" />
          </div>

          <div className="flex items-center justify-end gap-3 pt-0.5">
            <p aria-live="polite" className="mr-auto text-xs text-muted-foreground">
              {isReady ? "Report details are ready." : ""}
            </p>
            <Button type="submit" size="sm" className="h-8 rounded-full bg-indigo-600 px-4 text-xs hover:bg-indigo-700">
              Submit
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
