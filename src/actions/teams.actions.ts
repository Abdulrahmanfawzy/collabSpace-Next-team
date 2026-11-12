"use server";

import {
  assignTeamMembers,
  getTeamRoles,
  getTeams,
} from "@/api/teams.api";
import type {
  AssignTeamMembersPayload,
  TeamsParams,
} from "@/types/teams.types";

export async function getTeamRolesAction() {
  return getTeamRoles();
}

export async function getTeamsAction(params: TeamsParams = {}) {
  return getTeams(params);
}

export async function assignTeamMembersAction(
  teamId: number,
  payload: AssignTeamMembersPayload
) {
  return assignTeamMembers(teamId, payload);
}