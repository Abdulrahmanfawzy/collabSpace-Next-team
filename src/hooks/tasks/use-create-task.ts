"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createTaskAction } from "@/actions/tasks.actions";
import type { CreateTaskPayload } from "@/types/tasks.types";

export function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateTaskPayload) => createTaskAction(payload),
    onSuccess: async ({ message }, payload) => {
      toast.success(message);
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["project-kanban", payload.project_id],
        }),
        queryClient.invalidateQueries({ queryKey: ["tasks"] }),
        queryClient.invalidateQueries({
          queryKey: ["project-overview", payload.project_id],
        }),
      ]);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create task");
    },
  });
}
