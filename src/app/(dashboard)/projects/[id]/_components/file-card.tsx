
import { FileText, Download } from "lucide-react";
import type { ProjectFile } from "@/types/files.types";

interface FileCardProps {
  file: ProjectFile;
}

const FileCard = ({ file }: FileCardProps) => {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-gray-300 bg-white px-3 py-2.5 transition-shadow hover:shadow-sm">
      {/* File Information */}
      <div className="flex min-w-0 items-center gap-3">
        {/* PDF Icon */}
        <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-red-50">
          <FileText
            size={22}
            className="text-red-500"
            strokeWidth={1.8}
          />
        </div>

        <div className="min-w-0">
          <h3 className="truncate text-xs font-medium text-gray-900">
            {file.name}
          </h3>

          <p className="truncate text-[10px] text-gray-600">
            By {file.uploadedBy}
          </p>

          <p className="text-[10px] text-gray-600">
            {file.size} · {file.uploadedAt}
          </p>
        </div>
      </div>

      {/* Download */}
      <a
        href={file.downloadUrl}
        download
        aria-label={`Download ${file.name}`}
        className="shrink-0 text-gray-700 transition-colors hover:text-blue-600"
      >
        <Download size={15} />
      </a>
    </div>
  );
};

export default FileCard;
