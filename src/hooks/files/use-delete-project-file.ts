"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteProjectFileAction } from "@/actions/files.actions";

interface DeleteProjectFileVariables {
  fileId: number;
  projectId: number;
}

export function useDeleteProjectFile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ fileId }: DeleteProjectFileVariables) =>
      deleteProjectFileAction(fileId),
    onSuccess: async ({ message }, { projectId }) => {
      toast.success(message);
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["project-files", projectId],
        }),
        queryClient.invalidateQueries({
          queryKey: ["project-overview", projectId],
        }),
      ]);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete project file");
    },
  });
}
