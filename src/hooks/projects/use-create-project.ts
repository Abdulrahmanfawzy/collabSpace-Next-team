
"use client";

import { useMutation } from "@tanstack/react-query";
import { createProjectAction } from "../../actions/projects.action";


export function useCreateProject() {
  return useMutation({
    mutationFn: createProjectAction,
  });
}
