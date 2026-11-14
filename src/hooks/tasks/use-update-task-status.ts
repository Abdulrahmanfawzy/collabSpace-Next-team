"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateTaskStatusAction } from "@/actions/tasks.actions";
import { moveTaskInColumns } from "@/lib/task-board";
import type { ProjectKanban, TaskStatus } from "@/types/tasks.types";

interface UpdateTaskStatusVariables {
  projectId?: number;
  taskId: string;
  status: TaskStatus;
  targetIndex: number;
}

export function useUpdateTaskStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ taskId, status }: UpdateTaskStatusVariables) =>
      updateTaskStatusAction(taskId, status),
    onMutate: async ({ projectId, taskId, status, targetIndex }) => {
      if (!projectId) return undefined;

      const queryKey = ["project-kanban", projectId];
      await queryClient.cancelQueries({ queryKey });

      const previousKanban =
        queryClient.getQueryData<ProjectKanban>(queryKey);
      if (previousKanban) {
        queryClient.setQueryData<ProjectKanban>(queryKey, {
          ...previousKanban,
          columns: moveTaskInColumns(
            previousKanban.columns,
            taskId,
            status,
            targetIndex
          ),
        });
      }

      return { previousKanban, queryKey };
    },
    onError: (error, _variables, context) => {
      if (context?.previousKanban && context.queryKey) {
        queryClient.setQueryData(context.queryKey, context.previousKanban);
      }
      toast.error(error.message || "Failed to update task status");
    },
    onSuccess: async (_task, { projectId }) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["tasks"] }),
        ...(projectId
          ? [
              queryClient.invalidateQueries({
                queryKey: ["project-kanban", projectId],
              }),
            ]
          : []),
      ]);
    },
  });
}
