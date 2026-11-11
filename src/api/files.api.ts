import "server-only";

import type {
  ApiProjectFile,
  ProjectFile,
  ProjectFilesListResult,
  ProjectFilesResponse,
} from "@/types/files.types";

const API_URL = process.env.API;
const FILES_PER_PAGE = 15;

function mapProjectFile(file: ApiProjectFile): ProjectFile {
  const uploadedAt = new Date(file.created_at);

  return {
    id: file.id,
    name: file.name,
    uploadedBy: file.uploaded_by,
    size: file.file_size_formatted,
    uploadedAt: Number.isNaN(uploadedAt.getTime())
      ? file.created_at
      : uploadedAt.toLocaleDateString(),
    downloadUrl: file.url,
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

  const token = process.env.token;
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