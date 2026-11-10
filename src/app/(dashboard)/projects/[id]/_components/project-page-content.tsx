"use client";

import OverviewProjectsSkeleton from "@/components/skeletons/overview-projects-skeleton";
import { useGetProjectOverview } from "@/hooks/projects/use-get-project-overview";
import ProjectHeader from "./project-header";
import ProjectTabs from "./project-tabs";

interface ProjectPageContentProps {
  projectId: number;
}

export default function ProjectPageContent({
  projectId,
}: ProjectPageContentProps) {
  const { data: project, isPending, isError, error } =
    useGetProjectOverview(projectId);

  if (isPending) {
    return <OverviewProjectsSkeleton />;
  }

  if (isError) {
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
      <ProjectTabs project={project} />
    </main>
  );
}
