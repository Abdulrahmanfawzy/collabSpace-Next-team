import { ProjectsHeader } from "./_components/projects-header"
import ProjectsContent from "./_components/projects-content"

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-bg-light py-10">
      <ProjectsHeader />
      <ProjectsContent />
    </div>
  )
}
