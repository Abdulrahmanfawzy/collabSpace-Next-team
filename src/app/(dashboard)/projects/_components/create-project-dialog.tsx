"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  CalendarDays,
  Flag,
  FolderPlus,
  LoaderCircle,
  Plus,
} from "lucide-react";
import type { ReactNode } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateProject } from "@/hooks/projects/use-create-project";
import {
  createProjectSchema,
  type CreateProjectFormValues,
} from "@/schemas/projects/create-project.schema";
import type { CreateProjectPayload } from "@/types/project";

const fieldClassName =
  "h-11 rounded-lg border-gray-200 bg-white px-3 text-sm shadow-none placeholder:text-gray-400 focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/10";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;

  return <p className="mt-1.5 text-xs text-destructive">{message}</p>;
}

interface CreateProjectDialogProps {
  trigger: ReactNode;
}

export function CreateProjectDialog({
  trigger,
}: CreateProjectDialogProps) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const { mutate: createProject, isPending } = useCreateProject();

  const form = useForm<CreateProjectFormValues>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      name: "",
      description: "",
      start_date: "",
      deadline: "",
      status: "Planning",
      priority: "Medium",
    },
  });

  const handleOpenChange = (nextOpen: boolean) => {
    if (isPending) return;
    setOpen(nextOpen);
    if (!nextOpen) form.reset();
  };

  const handleSubmit = (values: CreateProjectFormValues) => {
    const payload: CreateProjectPayload = {
      ...values,
      teams: [],
      members: [],
    };

    createProject(payload, {
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ["projects"] });
        form.reset();
        setOpen(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>

      <DialogContent className="max-h-[min(90vh,820px)] gap-0 overflow-y-auto rounded-2xl border-0 p-0 shadow-2xl sm:max-w-[640px]">
        <DialogHeader className="border-b border-gray-100 px-6 py-5 text-left sm:px-7">
          <div className="flex items-start gap-4">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <FolderPlus aria-hidden="true" size={21} />
            </div>
            <div className="space-y-1.5">
              <DialogTitle className="text-xl font-semibold tracking-tight text-gray-900">
                Create a new project
              </DialogTitle>
              <DialogDescription className="text-sm leading-5 text-gray-500">
                Set up the project details, timeline, and priorities to get
                your team started.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-6 px-6 py-6 sm:px-7"
        >
          <section className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-900">
                Basic information
              </h3>
              <p className="mt-1 text-xs text-gray-500">
                Add a clear name and a short description.
              </p>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="project-name"
                className="text-sm font-medium text-gray-700"
              >
                Project name <span className="text-destructive">*</span>
              </label>
              <Controller
                control={form.control}
                name="name"
                render={({ field, fieldState }) => (
                  <>
                    <Input
                      {...field}
                      id="project-name"
                      autoFocus
                      placeholder="e.g. Website redesign"
                      maxLength={120}
                      disabled={isPending}
                      aria-invalid={fieldState.invalid}
                      className={fieldClassName}
                    />
                    <FieldError message={fieldState.error?.message} />
                  </>
                )}
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="project-description"
                className="text-sm font-medium text-gray-700"
              >
                Description <span className="text-destructive">*</span>
              </label>
              <Controller
                control={form.control}
                name="description"
                render={({ field, fieldState }) => (
                  <>
                    <Textarea
                      {...field}
                      id="project-description"
                      placeholder="What is this project about? Include its goals and expected outcomes."
                      disabled={isPending}
                      aria-invalid={fieldState.invalid}
                      className="min-h-28 resize-y rounded-lg border-gray-200 bg-white px-3 py-2.5 text-sm shadow-none placeholder:text-gray-400 focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/10"
                    />
                    <FieldError message={fieldState.error?.message} />
                  </>
                )}
              />
            </div>
          </section>

          <section className="space-y-4 border-t border-gray-100 pt-5">
            <div>
              <h3 className="text-sm font-semibold text-gray-900">
                Timeline and planning
              </h3>
              <p className="mt-1 text-xs text-gray-500">
                Choose dates and define the initial project state.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Controller
                control={form.control}
                name="start_date"
                render={({ field, fieldState }) => (
                  <div className="space-y-2">
                    <label
                      htmlFor="project-start-date"
                      className="flex items-center gap-2 text-sm font-medium text-gray-700"
                    >
                      <CalendarDays size={15} className="text-gray-400" />
                      Start date <span className="text-destructive">*</span>
                    </label>
                    <Input
                      {...field}
                      id="project-start-date"
                      type="date"
                      disabled={isPending}
                      aria-invalid={fieldState.invalid}
                      className={fieldClassName}
                    />
                    <FieldError message={fieldState.error?.message} />
                  </div>
                )}
              />

              <Controller
                control={form.control}
                name="deadline"
                render={({ field, fieldState }) => (
                  <div className="space-y-2">
                    <label
                      htmlFor="project-deadline"
                      className="flex items-center gap-2 text-sm font-medium text-gray-700"
                    >
                      <CalendarDays size={15} className="text-gray-400" />
                      Deadline <span className="text-destructive">*</span>
                    </label>
                    <Input
                      {...field}
                      id="project-deadline"
                      type="date"
                      min={form.watch("start_date") || undefined}
                      disabled={isPending}
                      aria-invalid={fieldState.invalid}
                      className={fieldClassName}
                    />
                    <FieldError message={fieldState.error?.message} />
                  </div>
                )}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Controller
                control={form.control}
                name="status"
                render={({ field, fieldState }) => (
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      Project status
                    </label>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      disabled={isPending}
                    >
                      <SelectTrigger
                        aria-invalid={fieldState.invalid}
                        className={fieldClassName}
                      >
                        <SelectValue placeholder="Choose a status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Planning">Planning</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="On Hold">On Hold</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                    <FieldError message={fieldState.error?.message} />
                  </div>
                )}
              />

              <Controller
                control={form.control}
                name="priority"
                render={({ field, fieldState }) => (
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <Flag size={15} className="text-gray-400" />
                      Priority
                    </label>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      disabled={isPending}
                    >
                      <SelectTrigger
                        aria-invalid={fieldState.invalid}
                        className={fieldClassName}
                      >
                        <SelectValue placeholder="Choose a priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Low">Low</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                        <SelectItem value="Critical">Critical</SelectItem>
                      </SelectContent>
                    </Select>
                    <FieldError message={fieldState.error?.message} />
                  </div>
                )}
              />
            </div>
          </section>

          <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-gray-500">
              <span className="text-destructive">*</span> Required fields
            </p>
            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                className="min-w-24 rounded-lg"
                onClick={() => handleOpenChange(false)}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="min-w-36 gap-2 rounded-lg"
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <LoaderCircle
                      aria-hidden="true"
                      className="animate-spin"
                      size={16}
                    />
                    Creating…
                  </>
                ) : (
                  <>
                    <Plus aria-hidden="true" size={16} />
                    Create project
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
