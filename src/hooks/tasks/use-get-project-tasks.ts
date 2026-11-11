"use client";

import { useQuery } from "@tanstack/react-query";
import { getTasksAction } from "@/actions/tasks.actions";
import { mapApiTasks } from "@/lib/tasks/task-mapper";
import type { TaskFilters } from "@/types/tasks.types";

export function useGetProjectTasks(projectId: number, page: number) {
  return useQuery({
    queryKey: ["project-tasks", projectId, page],
    queryFn: async () => {
      const result = await getTasksAction({
        project_id: projectId,
        per_page: 15,
        page,
      } satisfies TaskFilters);
      return {
        tasks: mapApiTasks(result.tasks),
        pagination: result.pagination,
      };
    },
    placeholderData: (previousData) => previousData,
    enabled: Number.isInteger(projectId) && projectId > 0,
  });
}
