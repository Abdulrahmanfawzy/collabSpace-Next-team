import Navbar from "@/components/layout/Navbar/Navbar";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { AUTH_TOKEN_COOKIE } from "@/features/auth/constants/auth.constants";
import TaskStats from "@/features/Dashboard/components/TasksState";
import ProjectOverview from "../../features/Dashboard/components/ProjectPoints";
import ProjectsAndFiles from "../../features/Dashboard/components/Items";
import { files, meetings, members, projects, tasks, teams } from "../../constant/DataFiles";
import { TasksAndTeams } from "../../features/Dashboard/components/TASKS";
import MeetingsAndAskAI from "../../features/Dashboard/components/AI ASK";
import getDashboard from "../../api/Dashboard";


export const metadata: Metadata = {
  title: "collabSpace",
};

async function Dashboard() {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_TOKEN_COOKIE)?.value;
  if (!token) throw new Error("No authenticated session was found for the dashboard.");

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
          projects={["All Projects", "Project A", "Project B"]}
          periods={["This Year", "Last Year"]}

        />
        <ProjectsAndFiles
          projectsHref="/projects"
          filesHref="/files"
          projects={projects}
          files={files}
        />
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        <TasksAndTeams
          tasks={tasks}
          teams={teams}
          members={members}
        />
        <MeetingsAndAskAI
          meetings={meetings}
          meetingsHref="/meetings"
        />
      </div>
    </div>
  );
}

export default Dashboard;
