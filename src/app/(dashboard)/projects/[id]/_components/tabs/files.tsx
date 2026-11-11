
"use client";

import { useRef, useState } from "react";
import { Upload } from "lucide-react";
import FileCard from "../file-card";
import FilesSkeleton from "@/components/skeletons/files-tab-skeleton";
import { CommonPagination } from "@/components/common/common-pagination";
import { useGetProjectFiles } from "@/hooks/files/use-get-project-files";

interface FilesTabProps {
  projectId: number;
  isLoading?: boolean;
  onUpload?: (files: FileList) => void;
}

const FilesTab = ({
  projectId,
  isLoading = false,
  onUpload,
}: FilesTabProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [page, setPage] = useState(1);
  const { data, isPending, error } = useGetProjectFiles(projectId, page);
  const files = data?.files ?? [];
  const recentFiles = files.slice(0, 3);
  if (isLoading || isPending) {
    return <FilesSkeleton />;
  }

  if (error) {
    return (
      <p role="alert" className="py-6 text-sm text-destructive">
        Failed to load project files: {error.message}
      </p>
    );
  }

  return (
    <div className="space-y-8">

      {/* Recent Files */}
      <section className="space-y-4">
        <h2 className="text-base font-semibold text-gray-900">
          Recent Files
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {recentFiles.map((file) => (
            <FileCard key={file.id} file={file} />
          ))}
        </div>
      </section>

      {/* All Files */}
      <section className="space-y-4">

        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-gray-900">
            All Files
          </h2>

          <div>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              className="hidden"
              onChange={(e) => {
                if (e.target.files) {
                  onUpload?.(e.target.files);
                  e.target.value = "";
                }
              }}
            />

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1 rounded-full bg-blue-600 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-blue-700"
            >
              Upload File
              <Upload size={13} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
          {files.map((file) => (
            <FileCard key={file.id} file={file} />
          ))}
        </div>

        {files.length === 0 && (
          <p className="py-8 text-center text-sm text-gray-500">
            No files uploaded yet.
          </p>
        )}

        {data && (
          <CommonPagination
            currentPage={data.pagination.current_page}
            lastPage={data.pagination.last_page}
            onPageChange={setPage}
          />
        )}
      </section>
    </div>
  );
};

export default FilesTab;
