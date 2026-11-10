
import "server-only";


import type {
  ProjectOverview,
  ProjectOverviewResponse,
  ProjectsResponse,
  ProjectFiltersParams,
} from "@/types/project";

const API_URL = process.env.API

export async function getProjects(
  filters: ProjectFiltersParams = {}
): Promise<ProjectsResponse> {
  const token = process.env.token;

  const searchParams = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.append(key, String(value));
    }
  });

  const response = await fetch(
    `${API_URL}/api/v1/projects?${searchParams.toString()}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch projects");
  }

  return response.json();
}

export async function getProjectOverview(
  id: number
): Promise<ProjectOverview | null> {
  const token = process.env.token;
  const response = await fetch(
    `${API_URL}/api/v1/projects/${id}/overview`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      cache: "no-store",
    }
  );

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Failed to fetch project overview");
  }

  const result: ProjectOverviewResponse = await response.json();

  if (!result.success) {
    throw new Error(result.message || "Failed to fetch project overview");
  }

  return result.data;
}
