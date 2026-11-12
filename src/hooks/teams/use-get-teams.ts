"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getTeamsAction } from "@/actions/teams.actions";
import type { TeamsParams } from "@/types/teams.types";

export function useGetTeams(
  { page = 1, per_page = 15 }: TeamsParams = {},
  options: { enabled?: boolean } = {}
) {
  const params = { page, per_page };

  return useQuery({
    queryKey: ["teams", params],
    queryFn: () => getTeamsAction(params),
    placeholderData: keepPreviousData,
    enabled: options.enabled ?? true,
  });
}
