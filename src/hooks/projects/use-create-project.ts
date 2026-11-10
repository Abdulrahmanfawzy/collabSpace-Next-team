
"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { createProjectAction } from "../../actions/projects.action";

export function useCreateProject() {
  return useMutation({
    mutationFn: createProjectAction,
    onSuccess: (response) => {
      toast.success(response.message);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create project");
    },
  });
}
