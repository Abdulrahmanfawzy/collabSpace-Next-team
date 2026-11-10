import { File, FileText } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import Link from "next/link"
import { Project } from "../../../../types/project"

interface ProjectsTableProps {
  projects: Project[]
}
const TABLE_HEADERS = [
  "Project Name",
  "Start Date",
  "Deadline",
  "Status",
  "Files",
  "Teams",
  "Priority",
] as const

const PRIORITY_STYLES: Record<Project["priority"], string> = {
  High: "text-red-500",
  Medium: "text-yellow-500",
  Low: "text-green-500",
  Critical: "text-purple-500",
}

const STATUS_STYLES: Record<Project["status"], string> = {
  "Completed": "text-[#2BA52E]",
  "In Progress": "text-[#FA2B75]",
  "On Hold": "text-[#F5A623]",
  "Pending": "text-[#F5A623]",
  "Cancelled": "text-[#F5A623]",
}


const headerClass = "text-lg font-medium text-text-primary"
export function ProjectsTable({ projects }: ProjectsTableProps) {
  return (
    <div className="settings-sidebar-scrollbar mt-6 w-full overflow-x-auto">
      <Table className="min-w-225">

        <TableHeader>
          <TableRow className="border-b border-secondary-100 hover:bg-transparent pt-2 pb-4">
            {TABLE_HEADERS.map((header) => (
              <TableHead key={header} className={headerClass}>
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>


        <TableBody>
          {projects.map((project) => (
            <TableRow
              key={project.id}
              className="h-15 bg-white hover:bg-secondary-50 py-1 my-2"
            >
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="flex size-8 items-center justify-center rounded-full bg-[#F2EAF2]">
                    <FileText size={16} className="text-[#7D2D7E]" />
                  </div>
                  <Link href={`/projects/${project.id}`}
                     className="text-sm font-medium text-text-primary">
                    {project.name}
                  </Link>
                </div>
              </TableCell>

              <TableCell className="text-sm text-text-primary">
                {project.start_date}
              </TableCell>

              <TableCell className="text-sm text-text-primary">
                {project.deadline}
              </TableCell>

              <TableCell>
                <span
                  className={
                    STATUS_STYLES[project.status]
                  }
                >
                  {project.status}
                </span>
              </TableCell>

              <TableCell>
                <div className="flex items-center gap-2 text-sm text-text-primary">
                  <File size={16} className="text-orange-400" />
                  <span className="text-text-primary">{project.files_count} Files</span>
                </div>
              </TableCell>

              <TableCell>
                <div className="flex items-center -space-x-2">
                  {project.teams.map((team) => (
                    <div
                      key={team.id}
                      className="flex size-7 items-center justify-center rounded-full border-2 border-white bg-primary/50 text-[9px] font-semibold"
                    >
                      {team.name.charAt(0).toUpperCase()}
                    </div>
                  ))}
                </div>
              </TableCell>

              <TableCell>
                <div className="flex items-center -space-x-2">
                  <div
                    className={`flex size-7 items-center justify-start  text-sm ${PRIORITY_STYLES[project.priority]}`}
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
