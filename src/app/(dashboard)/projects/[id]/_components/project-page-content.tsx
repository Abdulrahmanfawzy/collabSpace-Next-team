"use client";

import OverviewProjectsSkeleton from "@/components/skeletons/overview-projects-skeleton";
import { useGetProjectOverview } from "@/hooks/projects/use-get-project-overview";
import { useGetProjectTeams } from "@/hooks/projects/use-get-project-teams";
import ProjectHeader from "./project-header";
import ProjectTabs from "./project-tabs";
import { useEffect, useState } from "react";
import type { ProjectOverview } from "@/types/project";

interface ProjectPageContentProps {
  projectId: number;
}

export default function ProjectPageContent({
  projectId,
}: ProjectPageContentProps) {
  const [year, setYear] = useState(2025);
  const [period, setPeriod] = useState<"year">("year");
  const [lastProject, setLastProject] = useState<{
    id: number;
    project: ProjectOverview;
  } | null>(null);

  const {
    data: project,
    isLoading,
    isFetching,
    error,
  } = useGetProjectOverview({
    id: projectId,
    period,
    year,
  });
  useEffect(() => {
    if (project) {
      setLastProject({ id: projectId, project });
    }
  }, [project, projectId]);
  const displayedProject =
    project ?? (lastProject?.id === projectId ? lastProject.project : undefined);
  const {
    data: teams = [],
    isPending: areTeamsLoading,
    error: teamsError,
  } = useGetProjectTeams(projectId);


  if (isLoading && !displayedProject) {
    return <OverviewProjectsSkeleton />;
  }

  if (error && !displayedProject) {
    return (
      <p className="py-6 text-sm text-red-600">
        Failed to load project overview: {error.message}
      </p>
    );
  }

  if (!displayedProject) {
    return <p className="py-6 text-sm text-gray-600">Project not found.</p>;
  }

  const completedTasks = teams.reduce(
    (total, team) => total + team.completed_tasks,
    0
  );
  const totalTasks = teams.reduce((total, team) => total + team.total_tasks, 0);
  const progressPercentage =
    areTeamsLoading || teamsError
      ? displayedProject.progress_percentage
      : totalTasks > 0
        ? Math.round((completedTasks / totalTasks) * 1000) / 10
        : teams.length > 0
          ? 0
          : displayedProject.progress_percentage;

  return (
    <main className="min-h-screen bg-bg-light">
      <ProjectHeader project={displayedProject} progressPercentage={progressPercentage} />
      <ProjectTabs 
          project={displayedProject}
          teams={teams}
          areTeamsLoading={areTeamsLoading}
          teamsError={teamsError}
          progressPercentage={progressPercentage}
          completedTasks={completedTasks}
          totalTasks={totalTasks}
          year={year}
          onYearChange={setYear}
          isChartLoading={isFetching}
          chartError={error}
        />
    </main>
  );
}
