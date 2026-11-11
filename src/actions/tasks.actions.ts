"use server";

import {
  createTask,
  getProjectKanban,
  getTasks,
  updateTask,
  updateTaskStatus,
} from "@/api/tasks.api";
import type {
  CreateTaskPayload,
  TaskFilters,
  TaskStatus,
  UpdateTaskPayload,
} from "@/types/tasks.types";
// -----------------------tasks with filter-------------------------------
export async function getTasksAction(filters: TaskFilters = {}) {
  return getTasks(filters);
}
// -----------------------kanban board -------------------------------
export async function getProjectKanbanAction(projectId: number) {
  return getProjectKanban(projectId);
}

export async function updateTaskStatusAction(
  taskId: string,
  status: TaskStatus
) {
  return updateTaskStatus(taskId, status);
}

export async function createTaskAction(payload: CreateTaskPayload) {
  return createTask(payload);
}

export async function updateTaskAction(
  taskId: string,
  payload: UpdateTaskPayload
) {
  return updateTask(taskId, payload);
}