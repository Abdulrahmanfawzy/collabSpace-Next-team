import "server-only";

import { getBackendToken } from "@/auth";
import type {
  TeamRolesData,
  TeamRolesResponse,
  TeamsParams,
  TeamsResponse,
  AssignTeamMembersPayload,
  AssignTeamMembersResponse,
} from "@/types/teams.types";

const API_URL = process.env.API;

interface TeamAssignmentErrorResponse {
  success?: false;
  message?: string;
  errors?: Record<string, string | string[]>;
}

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

export async function getTeams({
  page = 1,
  per_page = 15,
}: TeamsParams = {}): Promise<TeamsResponse> {
  const token = await getBackendToken();

  if (!token) {
    throw new Error("You must be signed in to access teams.");
  }

  const searchParams = new URLSearchParams({
    page: String(page),
    per_page: String(per_page),
  });

  const response = await fetch(
    `${API_URL}/api/v1/teams?${searchParams.toString()}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      cache: "no-store",
    }
  );

  const result: TeamsResponse = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Failed to fetch teams");
  }

  return result;
}

export async function assignTeamMembers(
  teamId: number,
  payload: AssignTeamMembersPayload
): Promise<AssignTeamMembersResponse> {
  const token = await getBackendToken();

  if (!token) {
    throw new Error("You must be signed in to assign team members.");
  }

  const response = await fetch(
    `${API_URL}/api/v1/teams/${teamId}/members`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    }
  );

  const result:
    | AssignTeamMembersResponse
    | TeamAssignmentErrorResponse = await response.json();

  if (!response.ok || !("data" in result) || !result.success) {
    const validationMessages =
      "errors" in result && result.errors
        ? Object.values(result.errors).flatMap((error) =>
            Array.isArray(error) ? error : [error]
          )
        : [];
    const message = [result.message, ...validationMessages]
      .filter((part): part is string => Boolean(part))
      .join(" ");

    throw new Error(message || "Failed to assign team members");
  }

  return result;
}