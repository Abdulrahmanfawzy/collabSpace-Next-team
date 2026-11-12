import { StaticImageData } from "next/image";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string | StaticImageData | null;
  completedTasks: number;
  totalTasks: number;
}

export interface Team {
  id: string;
  name: string;
  members: TeamMember[];
}

export interface TeamBoardProps {
  teams: Team[];
}

export interface TeamRoleOption {
  value: string;
  is_leader: boolean;
}

export interface TeamRolesData {
  roles: TeamRoleOption[];
  default: string;
}

export interface TeamRolesResponse {
  success: boolean;
  message: string;
  data: TeamRolesData;
}

export interface TeamListMember {
  id: number;
  name: string;
  email: string;
  job_title: string | null;
  avatar_url: string | null;
  role_in_team: string;
  is_leader: boolean;
  joined_at: string;
}

export interface TeamListItem {
  id: number;
  name: string;
  description: string;
  created_by: number;
  creator: {
    id: number;
    name: string;
    email: string;
  };
  members_count: number;
  active_projects_count: number;
  members: TeamListMember[];
  created_at: string;
  updated_at: string;
}

export interface TeamPaginationLink {
  url: string | null;
  label: string;
  page: number | null;
  active: boolean;
}

export interface TeamsPagination {
  current_page: number;
  from: number | null;
  last_page: number;
  links: TeamPaginationLink[];
  path: string;
  per_page: number;
  to: number | null;
  total: number;
}

export interface TeamsPageLinks {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
}

export interface TeamsData {
  data: TeamListItem[];
  links: TeamsPageLinks;
  meta: TeamsPagination;
}

export interface TeamsResponse {
  success: boolean;
  message: string;
  data: TeamsData;
}

export interface TeamsParams {
  page?: number;
  per_page?: number;
}

export interface TeamMemberAssignment {
  user_id: number;
  role_in_team?: string;
}

export interface AssignTeamMembersPayload {
  members: TeamMemberAssignment[];
}

export interface AssignTeamMembersResponse {
  success: boolean;
  message: string;
  data: TeamListItem;
}

export interface DeleteTeamMemberResponse {
  success: boolean;
  message: string;
  data: TeamListItem;
}