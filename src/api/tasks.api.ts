import "server-only";

import type {
  ApiTask,
  TaskFilters,
  TasksListResult,
  TasksResponse,
} from "@/types/tasks.types";

const API_URL = process.env.API;

export async function getTasks(
  filters: TaskFilters = {}
): Promise<TasksListResult> {
  const searchParams = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.set(key, String(value));
    }
  });

  const token = process.env.token;
  const response = await fetch(
    `${API_URL}/api/v1/tasks?${searchParams.toString()}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      cache: "no-store",
    }
  );

  const result = (await response.json()) as TasksResponse;
  if (!response.ok || !result.success) {
    throw new Error(result.message || "Failed to fetch tasks");
  }

  if (Array.isArray(result.data)) {
    return {
      tasks: result.data,
      pagination: {
        current_page: filters.page ?? 1,
        last_page: 1,
        per_page: result.data.length,
        total: result.data.length,
      },
    };
  }

  const page = result.data;
  const meta = page.meta ?? page;
  return {
    tasks: page.data,
    pagination: {
      current_page: meta.current_page ?? filters.page ?? 1,
      last_page: meta.last_page ?? 1,
      per_page: meta.per_page ?? page.data.length,
      total: meta.total ?? page.data.length,
    },
  };
}