
"use server";

import { createProject, getProjectOverview, getProjects } from "@/api/projects.api";
import type { CreateProjectPayload, ProjectFiltersParams } from "@/types/project";
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