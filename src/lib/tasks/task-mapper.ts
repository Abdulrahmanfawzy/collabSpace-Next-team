import type { ApiTask, Task } from "@/types/tasks.types";

function mapStatus(status: string): Task["status"] {
  switch (status.toLowerCase().replaceAll("_", " ").replaceAll("-", " ")) {
    case "pending":
    case "to do":
    case "todo":
      return "todo";
    case "in progress":
      return "in-progress";
    case "in review":
      return "in-review";
    case "completed":
      return "completed";
    default:
      throw new Error(`Unsupported task status: ${status}`);
  }
}

function mapPriority(priority: string): Task["priority"] {
  switch (priority.toLowerCase()) {
    case "critical":
      return "critical";
    case "high":
      return "high";
    case "medium":
      return "medium";
    case "low":
      return "low";
    default:
      throw new Error(`Unsupported task priority: ${priority}`);
  }
}

export function mapApiTask(task: ApiTask): Task {
  const assignees =
    task.assignees ??
    task.assigned_users ??
    (task.assignee
      ? [task.assignee]
      : task.assigned_to && typeof task.assigned_to === "object"
        ? [task.assigned_to]
        : []);

  const status = mapStatus(task.status);

  return {
    id: String(task.id),
    projectId:
      task.project_id !== undefined &&
      Number.isInteger(Number(task.project_id))
        ? Number(task.project_id)
        : undefined,
    name: task.name ?? task.title ?? "",
    description: task.description ?? null,
    status,
    priority: mapPriority(task.priority),
    progress:
      task.progress_percentage ??
      task.progress ??
      (status === "completed" ? 100 : undefined),
    assignees: assignees.map((assignee) => ({
      id: String(assignee.id),
      name: assignee.name,
      avatar: assignee.avatar_url ?? assignee.avatar ?? null,
    })),
    commentsCount: task.comments_count ?? task.comments?.length ?? 0,
    dueDate: task.due_date ?? "",
    reviewer: task.reviewer
      ? {
          name: task.reviewer.name,
          avatar: task.reviewer.avatar_url ?? task.reviewer.avatar ?? null,
        }
      : undefined,
  };
}

export function mapApiTasks(tasks: ApiTask[]): Task[] {
  return tasks.map(mapApiTask);
}
