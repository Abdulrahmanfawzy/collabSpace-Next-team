"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { assignTeamMembersAction } from "@/actions/teams.actions";
import type { AssignTeamMembersPayload } from "@/types/teams.types";

interface AssignTeamMembersVariables {
  teamId: number;
  payload: AssignTeamMembersPayload;
}

export function useAssignTeamMembers() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ teamId, payload }: AssignTeamMembersVariables) =>
      assignTeamMembersAction(teamId, payload),
    onSuccess: async (response) => {
      toast.success(response.message);
      await queryClient.invalidateQueries({ queryKey: ["teams"] });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to assign team members");
    },
  });
}
