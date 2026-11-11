"use server";

import { getProjectFiles } from "@/api/files.api";

export async function getProjectFilesAction(projectId: number, page: number) {
  return getProjectFiles(projectId, page);
}