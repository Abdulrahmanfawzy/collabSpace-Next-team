"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { assignProjectTeamsAction } from "@/actions/projects.action";
import type { AssignProjectTeamsPayload } from "@/types/project";

interface AssignProjectTeamsVariables {
  projectId: number;
  payload: AssignProjectTeamsPayload;
}

export function useAssignProjectTeams() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ projectId, payload }: AssignProjectTeamsVariables) =>
      assignProjectTeamsAction(projectId, payload),
    onSuccess: async (response, { projectId }) => {
      toast.success(response.message);
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["projects"] }),
        queryClient.invalidateQueries({
          queryKey: ["project-overview", projectId],
        }),
        queryClient.invalidateQueries({
          queryKey: ["project-teams", projectId],
        }),
      ]);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to assign teams to project");
    },
  });
}
