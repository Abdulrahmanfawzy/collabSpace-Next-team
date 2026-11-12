import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { hasPermission } from "@/features/permissions/hasPermission";
import TasksPageContent from "./_components/tasks-page-content";

const TasksPage = async () => {
  const session = await auth();
  const roles = session?.user?.roles ?? [];

  if (!hasPermission(roles, "view_tasks")) {
    redirect("/");
  }

  return <TasksPageContent roles={roles} />;
};

export default TasksPage;