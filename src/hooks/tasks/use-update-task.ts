"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateTaskAction } from "@/actions/tasks.actions";
import type { UpdateTaskPayload } from "@/types/tasks.types";

interface UpdateTaskVariables {
  taskId: string;
  projectId?: number;
  payload: UpdateTaskPayload;
}

export function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ taskId, payload }: UpdateTaskVariables) =>
      updateTaskAction(taskId, payload),
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
      toast.error(error.message || "Failed to update task");
    },
  });
}
