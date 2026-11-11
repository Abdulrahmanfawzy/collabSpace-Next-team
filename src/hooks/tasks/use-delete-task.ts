"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteTaskAction } from "@/actions/tasks.actions";

interface DeleteTaskVariables {
  taskId: string;
  projectId?: number;
}

export function useDeleteTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ taskId }: DeleteTaskVariables) => deleteTaskAction(taskId),
    onSuccess: async ({ message }, { projectId }) => {
      toast.success(message);
      const invalidations = [
        queryClient.invalidateQueries({ queryKey: ["tasks"] }),
      ];

      if (projectId) {
        invalidations.push(
          queryClient.invalidateQueries({
            queryKey: ["project-kanban", projectId],
          }),
          queryClient.invalidateQueries({
            queryKey: ["project-overview", projectId],
          })
        );
      }

      await Promise.all(invalidations);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete task");
    },
  });
}
