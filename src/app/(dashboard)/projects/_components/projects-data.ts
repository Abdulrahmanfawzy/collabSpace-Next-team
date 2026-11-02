export interface Project {
  id: number
  name: string
  startDate: string
  deadline: string
  status: "In Progress" | "Done"
  files: number
  teams: string[]
  priority: "High" | "Medium" | "Low"
}

export const projects: Project[] = [
  {
    id: 1,
    name: "Alpha",
    startDate: "2025-12-12",
    deadline: "2025-12-14",
    status: "In Progress",
    files: 22,
    teams: ["AH", "MK", "SA"],
    priority: "High",
  },
  {
    id: 2,
    name: "SepetGo",
    startDate: "2025-12-12",
    deadline: "2025-12-14",
    status: "Done",
    files: 22,
    teams: ["AH", "MK", "SA"],
    priority: "Medium",
  },
]
