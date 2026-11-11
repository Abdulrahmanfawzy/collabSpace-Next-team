
import "server-only";


import type {
  ProjectOverview,
  ProjectOverviewResponse,
  ProjectsResponse,
  ProjectFiltersParams,
  CreateProjectPayload,
  CreateProjectResponse,
  ProjectMutationResponse,
  UpdateProjectResponse,
  UpdateProjectPayload,
  ProjectOverviewParams,
  ProjectTeamsResponse,
  ProjectAssignedTeam,
} from "@/types/project";

const API_URL = process.env.API
// ---------------- get projects ----------------
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
// ---------------- get project overview ----------------

export async function getProjectOverview({
  id,
  period,
  year,
}: ProjectOverviewParams): Promise<ProjectOverview | null> {
  const token = process.env.token;
   const params = new URLSearchParams({
    period,
    year: String(year),
  });

  const response = await fetch(
    `${API_URL}/api/v1/projects/${id}/overview?${params.toString()}`,
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

export async function getProjectTeams(
  projectId: number
): Promise<ProjectAssignedTeam[]> {
  const token = process.env.token;
  const response = await fetch(
    `${API_URL}/api/v1/projects/${projectId}/teams`,
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
    throw new Error("Failed to fetch project teams");
  }

  const result: ProjectTeamsResponse = await response.json();

  if (!result.success) {
    throw new Error(result.message || "Failed to fetch project teams");
  }

  return result.data;
}

// ---------------- create project ----------------
export async function createProject(
  payload: CreateProjectPayload
): Promise<CreateProjectResponse> {
  const token = process.env.token;

  const response = await fetch(
    `${process.env.API}/api/v1/projects`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    }
  );

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Failed to create project");
  }

  return result;
}
// ---------------- update project ----------------
export async function updateProject(
  id: number,
  payload: UpdateProjectPayload
): Promise<UpdateProjectResponse> {
  const token = process.env.token;
  const response = await fetch(`${API_URL}/api/v1/projects/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });
  const result: UpdateProjectResponse = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Failed to update project");
  }

  return result;
}
// ---------------- delete project ----------------
export async function deleteProject(
  id: number
): Promise<ProjectMutationResponse> {
  const token = process.env.token;
  const response = await fetch(`${API_URL}/api/v1/projects/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  const result = response.status === 204
    ? { success: true, message: "Project deleted successfully." }
    : (await response.json()) as ProjectMutationResponse;

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Failed to delete project");
  }

  return result;
}
// ---------------- update project ----------------
export async function updateProject(
  id: number,
  payload: UpdateProjectPayload
): Promise<UpdateProjectResponse> {
  const token = process.env.token;
  const response = await fetch(`${API_URL}/api/v1/projects/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });
  const result: UpdateProjectResponse = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Failed to update project");
  }

  return result;
}
// ---------------- delete project ----------------
export async function deleteProject(
  id: number
): Promise<ProjectMutationResponse> {
  const token = process.env.token;
  const response = await fetch(`${API_URL}/api/v1/projects/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  const result = response.status === 204
    ? { success: true, message: "Project deleted successfully." }
    : (await response.json()) as ProjectMutationResponse;

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Failed to delete project");
  }

  return result;
}
// ---------------- ----------------