import { LucideIcon } from "lucide-react"

export type Stat = {
    title: string
    value: number
    total: number
    change: number
    icon: LucideIcon
    badge: string // icon badge background + icon color
    track: string // progress track color
    bar: string // progress indicator color
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
