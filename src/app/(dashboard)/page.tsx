import Navbar from "@/components/layout/Navbar/Navbar";
import type { Metadata } from "next";
import TaskStats from "@/features/Dashboard/components/TasksState";
import ProjectOverview from "../../features/Dashboard/components/ProjectPoints";
import { data, ticks } from "@/features/Dashboard/constants/DataState";
import ProjectsAndFiles from "../../features/Dashboard/components/Items";
import { files, members, projects, tasks, teams } from "../../constant/DataFiles";
import { TasksAndTeams } from "../../features/Dashboard/components/TASKS";
import MeetingsAndAskAI from "../../features/Dashboard/components/AI ASK/AIASK";


export const metadata: Metadata = {
  title: "collabSpace",
};

function Dashboard() {
  const people = (n: number) =>
    Array.from({ length: n }, (_, i) => ({ name: `Member ${i + 1}`, avatarUrl: `/avatars/${i + 1}.jpg` }))

  return (
    <div className="flex flex-col gap-6 pt-2 ">
      <TaskStats />
      <div className="grid grid-cols-2 gap-6">
        <ProjectOverview
          data={data}
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
          meetingsHref="/meetings"
          meetings={[
            { id: "1", title: "Design Review", date: "Today", time: "14:00 - 15:00", attendees: people(6) },
            { id: "2", title: "Sprint Planning Meeting", date: "Dec 12", time: "13:00 - 13:30", attendees: people(7) },
            { id: "3", title: "UX Feedback Session", date: "Dec 18", time: "14:00 - 15:00", attendees: people(8) },
          ]}

        />
      </div>
    </div>
  );
}

export default Dashboard;
