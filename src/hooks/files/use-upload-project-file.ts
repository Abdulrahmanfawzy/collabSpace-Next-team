"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { uploadProjectFileAction } from "@/actions/files.actions";

interface UploadProjectFileVariables {
  projectId: number;
  formData: FormData;
}

export function useUploadProjectFile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ projectId, formData }: UploadProjectFileVariables) =>
      uploadProjectFileAction(projectId, formData),
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
      toast.error(error.message || "Failed to upload project file");
    },
  });
}
