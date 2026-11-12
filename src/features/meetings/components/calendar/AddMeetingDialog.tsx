
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import type {
  Meeting,
  CreateMeetingValues,
} from "@/features/meetings/types/meeting.types";

import type { UpdateMeetingValues } from "@/features/meetings/services/meeting.service";

type EditMeetingValues = Pick<
  UpdateMeetingValues,
  "title" | "meeting_date" | "start_time" | "end_time" | "meeting_link"
>;

type AddMeetingDialogProps = {
  onSubmit?: (values: CreateMeetingValues) => Promise<void>;
  onUpdate?: (
    id: number,
    values: EditMeetingValues
  ) => Promise<void>;
  meeting?: Meeting;
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

const formatInputTime = (time: string) => time.slice(0, 5);

export default function AddMeetingDialog({
  onSubmit,
  onUpdate,
  meeting,
  isSubmitting = false,
}: AddMeetingDialogProps) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  const isEditMode = Boolean(meeting);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const title = String(formData.get("title") || "").trim();

    const meeting_date = String(
      formData.get("meeting_date") || ""
    );

    const start_time = formatTime(
      String(formData.get("start_time") || "")
    );

    const end_time = formatTime(
      String(formData.get("end_time") || "")
    );

    const meeting_link = String(
      formData.get("meeting_link") || ""
    ).trim();

    if (!title || !meeting_date || !start_time || !end_time) {
      setError("Please fill in all required fields.");
      return;
    }

    if (start_time >= end_time) {
      setError("End time must be after start time.");
      return;
    }

    setError("");

    try {
      if (meeting) {
        if (!onUpdate) {
          setError("Update action is not configured.");
          return;
        }

        await onUpdate(meeting.id, {
          title,
          meeting_date,
          start_time,
          end_time,
          meeting_link: meeting_link || undefined,
        });
      } else {
        if (!onSubmit) {
          setError("Create action is not configured.");
          return;
        }

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
          title,
          description: String(
            formData.get("description") || ""
          ).trim(),
          meeting_date,
          start_time,
          end_time,
          meeting_link,
          project_id: projectId,
          attendee_ids,
        };

        await onSubmit(values);
      }

      setOpen(false);
      setError("");
    } catch (err) {
      console.error("Failed to save meeting:", err);

      setError(
        `Failed to ${isEditMode ? "update" : "create"} meeting. Please try again.`
      );
    }
  };

  return (
    <>
      <Button
        type="button"
        variant={isEditMode ? "outline" : "default"}
        className="rounded-[30px]"
        onClick={() => {
          setError("");
          setOpen(true);
        }}
      >
        {isEditMode ? "Edit Meeting" : "Add Meeting"}
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
            aria-labelledby="meeting-dialog-title"
            className="max-h-[90vh] w-full max-w-[550px] overflow-y-auto rounded-lg bg-background p-6 shadow-lg"
          >
            <header className="mb-6 space-y-2">
              <h2
                id="meeting-dialog-title"
                className="text-xl font-bold"
              >
                {isEditMode
                  ? "Edit Meeting"
                  : "Create New Meeting"}
              </h2>

              <p className="text-sm text-muted-foreground">
                {isEditMode
                  ? "Update your meeting details."
                  : "Schedule a meeting and invite your team members."}
              </p>
            </header>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Meeting Title */}
              <div className="space-y-2">
                <label
                  htmlFor="title"
                  className="text-sm font-medium"
                >
                  Meeting Title *
                </label>

                <Input
                  id="title"
                  name="title"
                  required
                  defaultValue={meeting?.title ?? ""}
                  placeholder="Enter meeting title"
                />
              </div>

              {/* Meeting Date */}
              <div className="space-y-2">
                <label
                  htmlFor="meeting_date"
                  className="text-sm font-medium"
                >
                  Meeting Date *
                </label>

                <Input
                  id="meeting_date"
                  name="meeting_date"
                  type="date"
                  min={!isEditMode ? getLocalDate() : undefined}
                  required
                  defaultValue={meeting?.meeting_date ?? ""}
                />
              </div>

              {/* Start & End Time */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="start_time"
                    className="text-sm font-medium"
                  >
                    Start Time *
                  </label>

                  <Input
                    id="start_time"
                    name="start_time"
                    type="time"
                    required
                    defaultValue={
                      meeting?.start_time
                        ? formatInputTime(meeting.start_time)
                        : ""
                    }
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="end_time"
                    className="text-sm font-medium"
                  >
                    End Time *
                  </label>

                  <Input
                    id="end_time"
                    name="end_time"
                    type="time"
                    required
                    defaultValue={
                      meeting?.end_time
                        ? formatInputTime(meeting.end_time)
                        : ""
                    }
                  />
                </div>
              </div>

              {/* Create Only Fields */}
              {!isEditMode && (
                <>
                  {/* Project ID */}
                  <div className="space-y-2">
                    <label
                      htmlFor="project_id"
                      className="text-sm font-medium"
                    >
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

                  {/* Participants */}
                  <div className="space-y-2">
                    <label
                      htmlFor="attendee_ids"
                      className="text-sm font-medium"
                    >
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

                  {/* Description */}
                  <div className="space-y-2">
                    <label
                      htmlFor="description"
                      className="text-sm font-medium"
                    >
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
                </>
              )}

              {/* Meeting Link */}
              <div className="space-y-2">
                <label
                  htmlFor="meeting_link"
                  className="text-sm font-medium"
                >
                  Meeting Link
                </label>

                <Input
                  id="meeting_link"
                  name="meeting_link"
                  type="url"
                  defaultValue={meeting?.meeting_link ?? ""}
                  placeholder="https://meet.google.com/..."
                />
              </div>

              {/* Error */}
              {error && (
                <p
                  role="alert"
                  className="text-sm text-support-red"
                >
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

                <Button
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? "Saving..."
                    : isEditMode
                      ? "Save Changes"
                      : "Create Meeting"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
