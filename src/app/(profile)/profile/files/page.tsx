
import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { getBackendToken } from "@/auth";
import { ProfileFiles } from "@/features/profile/components/ProfileFiles";
import { ProfileApiError, profileService } from "@/features/profile/services/profile.service";
import type { PDFFile } from "@/features/profile/types/profile.types";

export const metadata: Metadata = {
  title: "Profile Files",
};

interface ProfileFilesPageProps {
  searchParams: Promise<{
    page?: string;
  }>;
}

export default async function ProfileFilesPage({
  searchParams,
}: ProfileFilesPageProps) {
  const token = await getBackendToken();

  if (!token) {
    redirect("/login");
  }

  const params = await searchParams;
  const requestedPage = Number(params.page ?? 1);

  const page =
    Number.isInteger(requestedPage) && requestedPage > 0
      ? requestedPage
      : 1;

  try {
    const response = await profileService.getFiles(token, page);

    const files: PDFFile[] = response.data.map((file) => ({
      id: file.id,
      name: file.name,
      author: file.uploaded_by || file.uploader.name,
      date: file.created_at,
      size:
        file.file_size_formatted ||
        `${file.file_size} bytes`,
      url: `/api/profile/files/${file.id}/download`,
    }));

    return (
      <ProfileFiles
        files={files}
        currentPage={response.meta.current_page}
        lastPage={response.meta.last_page}
      />
    );
  } catch (error) {
    if (error instanceof ProfileApiError && error.status === 401) {
      redirect("/login");
    }

    return (
      <ProfileFiles
        files={[]}
        currentPage={1}
        lastPage={1}
        errorMessage={
          error instanceof Error
            ? error.message
            : "Unable to retrieve your files."
        }
      />
    );
  }
}
