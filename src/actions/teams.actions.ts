"use server";

import { getTeamRoles, getTeams } from "@/api/teams.api";
import type { TeamsParams } from "@/types/teams.types";

export async function getTeamRolesAction() {
  return getTeamRoles();
}

export async function getTeamsAction(params: TeamsParams = {}) {
  return getTeams(params);
}