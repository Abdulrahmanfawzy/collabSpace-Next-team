"use client";

import { useQuery } from "@tanstack/react-query";
import { getProjectOverviewAction } from "@/actions/projects.action";
import { ProjectOverviewParams } from "../../types/project";

export function useGetProjectOverview({
  id: projectId,
  period,
  year,
}: ProjectOverviewParams) {
  return useQuery({
    queryKey: ["project-overview", projectId, period, year],
    queryFn: () => getProjectOverviewAction({ id: projectId, period, year }),
    enabled: Number.isInteger(projectId) && projectId > 0,
  });
}
