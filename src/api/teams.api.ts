import "server-only";

import { getBackendToken } from "@/auth";
import type { TeamRolesData, TeamRolesResponse } from "@/types/teams.types";

const API_URL = process.env.API;

export async function getTeamRoles(): Promise<TeamRolesData> {
  const token = await getBackendToken();

  if (!token) {
    throw new Error("You must be signed in to access team roles.");
  }

  const response = await fetch(`${API_URL}/api/v1/team-roles`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    cache: "no-store",
  });

  const result: TeamRolesResponse = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Failed to fetch team roles");
  }

  return result.data;
}