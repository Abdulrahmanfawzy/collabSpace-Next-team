"use client";

import { useQuery } from "@tanstack/react-query";
import { getTasksAction } from "@/actions/tasks.actions";
import type { TaskFilters } from "@/types/tasks.types";
import { mapApiTasks } from "@/lib/tasks/task-mapper";

export function useGetTasks(filters: TaskFilters = {}) {
  return useQuery({
    queryKey: ["tasks", filters],
    queryFn: async () => {
      const result = await getTasksAction(filters);
      return {
        tasks: mapApiTasks(result.tasks),
        pagination: result.pagination,
      };
    },
    placeholderData: (previousData) => previousData,
  });
}
