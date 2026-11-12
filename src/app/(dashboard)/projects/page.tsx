import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { hasPermission } from "@/features/permissions/hasPermission"
import { ProjectPermissionsProvider } from "./_components/project-permissions-provider"
import { ProjectsHeader } from "./_components/projects-header"
import ProjectsContent from "./_components/projects-content"

export default async function ProjectsPage() {
  const session = await auth()
  const roles = session?.user?.roles ?? [];

  console.log("Roles:", roles);

  console.log(
    "Permissions:",
    hasPermission(roles, "view_projects")
  );
  if (!hasPermission(roles, "view_projects")) {
    redirect("/")
  }

  return (
    <ProjectPermissionsProvider roles={roles}>
      <div className="min-h-screen bg-bg-light py-10">
        <ProjectsHeader />
        <ProjectsContent />
      </div>
    </ProjectPermissionsProvider>
  )
}
