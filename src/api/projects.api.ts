
import "server-only";


import type {
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
