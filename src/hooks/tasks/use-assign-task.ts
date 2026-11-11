"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { assignTaskAction } from "@/actions/tasks.actions";
import type { UpdateTaskAssignmentPayload } from "@/types/tasks.types";

interface AssignTaskVariables {
  taskId: string;
  projectId?: number;
  payload: UpdateTaskAssignmentPayload;
}

export function useAssignTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ taskId, payload }: AssignTaskVariables) =>
      assignTaskAction(taskId, payload),
    onSuccess: async ({ message }, { projectId }) => {
      toast.success(message);
      const invalidations = [
        queryClient.invalidateQueries({ queryKey: ["tasks"] }),
      ];

      if (projectId) {
        invalidations.push(
          queryClient.invalidateQueries({
            queryKey: ["project-kanban", projectId],
          })
        );
      }

      await Promise.all(invalidations);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to assign task");
    },
  });
}
