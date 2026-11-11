"use server";

import {
  assignTask,
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
  UpdateTaskAssignmentPayload,
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

export async function assignTaskAction(
  taskId: string,
  payload: UpdateTaskAssignmentPayload
) {
  return assignTask(taskId, payload);
}