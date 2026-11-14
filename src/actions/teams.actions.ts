"use server";

import {
  assignTeamMembers,
  deleteTeamMember,
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

export async function deleteTeamMemberAction(teamId: number, userId: number) {
  return deleteTeamMember(teamId, userId);
}