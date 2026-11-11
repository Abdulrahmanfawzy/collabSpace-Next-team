
"use server";

import {
  createProject,
  deleteProject,
  getProjectOverview,
  getProjectTeams,
  getProjects,
 
  updateProject,
} from "@/api/projects.api";
import type {
  CreateProjectPayload,
  ProjectFiltersParams,
  ProjectOverviewParams,
  UpdateProjectPayload,
} from "@/types/project";
// ---------------- get projects ----------------
export async function getProjectsAction(
  filters: ProjectFiltersParams
) {
  return await getProjects(filters);
}
// ---------------- get project overview ----------------
export async function getProjectOverviewAction( params: ProjectOverviewParams) {
  return await getProjectOverview(params);
}
// ---------------- get project teams ----------------
export async function getProjectTeamsAction(projectId: number) {
  return await getProjectTeams(projectId);
}
// ---------------- create project ----------------
export async function createProjectAction(
  payload: CreateProjectPayload
) {
  return await createProject(payload);
}
// ---------------- update project ----------------
export async function updateProjectAction(
  id: number,
  payload: UpdateProjectPayload
) {
  return await updateProject(id, payload);
}
// ---------------- delete project ----------------
export async function deleteProjectAction(id: number) {
  return await deleteProject(id);
}

