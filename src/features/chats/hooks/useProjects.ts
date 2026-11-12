"use client";

import { useQuery } from "@tanstack/react-query";
import { projectService } from "@/features/chats/services/chat.service";

export function useProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: () => projectService.getProjects(),
    staleTime: 60 * 1000,
  });
}