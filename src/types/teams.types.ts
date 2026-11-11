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