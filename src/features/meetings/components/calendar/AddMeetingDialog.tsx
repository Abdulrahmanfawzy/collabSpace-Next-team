
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export interface CreateMeetingValues {
  title: string;
  description: string;
  meeting_date: string;
  start_time: string;
  end_time: string;
  meeting_link: string;
  project_id: number;
  attendee_ids: number[];
}

type AddMeetingDialogProps = {
  onSubmit: (values: CreateMeetingValues) => Promise<void>;
  isSubmitting?: boolean;
};

const getLocalDate = () => {
  const date = new Date();

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const formatTime = (time: string) => {
  return time.length === 5 ? `${time}:00` : time;
};

export default function AddMeetingDialog({
  onSubmit,
  isSubmitting = false,
}: AddMeetingDialogProps) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const attendeesInput = String(
      formData.get("attendee_ids") || ""
    );

    const attendeeValues = attendeesInput
      .split(",")
      .map((id) => id.trim())
      .filter(Boolean);

    const attendee_ids = attendeeValues.map(Number);

    if (
      attendee_ids.some(
        (id) => !Number.isInteger(id) || id <= 0
      )
    ) {
      setError("Please enter valid participant IDs.");
      return;
    }

    const projectId = Number(formData.get("project_id"));

    if (!Number.isInteger(projectId) || projectId <= 0) {
      setError("Please enter a valid project ID.");
      return;
    }

    const values: CreateMeetingValues = {
      title: String(formData.get("title")).trim(),
      description: String(formData.get("description")).trim(),
      meeting_date: String(formData.get("meeting_date")),
      start_time: formatTime(
        String(formData.get("start_time"))
      ),
      end_time: formatTime(
        String(formData.get("end_time"))
      ),
      meeting_link: String(
        formData.get("meeting_link") || ""
      ).trim(),
      project_id: projectId,
      attendee_ids,
    };

    if (
      !values.title ||
      !values.meeting_date ||
      !values.start_time ||
      !values.end_time
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    if (values.start_time >= values.end_time) {
      setError("End time must be after start time.");
      return;
    }

    setError("");

    try {
      await onSubmit(values);

      setOpen(false);
      form.reset();
    } catch (err) {
      console.error("Failed to create meeting:", err);
      setError("Failed to create meeting. Please try again.");
    }
  };

  return (
    <>
      <Button
        type="button"
        variant="default"
        className="rounded-[30px]"
        onClick={() => {
          setError("");
          setOpen(true);
        }}
      >
        Add Meeting
      </Button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onMouseDown={(event) => {
            if (
              event.target === event.currentTarget &&
              !isSubmitting
            ) {
              setOpen(false);
              setError("");
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-meeting-title"
            className="max-h-[90vh] w-full max-w-[550px] overflow-y-auto rounded-lg bg-background p-6 shadow-lg"
          >
            <header className="mb-6 space-y-2">
              <h2
                id="add-meeting-title"
                className="text-xl font-bold"
              >
                Create New Meeting
              </h2>

              <p className="text-sm text-muted-foreground">
                Schedule a meeting and invite your team members.
              </p>
            </header>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Title */}
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">
                  Meeting Title *
                </label>
                <Input
                  id="title"
                  name="title"
                  required
                  placeholder="Enter meeting title"
                />
              </div>

              {/* Date */}
              <div className="space-y-2">
                <label htmlFor="meeting_date" className="text-sm font-medium">
                  Meeting Date *
                </label>
                <Input
                  id="meeting_date"
                  name="meeting_date"
                  type="date"
                  min={getLocalDate()}
                  required
                />
              </div>

              {/* Start & End Time */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="start_time" className="text-sm font-medium">
                    Start Time *
                  </label>
                  <Input
                    id="start_time"
                    name="start_time"
                    type="time"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="end_time" className="text-sm font-medium">
                    End Time *
                  </label>
                  <Input
                    id="end_time"
                    name="end_time"
                    type="time"
                    required
                  />
                </div>
              </div>

              {/* Project ID */}
              <div className="space-y-2">
                <label htmlFor="project_id" className="text-sm font-medium">
                  Project ID *
                </label>
                <Input
                  id="project_id"
                  name="project_id"
                  type="number"
                  min="1"
                  defaultValue={13}
                  required
                  placeholder="Enter project ID"
                />
              </div>

              {/* Attendees */}
              <div className="space-y-2">
                <label htmlFor="attendee_ids" className="text-sm font-medium">
                  Participant IDs
                </label>
                <Input
                  id="attendee_ids"
                  name="attendee_ids"
                  placeholder="2, 3, 4"
                />
                <p className="text-xs text-muted-foreground">
                  Separate participant IDs with commas.
                </p>
              </div>

              {/* Meeting Link */}
              <div className="space-y-2">
                <label htmlFor="meeting_link" className="text-sm font-medium">
                  Meeting Link
                </label>
                <Input
                  id="meeting_link"
                  name="meeting_link"
                  type="url"
                  placeholder="https://meet.google.com/..."
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  placeholder="Meeting description..."
                  className="w-full resize-none rounded-md border border-border bg-bg-light px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/10"
                />
              </div>

              {/* Error */}
              {error && (
                <p role="alert" className="text-sm text-support-red">
                  {error}
                </p>
              )}

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  disabled={isSubmitting}
                  onClick={() => {
                    setOpen(false);
                    setError("");
                  }}
                >
                  Cancel
                </Button>

                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Creating..." : "Create Meeting"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
