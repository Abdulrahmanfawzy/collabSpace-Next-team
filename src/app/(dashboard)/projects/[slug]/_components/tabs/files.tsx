
"use client";

import { useRef } from "react";
import { Upload } from "lucide-react";
import FileCard, { ProjectFile } from "../file-card";
import FilesSkeleton from "@/components/skeletons/files-tab-skeleton";




interface FilesTabProps {
  files: ProjectFile[];
  isLoading: boolean;
  onUpload?: (files: FileList) => void;
}

const FilesTab = ({
  files,
  isLoading,
  onUpload,
}: FilesTabProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const recentFiles = files.slice(0, 3);
  if (isLoading) {
    return (<FilesSkeleton/>);
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

      </section>
    </div>
  );
};

export default FilesTab;
