import { ClipboardCheck, ClipboardClock, ClipboardList } from "lucide-react";
import { Stat } from "../types/typesDashboard";
const TOTAL = 94
export const stats: Stat[] = [
    {
      title: "Pending Tasks",
      value: 32,
      total: TOTAL,
      change: 9,
      icon: ClipboardClock,
      badge: "bg-amber-100 text-amber-500",
      track: "bg-amber-100/70",
      bar: "[&>div]:bg-amber-500",
    },
    {
      title: "In Progress",
      value: 40,
      total: TOTAL,
      change: 12,
      icon: ClipboardList,
      badge: "bg-blue-100 text-blue-600",
      track: "bg-blue-100/70",
      bar: "[&>div]:bg-blue-600",
    },
    {
      title: "Completed",
      value: 22,
      total: TOTAL,
      change: 16,
      icon: ClipboardCheck,
      badge: "bg-green-100 text-green-600",
      track: "bg-green-100/70",
      bar: "[&>div]:bg-green-600",
    },
  ]