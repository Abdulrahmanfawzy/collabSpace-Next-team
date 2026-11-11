"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateProjectAction } from "@/actions/projects.action";
import type { UpdateProjectPayload } from "@/types/project";

interface UpdateProjectVariables {
  id: number;
  payload: UpdateProjectPayload;
}

export function useUpdateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: UpdateProjectVariables) =>
      updateProjectAction(id, payload),
    onSuccess: async (response, variables) => {
      toast.success(response.message);
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["projects"] }),
        queryClient.invalidateQueries({
          queryKey: ["project-overview", variables.id],
        }),
      ]);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update project");
    },
  });
}
