"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CommonSelect } from "@/components/common/common-select";
import { useUpdateTask } from "@/hooks/tasks/use-update-task";
import { useAssignTask } from "@/hooks/tasks/use-assign-task";
import {
  assignTaskSchema,
  type AssignTaskFormValues,
} from "@/schemas/tasks/assign-task.schema";
import {
  updateTaskSchema,
  type UpdateTaskFormValues,
} from "@/schemas/tasks/update-task.schema";
import type { Task, UpdateTaskAssignmentPayload } from "@/types/tasks.types";

interface UpdateTaskDialogProps {
  task: Task;
  projectId?: number;
  onOpenChange: (open: boolean) => void;
}

const priorityOptions = [
  { label: "Low", value: "Low" },
  { label: "Medium", value: "Medium" },
  { label: "High", value: "High" },
  { label: "Critical", value: "Critical" },
] satisfies { label: string; value: UpdateTaskFormValues["priority"] }[];

const statusOptions = [
  { label: "Pending", value: "Pending" },
  { label: "In Progress", value: "In Progress" },
  { label: "In Review", value: "In Review" },
  { label: "Completed", value: "Completed" },
] satisfies { label: string; value: UpdateTaskFormValues["status"] }[];

const statusByTaskStatus: Record<
  Task["status"],
  UpdateTaskFormValues["status"]
> = {
  todo: "Pending",
  "in-progress": "In Progress",
  "in-review": "In Review",
  completed: "Completed",
};

const priorityByTaskPriority: Record<
  Task["priority"],
  UpdateTaskFormValues["priority"]
> = {
  low: "Low",
  medium: "Medium",
  high: "High",
  critical: "Critical",
};

const fieldClassName =
  "h-10 rounded-lg border-gray-200 bg-white shadow-none focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/10";

export function UpdateTaskDialog({
  task,
  projectId,
  onOpenChange,
}: UpdateTaskDialogProps) {
  const { mutate: updateTask, isPending: isUpdating } = useUpdateTask();
  const { mutate: assignTask, isPending: isAssigning } = useAssignTask();
  const taskForm = useForm<UpdateTaskFormValues>({
    resolver: zodResolver(updateTaskSchema),
    defaultValues: {
      name: task.name,
      priority: priorityByTaskPriority[task.priority],
      status: statusByTaskStatus[task.status],
    },
  });
  const assignmentForm = useForm<AssignTaskFormValues>({
    resolver: zodResolver(assignTaskSchema),
    defaultValues: { assignedTo: task.assignees[0]?.id ?? "" },
  });
  const projectIdForTask = projectId ?? task.projectId;
  const isPending = isUpdating || isAssigning;

  const handleOpenChange = (open: boolean) => {
    if (isPending) return;
    onOpenChange(open);
  };

  const handleUpdate = taskForm.handleSubmit((values) => {
    updateTask(
      {
        taskId: task.id,
        projectId: projectIdForTask,
        payload: values,
      },
      { onSuccess: () => handleOpenChange(false) }
    );
  });

  const handleAssign = assignmentForm.handleSubmit(({ assignedTo }) => {
    const payload: UpdateTaskAssignmentPayload = {
      assigned_to: Number(assignedTo),
    };
    assignTask(
      {
        taskId: task.id,
        projectId: projectIdForTask,
        payload,
      },
      { onSuccess: () => handleOpenChange(false) }
    );
  });

  return (
    <Dialog open onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Update Task</DialogTitle>
          <DialogDescription>
            Change task details or assign it to a team member.
          </DialogDescription>
        </DialogHeader>

        <form
          className="flex flex-col gap-4 rounded-lg border border-gray-100 p-4"
          onSubmit={handleAssign}
        >
          <h3 className="text-sm font-medium text-gray-800">
            {task.assignees.length ? "Reassign task" : "Assign task"}
          </h3>
          <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
            Team member ID
            <Input
              type="number"
              min={1}
              step={1}
              {...assignmentForm.register("assignedTo")}
              className={fieldClassName}
            />
            {assignmentForm.formState.errors.assignedTo && (
              <span role="alert" className="text-xs text-destructive">
                {assignmentForm.formState.errors.assignedTo.message}
              </span>
            )}
          </label>
          <Button type="submit" variant="outline" disabled={isPending}>
            {isAssigning
              ? "Assigning..."
              : task.assignees.length
                ? "Reassign"
                : "Assign"}
          </Button>
        </form>

        <form className="flex flex-col gap-4" onSubmit={handleUpdate}>
          <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
            Task name
            <Input
              maxLength={255}
              {...taskForm.register("name")}
              className={fieldClassName}
            />
            {taskForm.formState.errors.name && (
              <span role="alert" className="text-xs text-destructive">
                {taskForm.formState.errors.name.message}
              </span>
            )}
          </label>

          <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
            Priority
            <Controller
              control={taskForm.control}
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
              control={taskForm.control}
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

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              disabled={isPending}
              onClick={() => handleOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isUpdating ? "Updating..." : "Update Task"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
