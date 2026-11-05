import { ProjectFilters } from "./_components/project-filters"
import { ProjectsHeader } from "./_components/projects-header"
import { ProjectsTable } from "./_components/projects-table"
import { projects } from "./_components/projects-data"

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-bg-light py-10">
      <ProjectsHeader />
      <ProjectFilters />
      <ProjectsTable projects={projects} />
    </div>
  )
}
