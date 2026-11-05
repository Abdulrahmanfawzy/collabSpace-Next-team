import Navbar from "@/components/layout/Navbar/Navbar";
import type { Metadata } from "next";
import TaskStats from "@/features/Dashboard/components/TasksState";
import ProjectOverview from "../../features/Dashboard/components/ProjectPoints";
import { data, ticks } from "@/features/Dashboard/constants/DataState";
import ProjectsAndFiles from "../../features/Dashboard/components/Items";
import { files, projects } from "../../constant/DataFiles";

export const metadata: Metadata = {
  title: "collabSpace",
};

function Dashboard() {

  return (
    <div className="flex flex-col gap-10">
      <TaskStats />
      <div className="grid grid-cols-2 gap-2">
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
    </div>
  );
}

export default Dashboard;
