"use client";

import OverviewProjectsSkeleton from "@/components/skeletons/overview-projects-skeleton";
import { useGetProjectOverview } from "@/hooks/projects/use-get-project-overview";
import { useGetProjectTeams } from "@/hooks/projects/use-get-project-teams";
import ProjectHeader from "./project-header";
import ProjectTabs from "./project-tabs";
import { useState } from "react";

interface ProjectPageContentProps {
  projectId: number;
}

export default function ProjectPageContent({
  projectId,
}: ProjectPageContentProps) {
  const [year, setYear] = useState(2025);
  const [period, setPeriod] = useState<"year">("year");

  const { data: project, isLoading, error } = useGetProjectOverview({
    id: projectId,
    period,
    year,
  });
  const {
    data: teams = [],
    isPending: areTeamsLoading,
    error: teamsError,
  } = useGetProjectTeams(projectId);


  if (isLoading) {
    return <OverviewProjectsSkeleton />;
  }

  if (error) {
    return (
      <p className="py-6 text-sm text-red-600">
        Failed to load project overview: {error.message}
      </p>
    );
  }

  if (!project) {
    return <p className="py-6 text-sm text-gray-600">Project not found.</p>;
  }

  const completedTasks = teams.reduce(
    (total, team) => total + team.completed_tasks,
    0
  );
  const totalTasks = teams.reduce((total, team) => total + team.total_tasks, 0);
  const progressPercentage =
    areTeamsLoading || teamsError
      ? project.progress_percentage
      : totalTasks > 0
        ? Math.round((completedTasks / totalTasks) * 1000) / 10
        : teams.length > 0
          ? 0
          : project.progress_percentage;

  return (
    <main className="min-h-screen bg-bg-light">
      <ProjectHeader project={project} progressPercentage={progressPercentage} />
      <ProjectTabs 
          project={project}
          teams={teams}
          areTeamsLoading={areTeamsLoading}
          teamsError={teamsError}
          progressPercentage={progressPercentage}
          completedTasks={completedTasks}
          totalTasks={totalTasks}
          year={year}
          onYearChange={setYear} />
    </main>
  );
}
