"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
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
import {
  createTaskSchema,
  type CreateTaskFormValues,
} from "@/schemas/tasks/create-task.schema";
import type { CreateTaskPayload, TaskStatus } from "@/types/tasks.types";

interface CreateTaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectId?: number;
  defaultStatus?: TaskStatus;
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
] satisfies { label: string; value: CreateTaskFormValues["status"] }[];

const statusByTaskStatus: Record<TaskStatus, CreateTaskFormValues["status"]> = {
  todo: "Pending",
  "in-progress": "In Progress",
  "in-review": "In Review",
  completed: "Completed",
};

const fieldClassName =
  "h-10 rounded-lg border-gray-200 bg-white shadow-none focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/10";

const emptyValues: CreateTaskFormValues = {
  projectId: "",
  name: "",
  description: "",
  priority: "Medium",
  status: "Pending",
  assignedTo: "",
  dueDate: "",
};

export function CreateTaskDialog({
  open,
  onOpenChange,
  projectId,
  defaultStatus = "todo",
}: CreateTaskDialogProps) {
  const { mutate, isPending } = useCreateTask();
  const form = useForm<CreateTaskFormValues>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: emptyValues,
  });
  const { errors } = form.formState;

  const handleOpenChange = (nextOpen: boolean) => {
    if (isPending) return;
    if (nextOpen) {
      form.reset({
        ...emptyValues,
        projectId: projectId ? String(projectId) : "",
        status: statusByTaskStatus[defaultStatus],
      });
    } else {
      form.reset(emptyValues);
    }
    onOpenChange(nextOpen);
  };

  const handleSubmit = form.handleSubmit((values) => {
    const payload: CreateTaskPayload = {
      project_id: projectId ?? Number(values.projectId),
      name: values.name,
      priority: values.priority,
      status: values.status,
      ...(values.description ? { description: values.description } : {}),
      ...(values.assignedTo
        ? { assigned_to: Number(values.assignedTo) }
        : {}),
      ...(values.dueDate ? { due_date: values.dueDate } : {}),
    };

    mutate(payload, {
      onSuccess: () => handleOpenChange(false),
    });
  });

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
                {...form.register("projectId")}
                className={fieldClassName}
              />
              {errors.projectId && (
                <span role="alert" className="text-xs text-destructive">
                  {errors.projectId.message}
                </span>
              )}
            </label>
          )}

          <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
            <span>Task name <span className="text-destructive">*</span></span>
            <Input
              maxLength={255}
              {...form.register("name")}
              className={fieldClassName}
            />
            {errors.name && (
              <span role="alert" className="text-xs text-destructive">
                {errors.name.message}
              </span>
            )}
          </label>

          <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
            Description
            <Textarea
              {...form.register("description")}
              className="min-h-24 rounded-lg border-gray-200 shadow-none"
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
              <span>Priority <span className="text-destructive">*</span></span>
              <Controller
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <CommonSelect
                    options={priorityOptions}
                    value={field.value}
                    onValueChange={field.onChange}
                    triggerClassName="h-10! w-full rounded-lg"
                  />
                )}
              />
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
              Status
              <Controller
                control={form.control}
                name="status"
                render={({ field }) => (
                  <CommonSelect
                    options={statusOptions}
                    value={field.value}
                    onValueChange={field.onChange}
                    triggerClassName="h-10! w-full rounded-lg"
                  />
                )}
              />
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
              Assignee ID
              <Input
                type="number"
                min={1}
                step={1}
                {...form.register("assignedTo")}
                className={fieldClassName}
              />
              {errors.assignedTo && (
                <span role="alert" className="text-xs text-destructive">
                  {errors.assignedTo.message}
                </span>
              )}
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
              Due date
              <Input
                type="date"
                {...form.register("dueDate")}
                className={fieldClassName}
              />
              {errors.dueDate && (
                <span role="alert" className="text-xs text-destructive">
                  {errors.dueDate.message}
                </span>
              )}
            </label>
          </div>

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
