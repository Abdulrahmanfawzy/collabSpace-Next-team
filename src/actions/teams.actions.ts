"use server";

import { getTeamRoles } from "@/api/teams.api";

export async function getTeamRolesAction() {
  return getTeamRoles();
}