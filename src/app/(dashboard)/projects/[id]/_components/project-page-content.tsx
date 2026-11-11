"use client";

import OverviewProjectsSkeleton from "@/components/skeletons/overview-projects-skeleton";
import { useGetProjectOverview } from "@/hooks/projects/use-get-project-overview";
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

  return (
    <main className="min-h-screen bg-bg-light">
      <ProjectHeader project={project} />
      <ProjectTabs 
          project={project}
          year={year}
          onYearChange={setYear} />
    </main>
  );
}
