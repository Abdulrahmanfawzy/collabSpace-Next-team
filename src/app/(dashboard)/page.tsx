import Navbar from "@/components/layout/Navbar/Navbar";
import type { Metadata } from "next";
import TaskStats from "@/features/Dashboard/components/TasksState";
import ProjectOverview from "../../features/Dashboard/components/ProjectPoints";
import { data, ticks } from "@/features/Dashboard/constants/DataState";
import ProjectsAndFiles from "../../features/Dashboard/components/Items";
import { files, meetings, members, projects, tasks, teams } from "../../constant/DataFiles";
import { TasksAndTeams } from "../../features/Dashboard/components/TASKS";
import MeetingsAndAskAI from "../../features/Dashboard/components/AI ASK";
import getDashboard from "../../api/Dashboard";


export const metadata: Metadata = {
  title: "collabSpace",
};

async function Dashboard() {
  const items = await getDashboard()
  const people = (n: number) =>
    Array.from({ length: n }, (_, i) => ({ name: `Member ${i + 1}`, avatarUrl: `/avatars/${i + 1}.jpg` }))
  console.log(items, "from Server Next js ");
  //Mapping on data extract all data from api chart overview 
  const DataChart = items.project_overview.data.map((chrt)=>(
    {
      month:chrt.month,
      projects:chrt.projects,
      completedTasks:chrt.completed_tasks
    }
  ))
  

  return (
    <div className="flex flex-col gap-6 pt-2 ">
      <TaskStats items={items} />
      <div className="grid min-w-0 grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
        <ProjectOverview
          data={DataChart}
          ticks={ticks}
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
