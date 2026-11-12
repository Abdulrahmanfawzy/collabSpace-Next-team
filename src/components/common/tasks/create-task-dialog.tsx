"use client";

import { useState, type FormEvent } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CommonSelect } from "@/components/common/common-select";
import { useCreateTask } from "@/hooks/tasks/use-create-task";
import type {
  ApiTaskStatus,
  CreateTaskPayload,
  TaskAssigneeOption,
  TaskStatus,
} from "@/types/tasks.types";

interface CreateTaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectId?: number;
  defaultStatus?: TaskStatus;
  assignees?: TaskAssigneeOption[];
}

const priorityOptions = [
  { label: "Low", value: "Low" },
  { label: "Medium", value: "Medium" },
  { label: "High", value: "High" },
  { label: "Critical", value: "Critical" },
] satisfies { label: string; value: CreateTaskPayload["priority"] }[];

const statusOptions = [
  { label: "Pending", value: "Pending" },
  { label: "In Progress", value: "In Progress" },
  { label: "In Review", value: "In Review" },
  { label: "Completed", value: "Completed" },
] satisfies { label: string; value: ApiTaskStatus }[];

const apiStatusByTaskStatus: Record<TaskStatus, ApiTaskStatus> = {
  todo: "Pending",
  "in-progress": "In Progress",
  "in-review": "In Review",
  completed: "Completed",
};

const fieldClassName =
  "h-10 rounded-lg border-gray-200 bg-white shadow-none focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/10";

export function CreateTaskDialog({
  open,
  onOpenChange,
  projectId,
  defaultStatus = "todo",
  assignees,
}: CreateTaskDialogProps) {
  const { mutate, isPending } = useCreateTask();
  const [projectIdValue, setProjectIdValue] = useState(
    projectId ? String(projectId) : ""
  );
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] =
    useState<CreateTaskPayload["priority"]>("Medium");
  const [status, setStatus] = useState<ApiTaskStatus>(
    apiStatusByTaskStatus[defaultStatus]
  );
  const [assignedTo, setAssignedTo] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [formError, setFormError] = useState("");
  const assigneeOptions = [
    { label: "Unassigned", value: "unassigned" },
    ...(assignees ?? []).map((assignee) => ({
      label: assignee.name,
      value: String(assignee.id),
    })),
  ];

  const resetForm = () => {
    setProjectIdValue(projectId ? String(projectId) : "");
    setName("");
    setDescription("");
    setPriority("Medium");
    setStatus(apiStatusByTaskStatus[defaultStatus]);
    setAssignedTo("");
    setDueDate("");
    setFormError("");
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (isPending) return;
    if (nextOpen) {
      setProjectIdValue(projectId ? String(projectId) : "");
      setStatus(apiStatusByTaskStatus[defaultStatus]);
      setFormError("");
    } else {
      resetForm();
    }
    onOpenChange(nextOpen);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsedProjectId = Number(projectId ?? projectIdValue);
    const parsedAssignee = assignedTo ? Number(assignedTo) : undefined;

    if (!name.trim()) {
      setFormError("Task name is required.");
      return;
    }
    if (!Number.isInteger(parsedProjectId) || parsedProjectId <= 0) {
      setFormError("Enter a valid project ID.");
      return;
    }
    if (
      parsedAssignee !== undefined &&
      (!Number.isInteger(parsedAssignee) || parsedAssignee <= 0)
    ) {
      setFormError("Assignee ID must be a positive whole number.");
      return;
    }

    const payload: CreateTaskPayload = {
      project_id: parsedProjectId,
      name: name.trim(),
      priority,
      status,
      ...(description.trim() ? { description: description.trim() } : {}),
      ...(parsedAssignee !== undefined ? { assigned_to: parsedAssignee } : {}),
      ...(dueDate ? { due_date: dueDate } : {}),
    };

    mutate(payload, {
      onSuccess: () => handleOpenChange(false),
    });
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create Task</DialogTitle>
          <DialogDescription>
            Add a task to a project. Fields marked required must be filled in.
          </DialogDescription>
        </DialogHeader>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {projectId ? (
            <p className="text-sm text-gray-600">Project ID: {projectId}</p>
          ) : (
            <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
              <span>Project ID <span className="text-destructive">*</span></span>
              <Input
                type="number"
                min={1}
                step={1}
                required
                value={projectIdValue}
                onChange={(event) => setProjectIdValue(event.target.value)}
                className={fieldClassName}
              />
            </label>
          )}

          <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
              <span> Task name <span className="text-destructive">*</span></span>
            <Input
              required
              maxLength={255}
              value={name}
              onChange={(event) => setName(event.target.value)}
              className={fieldClassName}
            />
          </label>

          <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
            Description
            <Textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              className="min-h-24 rounded-lg border-gray-200 shadow-none"
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
              <span>Priority <span className="text-destructive">*</span></span>
              <CommonSelect
                options={priorityOptions}
                value={priority}
                onValueChange={(value) => {
                  if (isPriority(value)) setPriority(value);
                }}
                triggerClassName="h-10! w-full rounded-lg"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
              Status
              <CommonSelect
                options={statusOptions}
                value={status}
                onValueChange={(value) => {
                  if (isApiTaskStatus(value)) setStatus(value);
                }}
                triggerClassName="h-10! w-full rounded-lg"
              />
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
              {assignees ? (
                <>
                  Assign to project member
                  <CommonSelect
                    options={assigneeOptions}
                    value={assignedTo || "unassigned"}
                    onValueChange={(value) =>
                      setAssignedTo(value === "unassigned" ? "" : value)
                    }
                    disabled={assignees.length === 0}
                    placeholder="Choose a team member"
                    triggerClassName="h-10! w-full rounded-lg"
                  />
                  {assignees.length === 0 && (
                    <span className="text-xs font-normal text-gray-500">
                      No members are assigned to this project yet.
                    </span>
                  )}
                </>
              ) : (
                <>
                  Assignee ID
                  <Input
                    type="number"
                    min={1}
                    step={1}
                    value={assignedTo}
                    onChange={(event) => setAssignedTo(event.target.value)}
                    className={fieldClassName}
                  />
                </>
              )}
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
              Due date
              <Input
                type="date"
                value={dueDate}
                onChange={(event) => setDueDate(event.target.value)}
                className={fieldClassName}
              />
            </label>
          </div>

          {formError && (
            <p role="alert" className="text-sm text-destructive">
              {formError}
            </p>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              disabled={isPending}
              onClick={() => handleOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Creating..." : "Create Task"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function isPriority(
  value: string
): value is CreateTaskPayload["priority"] {
  return (
    value === "Low" ||
    value === "Medium" ||
    value === "High" ||
    value === "Critical"
  );
}

function isApiTaskStatus(value: string): value is ApiTaskStatus {
  return (
    value === "Pending" ||
    value === "In Progress" ||
    value === "In Review" ||
    value === "Completed"
  );
}
