"use client";

import { useQuery } from "@tanstack/react-query";
import { getProjectTeamsAction } from "@/actions/projects.action";

export function useGetProjectTeams(projectId: number) {
  return useQuery({
    queryKey: ["project-teams", projectId],
    queryFn: () => getProjectTeamsAction(projectId),
    enabled: Number.isInteger(projectId) && projectId > 0,
  });
}
