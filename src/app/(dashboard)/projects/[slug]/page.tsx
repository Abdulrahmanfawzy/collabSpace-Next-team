import ProjectHeader from "./_components/project-header"
import { notFound } from "next/navigation"
import { projects } from "../_components/projects-data"
import ProjectTabs from "./_components/project-tabs"

interface ProjectDetailsPageProps {
  params: Promise<{ slug: string }>
}

const ProjectDetailsPage = async ({ params }: ProjectDetailsPageProps) => {
  const { slug } = await params
  const project = projects.find((project) => project.slug === slug)

  if (!project) {
    notFound()
  }

  return (
     <main className="app-container bg-bg-light min-h-screen mt-15">
      <ProjectHeader projectName={project.name} />
       <ProjectTabs />

    </main>
  )
}

export default ProjectDetailsPage