"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { assignTeamMembersAction } from "@/actions/teams.actions";
import type { AssignTeamMembersPayload } from "@/types/teams.types";

interface AssignTeamMembersVariables {
  teamId: number;
  projectId?: number;
  payload: AssignTeamMembersPayload;
}

export function useAssignTeamMembers() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ teamId, payload }: AssignTeamMembersVariables) =>
      assignTeamMembersAction(teamId, payload),
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
      toast.error(error.message || "Failed to assign team members");
    },
  });
}
