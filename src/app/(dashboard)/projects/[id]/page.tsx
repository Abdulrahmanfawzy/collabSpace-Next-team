
import { notFound } from "next/navigation"
import ProjectPageContent from "./_components/project-page-content"


interface ProjectDetailsPageProps {
  params: Promise<{ id: string }>
}

const ProjectDetailsPage = async ({ params }: ProjectDetailsPageProps) => {
  const { id } = await params
  const projectId = Number(id)

  if (!Number.isInteger(projectId) || projectId <= 0) {
    notFound()
  }

  return (
    <ProjectPageContent projectId={projectId} />
  )
}

export default ProjectDetailsPage