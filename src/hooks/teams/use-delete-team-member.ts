"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteTeamMemberAction } from "@/actions/teams.actions";

interface DeleteTeamMemberVariables {
  teamId: number;
  userId: number;
  projectId?: number;
}

export function useDeleteTeamMember() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ teamId, userId }: DeleteTeamMemberVariables) =>
      deleteTeamMemberAction(teamId, userId),
    onSuccess: async (response, { projectId }) => {
      toast.success(response.message);
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["teams"] }),
        ...(projectId
          ? [
              queryClient.invalidateQueries({
                queryKey: ["project-teams", projectId],
              }),
            ]
          : []),
      ]);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to remove team member");
    },
  });
}
