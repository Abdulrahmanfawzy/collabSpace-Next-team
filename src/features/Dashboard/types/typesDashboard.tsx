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