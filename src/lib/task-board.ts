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

export function moveTaskInColumns(
  columns: TaskColumn[],
  taskId: string,
  status: TaskStatus,
  targetIndex: number
): TaskColumn[] {
  const sourceColumnIndex = columns.findIndex((column) =>
    column.tasks.some((task) => task.id === taskId)
  );
  const targetColumnIndex = columns.findIndex((column) => column.id === status);

  if (sourceColumnIndex < 0 || targetColumnIndex < 0) return columns;

  const sourceColumn = columns[sourceColumnIndex];
  const taskIndex = sourceColumn.tasks.findIndex((task) => task.id === taskId);
  if (taskIndex < 0) return columns;

  const sourceTasks = [...sourceColumn.tasks];
  const [task] = sourceTasks.splice(taskIndex, 1);
  const targetTasks =
    sourceColumnIndex === targetColumnIndex
      ? sourceTasks
      : [...columns[targetColumnIndex].tasks];
  const insertionIndex = Math.max(
    0,
    Math.min(targetIndex, targetTasks.length)
  );

  targetTasks.splice(
    insertionIndex,
    0,
    task.status === status ? task : { ...task, status }
  );

  return columns.map((column, index) => {
    if (index === sourceColumnIndex && index === targetColumnIndex) {
      return { ...column, tasks: targetTasks };
    }
    if (index === sourceColumnIndex) {
      return { ...column, tasks: sourceTasks };
    }
    if (index === targetColumnIndex) {
      return { ...column, tasks: targetTasks };
    }
    return column;
  });
}
