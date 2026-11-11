
"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";

import type { ProjectFiltersParams } from "@/types/project";
import { getProjectsAction } from "../../actions/projects.action";

export function useGetProjects(filters: ProjectFiltersParams) {
  return useQuery({
    queryKey: ["projects", filters],
    queryFn: () => getProjectsAction(filters),
    placeholderData: keepPreviousData,
  });
}
