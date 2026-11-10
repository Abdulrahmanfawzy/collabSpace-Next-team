"use client";

import { useQuery } from "@tanstack/react-query";
import { getProjectOverviewAction } from "@/actions/projects.action";

export function useGetProjectOverview(projectId: number) {
  return useQuery({
    queryKey: ["project-overview", projectId],
    queryFn: () => getProjectOverviewAction(projectId),
    enabled: Number.isInteger(projectId) && projectId > 0,
  });
}
