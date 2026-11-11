
"use client";

import { useEffect, useState } from "react";
import { ProjectsTable } from "./projects-table";
import { ProjectFilters } from "./project-filters";
import { CommonPagination } from "@/components/common/common-pagination";
import { ProjectsPageSkeleton } from "@/components/skeletons/projects-page-skeleton";
import { useGetProjects } from "@/hooks/projects/use-get-projects";
import type { ProjectFiltersParams } from "@/types/project";
import { Button } from "@/components/ui/button";
import { FolderSearch } from "lucide-react";

export default function ProjectsContent() {
  const [searchInput, setSearchInput] = useState("");
  const [filters, setFilters] = useState<ProjectFiltersParams>({
    page: 1,
    per_page: 15,
    sort: "newest",
  });

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setFilters((prev) => ({
        ...prev,
        search:
          searchInput.trim() === "" ? undefined : searchInput.trim(),
        page: 1,
      }));
    }, 350);

    return () => window.clearTimeout(timeoutId);
  }, [searchInput]);

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
  
    const handleFilterChange = (
    key: "search" | "status" | "priority",
    value: string
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value === "all" || value.trim() === "" ? undefined : value,
      page: 1,
    }));
  };

  const handleClearFilters = () => {
    setSearchInput("");
    setFilters((prev) => ({
      ...prev,
      search: undefined,
      status: undefined,
      priority: undefined,
      page: 1,
    }));
  };

  if (isPending) {
    return <ProjectsPageSkeleton />;
  }

  if (isError) {
    return (
      <p role="alert" className="mt-6 text-sm text-destructive">
        {error.message}
      </p>
    );
  }

  const projects = data.data.data ?? [];
  const pagination = data.data.meta;
  const normalizedSearch = filters.search?.trim().toLocaleLowerCase();
  const visibleProjects = projects.filter((project) => {
    const matchesSearch =
      !normalizedSearch ||
      [
        project.name,
        project.description,
        project.status,
        project.priority,
        ...project.teams.map((team) => team.name),
      ]
        .join(" ")
        .toLocaleLowerCase()
        .includes(normalizedSearch);
    const matchesStatus =
      !filters.status ||
      project.status.toLocaleLowerCase() === filters.status.toLocaleLowerCase();
    const matchesPriority =
      !filters.priority ||
      project.priority.toLocaleLowerCase() ===
        filters.priority.toLocaleLowerCase();

    return matchesSearch && matchesStatus && matchesPriority;
  });
  const hasProjects = visibleProjects.length > 0;
  const hasActiveFilters = Boolean(
    filters.search || filters.status || filters.priority
  );

  return (
    <div>
      <ProjectFilters
        search={searchInput}
        status={filters.status ?? "all"}
        priority={filters.priority ?? "all"}
        onSearchChange={setSearchInput}
        onStatusChange={(value) => handleFilterChange("status", value)}
        onPriorityChange={(value) => handleFilterChange("priority", value)}
      />

      {hasProjects ? (
        <>
          <ProjectsTable projects={visibleProjects} />

          <CommonPagination
            currentPage={pagination.current_page}
            lastPage={pagination.last_page}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <section
          aria-live="polite"
          className="mt-6 flex min-h-64 flex-col items-center justify-center rounded-xl border border-dashed border-bg-label bg-white px-6 py-10 text-center"
        >
          <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <FolderSearch aria-hidden="true" size={22} />
          </div>
          <h2 className="text-base font-semibold text-text-primary">
            {hasActiveFilters ? "No matching projects" : "No projects yet"}
          </h2>
          <p className="mt-2 max-w-sm text-sm text-text-secondary">
            {hasActiveFilters
              ? "We couldn't find any projects matching your filters. Try changing your search or filter selections."
              : "There are no projects to show yet. Create a project to get started."}
          </p>
          {hasActiveFilters && (
            <Button
              type="button"
              variant="outline"
              className="mt-5 rounded-full"
              onClick={handleClearFilters}
            >
              Clear filters
            </Button>
          )}
        </section>
      )}
    </div>
  );
}
// meta: {
//   current_page: 1,
//   last_page: 2,
//   per_page: 15,
//   total: 19
// }