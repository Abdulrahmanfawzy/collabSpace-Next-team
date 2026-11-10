import { LucideIcon } from "lucide-react"

export interface DashboardData {
  overview: {
    projects: {
      total: number;
      active: number;
      completed: number;
      average_progress: number;
    };
    tasks: {
      total: number;
      pending: number;
      in_progress: number;
      in_review: number;
      completed: number;
      overdue: number;
      assigned_to_me: number;
      completion_rate: number;
      by_priority: {
        low: number;
        medium: number;
        high: number;
        critical: number;
      };
    };
    meetings: {
      upcoming_count: number;
    };
    teams: {
      total: number;
    };
  };
}
export type RecentFilesProps = {
  files: RecentFile[]
  viewAllHref?: string
}
export type ActiveProject = {
  id: string
  name: string
  done: number // tasks done
  total: number // total tasks
  color?: ProjectColor
}

export type ActiveProjectsProps = {
  projects: ActiveProject[]
  viewAllHref?: string
}

export type RecentFile = {
  id: string
  name: string // e.g. "UX_Research_Summary.pdf" (the icon is picked from the extension)
  author: string
  time: string // e.g. "13:00"
  downloadUrl?: string
}
export type ProjectColor = "purple" | "teal"

export type TeamMember = {
  id: string
  name: string
  avatarUrl?: string
  isLeader?: boolean
  done: number // tasks done
  total: number // total tasks
}
export type Priority = "High" | "Medium" | "Low"

export type Task = {
  id: string
  title: string
  priority: Priority
  due: string // e.g. "due today", "due Dec 18"
  progress: number // 0–100
}
export type TasksAndTeamsProps = {
  tasks: Task[]
  members: TeamMember[]
  teams?: string[]
  onTeamChange?: (team: string) => void
  tasksHref?: string
}

export type Meeting = {
  id: string
  title: string
  date: string // e.g. "Today", "Dec 12"
  time: string // e.g. "14:00 - 15:00"
  attendees: Attendee[]
}
export type UpcomingMeetingsProps = {
  meetings: Meeting[]
  viewAllHref?: string
}
export type AskAIProps = {
  onSend: (message: string) => void | Promise<void>
  heading?: string
  placeholder?: string
  className?: string
}

export type Attendee = {
  name: string
  avatarUrl?: string
}

export type MeetingsAndAskAIProps = {
  meetings: Meeting[]
  onSend: AskAIProps["onSend"]
  meetingsHref?: string
}
