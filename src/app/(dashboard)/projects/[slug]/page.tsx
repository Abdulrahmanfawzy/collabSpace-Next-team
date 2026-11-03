import ProjectHeader from "./_components/project-header"
import { notFound } from "next/navigation"
import { projects } from "../_components/projects-data"

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
     <main className="app-container mt-15">
      <ProjectHeader projectName={project.name} />

    </main>
  )
}

export default ProjectDetailsPage