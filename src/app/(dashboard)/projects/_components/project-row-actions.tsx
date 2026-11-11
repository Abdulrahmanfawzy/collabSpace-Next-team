"use client";

import { useState } from "react";
import { Pencil, LoaderCircle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useDeleteProject } from "@/hooks/projects/use-delete-project";
import type { Project } from "@/types/project";
import { CreateProjectDialog } from "./create-project-dialog";

interface ProjectRowActionsProps {
  project: Project;
}

export function ProjectRowActions({ project }: ProjectRowActionsProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const { mutate: deleteProject, isPending } = useDeleteProject();

  const handleDelete = () => {
    deleteProject(project.id, {
      onSuccess: () => setDeleteDialogOpen(false),
    });
  };

  return (
    <div className="flex items-center justify-start gap-1 ">
      <CreateProjectDialog
        project={project}
        trigger={
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label={`Edit ${project.name}`}
            title="Edit project"
            className="text-primary cursor-pointer hover:bg-primary/10 hover:text-primary "
          >
            <Pencil aria-hidden="true" size={16} />
          </Button>
        }
      />

      <Dialog
        open={deleteDialogOpen}
        onOpenChange={(open) => {
          if (!isPending) setDeleteDialogOpen(open);
        }}
      >
        <DialogTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label={`Delete ${project.name}`}
            title="Delete project"
            className="bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-600 cursor-pointer "
          >
            <Trash2 aria-hidden="true" size={16} />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete project?</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete “{project.name}”? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
              disabled={isPending}
               className="cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleDelete}
              disabled={isPending}
              className="cursor-pointer"
            >
              {isPending ? (
                <>
                  <LoaderCircle
                    aria-hidden="true"
                    className="animate-spin"
                    size={16}
                  />
                  Deleting…
                </>
              ) : (
                <>
                  <Trash2 aria-hidden="true" size={16} />
                  Delete project
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
