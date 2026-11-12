
import { notFound, redirect } from "next/navigation"
import { auth } from "@/auth"
import { hasPermission } from "@/features/permissions/hasPermission"
import { ProjectPermissionsProvider } from "../_components/project-permissions-provider"
import ProjectPageContent from "./_components/project-page-content"


interface ProjectDetailsPageProps {
  params: Promise<{ id: string }>
}

const ProjectDetailsPage = async ({ params }: ProjectDetailsPageProps) => {
  const session = await auth()
  const roles = session?.user?.roles ?? []

  if (!hasPermission(roles, "view_projects")) {
    redirect("/")
  }

  const { id } = await params
  const projectId = Number(id)

  if (!Number.isInteger(projectId) || projectId <= 0) {
    notFound()
  }

  return (
    <ProjectPermissionsProvider roles={roles}>
      <ProjectPageContent projectId={projectId} />
    </ProjectPermissionsProvider>
  )
}

export default ProjectDetailsPage