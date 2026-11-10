import { ClipboardCheck, ClipboardClock, ClipboardList } from "lucide-react";
import { DashboardData } from "../types/typesDashboard";
const TOTAL = 94
export const getStates = (data: DashboardData) => [{
  title: "Pending ",
  value: data.overview.tasks.pending,
  total: data.overview.tasks.total,
  change: 9,
  icon: ClipboardClock,
  badge: "bg-amber-100 text-amber-500",
  track: "bg-amber-100/70",
  bar: "[&>div]:bg-amber-500",
},
{
  title: "In Progress",
  value: data.overview.tasks.in_progress,
  total: data.overview.tasks.total,
  change: 12,
  icon: ClipboardList,
  badge: "bg-blue-100 text-blue-600",
  track: "bg-blue-100/70",
  bar: "[&>div]:bg-blue-600",
},
{
  title: "Completed",
  value: data.overview.tasks.completed,
  total: data.overview.tasks.total,
  change: 16,
  icon: ClipboardCheck,
  badge: "bg-green-100 text-green-600",
  track: "bg-green-100/70",
  bar: "[&>div]:bg-green-600",
},
]
export const data = [
  { x: 0, value: 10300 },
  { x: 0.875, value: 13900 },
  { x: 1.357, value: 12100 },
  { x: 1.813, value: 8500 },
  { x: 2.366, value: 18000 },
  { x: 2.527, value: 20000 },
  { x: 2.75, value: 17500 },
  { x: 2.902, value: 15900 },
  { x: 3.063, value: 15500 },
  { x: 3.42, value: 8300 },
  { x: 3.866, value: 14000 },
  { x: 4.134, value: 12500 },
  { x: 4.402, value: 11800 },
  { x: 4.848, value: 12500 },
  { x: 5.295, value: 19500 },
]

export const ticks = [
  { x: 0.37, label: "Jan" },
  { x: 1.36, label: "Feb" },
  { x: 2.37, label: "Mar" },
  { x: 3.37, label: "Apr" },
  { x: 4.37, label: "May" },
  { x: 5.3, label: "Jun" },
]
