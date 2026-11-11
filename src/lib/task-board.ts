import type { Task, TaskColumn, TaskStatus } from "@/types/tasks.types";

const taskColumnDefinitions: {
  id: TaskStatus;
  title: string;
}[] = [
  { id: "todo", title: "To-do" },
  { id: "in-progress", title: "In Progress" },
  { id: "in-review", title: "In Review" },
  { id: "completed", title: "Completed Tasks" },
];

export function createTaskColumns(tasks: Task[]): TaskColumn[] {
  return taskColumnDefinitions.map((column) => ({
    ...column,
    tasks: tasks.filter((task) => task.status === column.id),
  }));
}
