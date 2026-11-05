import Navbar from "@/components/layout/Navbar/Navbar";
import type { Metadata } from "next";
import TaskStats from "@/features/Dashboard/components/TasksState";
import ProjectOverview from "../../features/Dashboard/components/ProjectPoints";
import { data, ticks } from "@/features/Dashboard/constants/DataState";

export const metadata: Metadata = {
  title: "collabSpace",
};

function Dashboard() {

  return (
    <>
      <TaskStats />
      <ProjectOverview
        data={data}
        ticks={ticks}
        projects={["All Projects", "Project A", "Project B"]}
        periods={["This Year", "Last Year"]}
   
      />
    </>
  );
}

export default Dashboard;
