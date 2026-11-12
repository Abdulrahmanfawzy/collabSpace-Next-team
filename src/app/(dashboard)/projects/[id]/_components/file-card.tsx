
import { useState } from "react";
import { FileText, Download, LoaderCircle, Trash2 } from "lucide-react";
import type { ProjectFile } from "@/types/files.types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDeleteProjectFile } from "@/hooks/files/use-delete-project-file";

interface FileCardProps {
  file: ProjectFile;
}

const FileCard = ({ file }: FileCardProps) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const { mutate: deleteFile, isPending } = useDeleteProjectFile();

  const handleDelete = () => {
    deleteFile(
      { fileId: file.id, projectId: file.projectId },
      { onSuccess: () => setDeleteDialogOpen(false) }
    );
  };

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
      <div className="flex shrink-0 items-center gap-2">
        <a
          href={file.downloadUrl}
          aria-label={`Download ${file.name}`}
          className="text-gray-700 transition-colors hover:text-blue-600"
        >
          <Download size={15} />
        </a>
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          aria-label={`Delete ${file.name}`}
          title="Delete file"
          className="text-red-600 hover:bg-red-50 hover:text-red-700"
          onClick={() => setDeleteDialogOpen(true)}
        >
          <Trash2 aria-hidden="true" size={14} />
        </Button>
      </div>

      <Dialog
        open={deleteDialogOpen}
        onOpenChange={(open) => {
          if (!isPending) setDeleteDialogOpen(open);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete file permanently?</DialogTitle>
            <DialogDescription>
              “{file.name}” will be permanently removed from storage and the
              project. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              disabled={isPending}
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              disabled={isPending}
              onClick={handleDelete}
            >
              {isPending ? (
                <>
                  <LoaderCircle
                    aria-hidden="true"
                    className="animate-spin"
                    size={16}
                  />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 aria-hidden="true" size={16} />
                  Delete file
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FileCard;
