import "server-only";

import type {
  ApiProjectFile,
  ProjectFile,
  ProjectFilesListResult,
  ProjectFilesResponse,
  UploadProjectFileResponse,
  DeleteProjectFileResponse,
} from "@/types/files.types";
import { getBackendToken } from "../auth";

const API_URL = process.env.API;
const FILES_PER_PAGE = 15;
const MAX_FILE_SIZE = 20 * 1024 * 1024;

function mapProjectFile(file: ApiProjectFile): ProjectFile {
  const uploadedAt = new Date(file.created_at);

  return {
    id: file.id,
    projectId: file.project_id,
    name: file.name,
    uploadedBy: file.uploaded_by,
    size: file.file_size_formatted,
    uploadedAt: Number.isNaN(uploadedAt.getTime())
      ? file.created_at
      : uploadedAt.toLocaleDateString(),
    downloadUrl: `/api/files/${file.id}/download?name=${encodeURIComponent(file.name)}`,
  };
}

export async function getProjectFiles(
  projectId: number,
  page = 1
): Promise<ProjectFilesListResult> {
  if (!Number.isInteger(projectId) || projectId <= 0) {
    throw new Error("A valid project ID is required to fetch files.");
  }
  if (!Number.isInteger(page) || page <= 0) {
    throw new Error("A valid page number is required to fetch files.");
  }

  const token =  await getBackendToken();
  if (!token) {
    throw new Error("You must be signed in to access project files.");
  }

  const searchParams = new URLSearchParams({
    project_id: String(projectId),
    per_page: String(FILES_PER_PAGE),
    page: String(page),
  });

  const response = await fetch(
    `${API_URL}/api/v1/files?${searchParams.toString()}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      cache: "no-store",
    }
  );

  const result = (await response.json()) as ProjectFilesResponse;
  if (!response.ok || !result.success) {
    throw new Error(result.message || "Failed to fetch project files");
  }

  return {
    files: result.data.data.map(mapProjectFile),
    pagination: result.data.meta,
  };
}

export async function uploadProjectFile(
  projectId: number,
  uploadData: FormData
): Promise<{ file: ProjectFile; message: string }> {
  if (!Number.isInteger(projectId) || projectId <= 0) {
    throw new Error("A valid project ID is required to upload a file.");
  }
  const file = uploadData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    throw new Error("Choose a file to upload.");
  }
  if (file.size > MAX_FILE_SIZE) {
    throw new Error("Files must be 20 MB or smaller.");
  }

  const token =  await getBackendToken();
  if (!token) {
    throw new Error("You must be signed in to upload project files.");
  }

  const formData = new FormData();
  formData.append("file", file, file.name);
  formData.append("project_id", String(projectId));
  const name = uploadData.get("name");
  if (typeof name === "string" && name.trim()) {
    formData.append("name", name.trim());
  }

  const response = await fetch(`${API_URL}/api/v1/files`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    body: formData,
    cache: "no-store",
  });

  const result = (await response.json()) as UploadProjectFileResponse;
  if (!response.ok || !result.success) {
    throw new Error(result.message || "Failed to upload project file");
  }

  return {
    file: mapProjectFile(result.data),
    message: result.message,
  };
}

export async function deleteProjectFile(
  fileId: number
): Promise<{ message: string }> {
  if (!Number.isInteger(fileId) || fileId <= 0) {
    throw new Error("A valid file ID is required to delete a file.");
  }

  const token =  await getBackendToken();
  if (!token) {
    throw new Error("You must be signed in to delete project files.");
  }

  const response = await fetch(
    `${API_URL}/api/v1/files/${fileId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      cache: "no-store",
    }
  );

  const result = (await response.json()) as DeleteProjectFileResponse;
  if (!response.ok || !result.success) {
    throw new Error(result.message || "Failed to delete project file");
  }

  return { message: result.message };
}

export async function getProjectFileDownload(
  fileId: number,
  token: string
): Promise<Response> {
  if (!Number.isInteger(fileId) || fileId <= 0) {
    throw new Error("A valid file ID is required to download a file.");
  }

  return fetch(`${API_URL}/api/v1/files/${fileId}/download`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "*/*",
    },
    cache: "no-store",
  });
}