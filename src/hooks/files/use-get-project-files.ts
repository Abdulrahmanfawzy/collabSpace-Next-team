"use client";

import { useQuery } from "@tanstack/react-query";
import { getProjectFilesAction } from "@/actions/files.actions";

export function useGetProjectFiles(projectId: number, page: number) {
  return useQuery({
    queryKey: ["project-files", projectId, page],
    queryFn: () => getProjectFilesAction(projectId, page),
    enabled: Number.isInteger(projectId) && projectId > 0,
  });
}
