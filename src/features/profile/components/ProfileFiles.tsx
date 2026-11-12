
"use client";

import { useRouter } from "next/navigation";

import { PDFGrid } from "@/components/common/PdfGrid";
import { CommonPagination } from "@/components/common/common-pagination";

import type { PDFFile } from "@/features/profile/types/profile.types";

interface ProfileFilesProps {
  files: PDFFile[];
  currentPage: number;
  lastPage: number;
  errorMessage?: string;
}

export function ProfileFiles({
  files,
  currentPage,
  lastPage,
  errorMessage,
}: ProfileFilesProps) {
  const router = useRouter();

  function handlePageChange(page: number) {
    router.push(`/profile/files?page=${page}`, {
      scroll: false,
    });
  }

  if (errorMessage) {
    return (
      <section className="rounded-xl border border-border bg-white p-6">
        <p role="alert" className="text-sm text-destructive">
          {errorMessage}
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <PDFGrid
        files={files}
        emptyMessage="No uploaded files found."
      />

      <CommonPagination
        currentPage={currentPage}
        lastPage={lastPage}
        onPageChange={handlePageChange}
      />
    </section>
  );
}
