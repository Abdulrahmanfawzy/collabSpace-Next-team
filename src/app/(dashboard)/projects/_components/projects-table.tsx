import { File, FileText } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { Project } from "./projects-data"

interface ProjectsTableProps {
  projects: Project[]
}

function getPriorityClass(priority: Project["priority"]) {
  switch (priority) {
    case "High":
      return "text-red-500"
    case "Medium":
      return "text-yellow-500"
    case "Low":
      return "text-green-500"
  }
}

export function ProjectsTable({ projects }: ProjectsTableProps) {
  return (
    <div className="mt-6 w-full overflow-x-auto">
      <Table className="min-w-225">
        <TableHeader>
          <TableRow className="border-b border-secondary-100 hover:bg-transparent">
            <TableHead className="font-medium text-secondary-700">
              Project Name
            </TableHead>
            <TableHead className="font-medium text-secondary-700">
              Start Date
            </TableHead>
            <TableHead className="font-medium text-secondary-700">
              Deadline
            </TableHead>
            <TableHead className="font-medium text-secondary-700">
              Status
            </TableHead>
            <TableHead className="font-medium text-secondary-700">
              Files
            </TableHead>
            <TableHead className="font-medium text-secondary-700">
              Teams
            </TableHead>
            <TableHead className="font-medium text-secondary-700">
              Priority
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <TableRow
              key={project.id}
              className="h-15 bg-white hover:bg-secondary-50 dark:bg-secondary-500 dark:hover:bg-secondary-400"
            >
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="flex size-8 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                    <FileText size={16} />
                  </div>
                  <span className="text-sm font-medium">{project.name}</span>
                </div>
              </TableCell>
              <TableCell className="text-sm text-secondary-700">
                {project.startDate}
              </TableCell>
              <TableCell className="text-sm text-secondary-700">
                {project.deadline}
              </TableCell>
              <TableCell>
                <span
                  className={
                    project.status === "Done"
                      ? "text-xs text-green-500"
                      : "text-xs text-red-500"
                  }
                >
                  {project.status}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2 text-sm">
                  <File size={16} className="text-orange-400" />
                  <span>{project.files} Files</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center -space-x-2">
                  {project.teams.map((team) => (
                    <div
                      key={team}
                      className="flex size-7 items-center justify-center rounded-full border-2 border-white bg-secondary-200 text-[9px] font-semibold"
                    >
                      {team}
                    </div>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center -space-x-2">
                  <div
                    className={`flex size-7 items-center justify-center rounded-full border-2 border-white text-[9px] font-semibold ${getPriorityClass(project.priority)}`}
                  >
                    {project.priority}
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
