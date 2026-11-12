import type { Metadata } from "next";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { hasPermission } from "@/features/auth/permissions/hasPermission";
import TaskStats from "@/features/Dashboard/components/TasksState";
import ProjectOverview from "../../features/Dashboard/components/ProjectPoints";
import ProjectsAndFiles from "../../features/Dashboard/components/Items";
import { TasksAndTeams } from "../../features/Dashboard/components/TASKS";
import MeetingsAndAskAI from "../../features/Dashboard/components/AI ASK";
import getDashboard from "../../api/Dashboard";


export const metadata: Metadata = {
  title: "collabSpace",
};

async function Dashboard() {
  const session = await auth();
  const accessToken = session?.backendToken;
  if (!accessToken) throw new Error("No authenticated backend token was found for the dashboard.");
  if (!hasPermission(session?.user?.roles ?? [], "view_dashboard")) redirect("/forbidden");

  const items = await getDashboard({ accessToken });
  const chartData = items.project_overview.data.map((point) => ({
    x: point.month_number - 1,
    value: point.projects,
  }));
  const chartTicks = items.project_overview.data
    .filter((point) => point.month_number % 2 === 1)
    .map((point) => ({ x: point.month_number - 1, label: point.month }));

  if (session?.user?.roles?.includes("Team Member")) {
    return (
      <div className="flex flex-col gap-6 pt-2">
        <div className="rounded-xl border border-blue-100 bg-blue-50 px-5 py-4 text-sm text-blue-950">
          Your dashboard is focused on your assigned projects and tasks, teams, files, meetings, and AI assistant. Use the navigation to open project chats and your personal reports.
        </div>
        <TaskStats items={items} />
        <ProjectsAndFiles
          projectsHref="/projects"
          filesHref="/files"
          projects={items.active_projects.items}
          files={items.recent_files.items}
        />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4 mb-8">
          <TasksAndTeams tasks={items.tasks.items} teams={items.teams.items} />
          <MeetingsAndAskAI
            meetings={items.upcoming_meetings.items}
            meetingsHref="/meetings"
          />
        </div>
      </div>
    );
  }


  return (
    <div className="flex flex-col gap-6 pt-2 ">
      <TaskStats items={items} />
      <div className="grid min-w-0 grid-cols-1 gap-6 lg:grid-cols-4">
  <div className="min-w-0 lg:col-span-2">
    <ProjectOverview
      data={chartData}
      ticks={chartTicks}
      projects={[
        "All Projects",
        ...items.active_projects.items.map((project) => project.name),
      ]}
      periods={[items.project_overview.period]}
    />
  </div>

  <div className="min-w-0 lg:col-span-2">
    <ProjectsAndFiles
      projectsHref="/projects"
      filesHref="/files"
      projects={items.active_projects.items}
      files={items.recent_files.items}
    />
  </div>
</div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4 mb-8">
        <TasksAndTeams
          tasks={items.tasks.items}
          teams={items.teams.items}
        />
        <MeetingsAndAskAI
          meetings={items.upcoming_meetings.items}
          meetingsHref="/meetings"
        />
      </div>
    </div>
  );
}

export default Dashboard;
