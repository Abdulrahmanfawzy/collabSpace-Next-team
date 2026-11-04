import { StaticImageData } from "next/image"

export type TaskStatus =
  | "todo"
  | "in-progress"
  | "in-review"
  | "completed"

export type TaskPriority = "high" | "medium" | "low"

export interface Task {
  id: string
  title: string
  description: string
  status: TaskStatus
  priority: TaskPriority
  progress?: number
  assignees: {
    id: string
    name: string
    avatar: string | StaticImageData
  }[]
  commentsCount: number
  dueDate: string
  reviewer?: {
  name: string
  avatar: string | StaticImageData
}
}

export interface TaskColumn {
  id: TaskStatus
  title: string
  tasks: Task[]
}

export interface TaskBoardProps {
  columns: TaskColumn[]
  onAddTask?: (status: TaskStatus) => void
  onTaskClick?: (task: Task) => void
}