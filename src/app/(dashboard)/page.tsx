import type { Metadata } from "next";
import { headers } from "next/headers";
import { getToken } from "next-auth/jwt";
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
  const jwt = await getToken();
  const token = jwt?.backendToken;
  if (!token) throw new Error("No authenticated backend token was found for the dashboard.");


  const items = await getDashboard(token);
  const chartData = items.project_overview.data.map((point) => ({
    x: point.month_number - 1,
    value: point.projects,
  }));
  const chartTicks = items.project_overview.data
    .filter((point) => point.month_number % 2 === 1)
    .map((point) => ({ x: point.month_number - 1, label: point.month }));


  return (
    <div className="flex flex-col gap-6 pt-2 ">
      <TaskStats items={items} />
      <div className="grid min-w-0 grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
        <ProjectOverview
          data={chartData}
          ticks={chartTicks}
          projects={["All Projects", ...items.active_projects.items.map((project) => project.name)]}
          periods={[items.project_overview.period]}

        />
        <ProjectsAndFiles
          projectsHref="/projects"
          filesHref="/files"
          projects={items.active_projects.items}
          files={items.recent_files.items}
        />
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
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
