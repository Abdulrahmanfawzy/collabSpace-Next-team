
"use server";

import { getProjects } from "@/api/projects.api";
import type { ProjectFiltersParams } from "@/types/project";

export async function getProjectsAction(
  filters: ProjectFiltersParams
) {
  return await getProjects(filters);
}
