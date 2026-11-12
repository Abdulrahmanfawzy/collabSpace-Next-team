"use server";

import {
  deleteProjectFile,
  getProjectFiles,
  uploadProjectFile,
} from "@/api/files.api";

export async function getProjectFilesAction(projectId: number, page: number) {
  return getProjectFiles(projectId, page);
}

export async function uploadProjectFileAction(
  projectId: number,
  formData: FormData
) {
  return uploadProjectFile(projectId, formData);
}

export async function deleteProjectFileAction(fileId: number) {
  return deleteProjectFile(fileId);
}