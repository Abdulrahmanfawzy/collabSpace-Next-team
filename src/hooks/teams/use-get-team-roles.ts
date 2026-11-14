"use client";

import { useQuery } from "@tanstack/react-query";
import { getTeamRolesAction } from "@/actions/teams.actions";

export function useGetTeamRoles() {
  return useQuery({
    queryKey: ["team-roles"],
    queryFn: getTeamRolesAction,
  });
}
