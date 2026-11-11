import "server-only";

import type {
  ApiTaskStatus,
  ProjectKanban,
  ProjectKanbanResponse,
  TaskFilters,
  Task,
  TaskStatus,
  TaskStatusUpdateResponse,
  TasksListResult,
  TasksResponse,
} from "@/types/tasks.types";
import { mapApiTask } from "../lib/tasks/task-mapper";

const API_URL = process.env.API;

async function getAuthHeaders(): Promise<HeadersInit> {
//   const token = await getAccessToken();
const token = process.env.token;
  if (!token) {
    throw new Error("You must be signed in to access tasks.");
  }

  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
  };
}

const apiStatusByTaskStatus: Record<TaskStatus, ApiTaskStatus> = {
  todo: "Pending",
  "in-progress": "In Progress",
  "in-review": "In Review",
  completed: "Completed",
};

// ----------- list tasks with filters------------------------------------------
export async function getTasks(
  filters: TaskFilters = {}
): Promise<TasksListResult> {
  const searchParams = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.set(key, String(value));
    }
  });

  const response = await fetch(
    `${API_URL}/api/v1/tasks?${searchParams.toString()}`,
    {
      method: "GET",
      headers: await getAuthHeaders(),
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
// ----------- Get Kanaban board for project ------------------------------------------
export async function getProjectKanban(
  projectId: number
): Promise<ProjectKanban> {
  const response = await fetch(
    `${API_URL}/api/v1/projects/${projectId}/tasks/kanban`,
    {
      method: "GET",
      headers: await getAuthHeaders(),
      cache: "no-store",
    }
  );

  const result = (await response.json()) as ProjectKanbanResponse;

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Failed to fetch project kanban");
  }

  const { project, total_tasks, columns } = result.data;

  const columnDefinitions: {
    id: TaskStatus;
    apiStatus: keyof typeof columns;
    title: string;
  }[] = [
    { id: "todo", apiStatus: "Pending", title: "To-do" },
    { id: "in-progress", apiStatus: "In Progress", title: "In Progress" },
    { id: "in-review", apiStatus: "In Review", title: "In Review" },
    { id: "completed", apiStatus: "Completed", title: "Completed Tasks" },
  ];

  const mappedColumns = columnDefinitions.map((column) => ({
    id: column.id,
    title: column.title,
    tasks: columns[column.apiStatus].tasks.map(mapApiTask),
  }));

  return {
    project,
    totalTasks: total_tasks,
    columns: mappedColumns,
  };
}
// -----------update task status by drag & drop ------------------------------------------

export async function updateTaskStatus(
  taskId: string,
  status: TaskStatus
): Promise<Task> {
  const response = await fetch(
    `${API_URL}/api/v1/tasks/${encodeURIComponent(taskId)}/status`,
    {
      method: "PATCH",
      headers: {
        ...(await getAuthHeaders()),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: apiStatusByTaskStatus[status] }),
      cache: "no-store",
    }
  );

  const result = (await response.json()) as TaskStatusUpdateResponse;
  if (!response.ok || !result.success) {
    throw new Error(result.message || "Failed to update task status");
  }

  return mapApiTask(result.data);
}
// --------------------------------------------------------------------------------------------------