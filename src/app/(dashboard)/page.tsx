import Navbar from "@/components/layout/Navbar/Navbar";
import type { Metadata } from "next";
import TaskStats from "@/features/Dashboard/components/TasksState";

export const metadata: Metadata = {
  title: "collabSpace",
};

function Dashboard() {
  return (
    <>
    <TaskStats/>
    </>
  );
}

export default Dashboard;
