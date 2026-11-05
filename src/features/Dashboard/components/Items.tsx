import { ActiveProject, RecentFile } from "../types/typesDashboard"
import { ActiveProjects } from "./ActiveProjects"
import RecentFiles from "./RecentFiles"



export type ProjectsAndFilesProps = {
  projects: ActiveProject[]
  files: RecentFile[]
  projectsHref?: string
  filesHref?: string
}
export function ProjectsAndFiles({
  projects,
  files,
  projectsHref,
  filesHref,
}: ProjectsAndFilesProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <ActiveProjects projects={projects} viewAllHref={projectsHref} />
      <RecentFiles files={files} viewAllHref={filesHref} />
    </div>
  )
}

export default ProjectsAndFiles