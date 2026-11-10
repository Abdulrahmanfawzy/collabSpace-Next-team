
"use client";

import { useState } from "react";
import { ProjectsTable } from "./projects-table";
import { ProjectFilters } from "./project-filters";
import { CommonPagination } from "@/components/common/common-pagination";
import { useGetProjects } from "@/hooks/projects/use-get-projects";
import type { ProjectFiltersParams } from "@/types/project";

export default function ProjectsContent() {
  const [filters, setFilters] = useState<ProjectFiltersParams>({
    page: 1,
    per_page: 15,
    sort: "newest",
  });

  const {
    data,
    isPending,
    isError,
    error,
  } = useGetProjects(filters);

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({
      ...prev,
      page,
    }));
  };

  if (isPending) {
    return <p>Loading projects...</p>;
  }

  if (isError) {
    return <p>{error.message}</p>;
  }

  const projects = data.data.data;
  const pagination = data.data.meta;

  return (
    <div>
      <ProjectFilters />

      <ProjectsTable projects={projects} />

      <CommonPagination
        currentPage={pagination.current_page}
        lastPage={pagination.last_page}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
// meta: {
//   current_page: 1,
//   last_page: 2,
//   per_page: 15,
//   total: 19
// }