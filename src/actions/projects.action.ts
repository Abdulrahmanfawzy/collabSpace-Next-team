
"use server";

import {
  createProject,
  deleteProject,
  getProjectOverview,
  getProjects,
  updateProject,
} from "@/api/projects.api";
import type {
  CreateProjectPayload,
  ProjectFiltersParams,
  UpdateProjectPayload,
} from "@/types/project";
// ---------------- get projects ----------------
export async function getProjectsAction(
  filters: ProjectFiltersParams
) {
  return await getProjects(filters);
}
// ---------------- get project overview ----------------
export async function getProjectOverviewAction(id: number) {
  return await getProjectOverview(id);
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