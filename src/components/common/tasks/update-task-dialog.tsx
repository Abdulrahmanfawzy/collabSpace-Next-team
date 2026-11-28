"use client";

import { useMemo, useState, type FormEvent } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CommonSelect } from "@/components/common/common-select";
import { useUpdateTask } from "@/hooks/tasks/use-update-task";
import { useAssignTask } from "@/hooks/tasks/use-assign-task";
import { useGetProjectTeams } from "@/hooks/projects/use-get-project-teams";
import type {
  ApiTaskStatus,
  Task,
  TaskAssigneeOption,
  UpdateTaskAssignmentPayload,
  UpdateTaskPayload,
} from "@/types/tasks.types";

interface UpdateTaskDialogProps {
  task: Task;
  projectId?: number;
  onOpenChange: (open: boolean) => void;
  assignees?: TaskAssigneeOption[];
}

const priorityOptions = [
  { label: "Low", value: "Low" },
  { label: "Medium", value: "Medium" },
  { label: "High", value: "High" },
  { label: "Critical", value: "Critical" },
] satisfies { label: string; value: UpdateTaskPayload["priority"] }[];

const statusOptions = [
  { label: "Pending", value: "Pending" },
  { label: "In Progress", value: "In Progress" },
  { label: "In Review", value: "In Review" },
  { label: "Completed", value: "Completed" },
] satisfies { label: string; value: ApiTaskStatus }[];

const statusByTaskStatus: Record<Task["status"], ApiTaskStatus> = {
  todo: "Pending",
  "in-progress": "In Progress",
  "in-review": "In Review",
  completed: "Completed",
};

const priorityByTaskPriority: Record<
  Task["priority"],
  UpdateTaskPayload["priority"]
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
  assignees,
}: UpdateTaskDialogProps) {
  const { mutate, isPending } = useUpdateTask();
  const {
    mutate: assignTask,
    isPending: isAssigning,
  } = useAssignTask();
  const [name, setName] = useState(task.name);
  const [priority, setPriority] = useState<UpdateTaskPayload["priority"]>(
    priorityByTaskPriority[task.priority]
  );
  const [status, setStatus] = useState<ApiTaskStatus>(
    statusByTaskStatus[task.status]
  );
  const [formError, setFormError] = useState("");
  const [assigneeId, setAssigneeId] = useState(
    task.assignees[0]?.id ?? ""
  );
  const [assignmentError, setAssignmentError] = useState("");
  const effectiveProjectId = projectId ?? task.projectId;
  const hasValidProject =
    effectiveProjectId !== undefined &&
    Number.isInteger(effectiveProjectId) &&
    effectiveProjectId > 0;
  const { data: projectTeams = [], isPending: areMembersLoading } =
    useGetProjectTeams(assignees ? 0 : (effectiveProjectId ?? 0));
  const memberOptions = useMemo(() => {
    if (assignees) return assignees;
    return projectTeams
      .flatMap((team) => team.members)
      .reduce<TaskAssigneeOption[]>((members, member) => {
        if (!members.some(({ id }) => id === member.id)) {
          members.push({ id: member.id, name: member.name });
        }
        return members;
      }, []);
  }, [assignees, projectTeams]);
  const assigneeOptions = useMemo(() => {
    const options = [...memberOptions];
    for (const current of task.assignees) {
      const id = Number(current.id);
      if (
        Number.isInteger(id) &&
        id > 0 &&
        !options.some((option) => option.id === id)
      ) {
        options.push({ id, name: current.name });
      }
    }
    return options.sort((first, second) =>
      first.name.localeCompare(second.name)
    );
  }, [memberOptions, task.assignees]);
  const isMembersLoading = !assignees && areMembersLoading;
  const isAssigneeSelectDisabled =
    assigneeOptions.length === 0 ||
    (!assignees && (!hasValidProject || areMembersLoading));

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName) {
      setFormError("Task name is required.");
      return;
    }

    mutate(
      {
        taskId: task.id,
        projectId: projectId ?? task.projectId,
        payload: { name: trimmedName, priority, status },
      },
      { onSuccess: () => onOpenChange(false) }
    );
  };

  const handleAssign = () => {
    const parsedAssigneeId = Number(assigneeId);
    if (!Number.isInteger(parsedAssigneeId) || parsedAssigneeId <= 0) {
      setAssignmentError("Select a team member.");
      return;
    }
    if (!assigneeOptions.some((assignee) => assignee.id === parsedAssigneeId)) {
      setAssignmentError("Choose a team member from this project.");
      return;
    }

    setAssignmentError("");
    const payload: UpdateTaskAssignmentPayload = {
      assigned_to: parsedAssigneeId,
    };
    assignTask(
      {
        taskId: task.id,
        projectId: projectId ?? task.projectId,
        payload,
      },
      { onSuccess: () => onOpenChange(false) }
    );
  };

  return (
    <Dialog open onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Update Task</DialogTitle>
          <DialogDescription>
            Change task details or assign it to a team member.
          </DialogDescription>
        </DialogHeader>

        <section className="flex flex-col gap-3 rounded-lg border border-gray-100 p-4">
          <h3 className="text-sm font-medium text-gray-800">
            {task.assignees.length ? "Reassign task" : "Assign task"}
          </h3>
          <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
            Team member
            <CommonSelect
              options={assigneeOptions.map((assignee) => ({
                label: assignee.name,
                value: String(assignee.id),
              }))}
              value={assigneeId}
              onValueChange={(value) => {
                setAssigneeId(value);
                setAssignmentError("");
              }}
              disabled={isAssigneeSelectDisabled}
              placeholder={
                !assignees && !hasValidProject
                  ? "Project unavailable"
                  : isMembersLoading
                    ? "Loading members..."
                    : "Choose a team member"
              }
              triggerClassName="h-10! w-full rounded-lg"
            />
            {!isMembersLoading && assigneeOptions.length === 0 && (
              <span className="text-xs font-normal text-gray-500">
                No members are assigned to this project yet.
              </span>
            )}
          </label>
          {assignmentError && (
            <p role="alert" className="text-sm text-destructive">
              {assignmentError}
            </p>
          )}
          <Button
            type="button"
            variant="outline"
            disabled={isAssigning || isPending || isAssigneeSelectDisabled}
            onClick={handleAssign}
          >
            {isAssigning
              ? "Assigning..."
              : task.assignees.length
                ? "Reassign"
                : "Assign"}
          </Button>
        </section>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
            Task name
            <Input
              required
              maxLength={255}
              value={name}
              onChange={(event) => setName(event.target.value)}
              className={fieldClassName}
            />
          </label>

          <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
            Priority
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
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Updating..." : "Update Task"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function isPriority(
  value: string
): value is UpdateTaskPayload["priority"] {
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
