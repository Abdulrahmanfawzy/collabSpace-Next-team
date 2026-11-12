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