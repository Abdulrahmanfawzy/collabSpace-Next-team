"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteProjectTeamAction } from "@/actions/projects.action";

interface DeleteProjectTeamVariables {
  projectId: number;
  teamId: number;
}

export function useDeleteProjectTeam() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ projectId, teamId }: DeleteProjectTeamVariables) =>
      deleteProjectTeamAction(projectId, teamId),
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
      toast.error(error.message || "Failed to remove team from project");
    },
  });
}
