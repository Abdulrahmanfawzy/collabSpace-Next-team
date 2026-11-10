import ProjectHeader from "./_components/project-header"
import { notFound } from "next/navigation"
import { projects } from "../_components/projects-data"
import ProjectTabs from "./_components/project-tabs"

interface ProjectDetailsPageProps {
  params: Promise<{ id: string }>
}

const ProjectDetailsPage = async ({ params }: ProjectDetailsPageProps) => {
  const { id } = await params
  const project = projects.find((project) => project.id === Number(id))

  if (!project) {
    notFound()
  }

  return (
     <main className=" bg-bg-light min-h-screen ">
      <ProjectHeader projectName={project.name} />
       <ProjectTabs />
    </main>
  )
}

export default ProjectDetailsPage