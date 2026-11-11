"use server";

import { getTasks } from "@/api/tasks.api";
import type { TaskFilters } from "@/types/tasks.types";

export async function getTasksAction(filters: TaskFilters = {}) {
  return getTasks(filters);
}