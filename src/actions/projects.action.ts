
"use server";

import { getProjectOverview, getProjects } from "@/api/projects.api";
import type { ProjectFiltersParams } from "@/types/project";

export async function getProjectsAction(
  filters: ProjectFiltersParams
) {
  return await getProjects(filters);
}

export async function getProjectOverviewAction(id: number) {
  return await getProjectOverview(id);
}
