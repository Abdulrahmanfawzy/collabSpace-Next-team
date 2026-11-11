"use client";

import { useQuery } from "@tanstack/react-query";
import { getProjectKanbanAction } from "@/actions/tasks.actions";

export function useGetProjectKanban(projectId: number) {
  return useQuery({
    queryKey: ["project-kanban", projectId],
    queryFn: () => getProjectKanbanAction(projectId),
    enabled: Number.isInteger(projectId) && projectId > 0,
  });
}