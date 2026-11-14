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
  Pencil,
  Plus,
  X,
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
import { useAssignProjectTeams } from "@/hooks/projects/use-assign-project-teams";
import { useDeleteProjectTeam } from "@/hooks/projects/use-delete-project-team";
import { useUpdateProject } from "@/hooks/projects/use-update-project";
import { useGetTeams } from "@/hooks/teams/use-get-teams";
import {
  createProjectSchema,
  type CreateProjectFormValues,
} from "@/schemas/projects/create-project.schema";
import type {
  CreateProjectPayload,
  Project,
  ProjectTeam,
  UpdateProjectPayload,
} from "@/types/project";
import { useProjectPermissions } from "./use-project-permissions";

const fieldClassName =
  "h-11 rounded-lg border-gray-200 bg-white px-3 text-sm shadow-none placeholder:text-gray-400 focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/10";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;

  return <p className="mt-1.5 text-xs text-destructive">{message}</p>;
}

interface CreateProjectDialogProps {
  trigger: ReactNode;
  project?: Project;
}

export function CreateProjectDialog({
  trigger,
  project,
}: CreateProjectDialogProps) {
  const [open, setOpen] = useState(false);
  const [selectedTeams, setSelectedTeams] = useState<ProjectTeam[]>([]);
  const [teamPage, setTeamPage] = useState(1);
  const queryClient = useQueryClient();
  const {
    canCreateProject,
    canEditProject,
    canAssignProjectMember,
  } = useProjectPermissions();
  const {
    data: teamsResponse,
    isPending: areTeamsLoading,
    isPlaceholderData: isTeamsPlaceholderData,
    error: teamsError,
    refetch: refetchTeams,
  } = useGetTeams(
    { page: teamPage, per_page: 15 },
    { enabled: open && canAssignProjectMember }
  );
  const availableTeams = teamsResponse?.data.data ?? [];
  const teamPagination = teamsResponse?.data.meta;
  const teamIds = selectedTeams.map((team) => team.id);
  const { mutate: createProject, isPending: isCreating } = useCreateProject();
  const { mutate: updateProject, isPending: isUpdating } = useUpdateProject();
  const { mutate: assignProjectTeams, isPending: isAssigningTeams } =
    useAssignProjectTeams();
  const { mutate: deleteProjectTeam, isPending: isDeletingTeam } =
    useDeleteProjectTeam();
  const isPending =
    isCreating || isUpdating || isAssigningTeams || isDeletingTeam;

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
    if (nextOpen && project) {
      setSelectedTeams(project.teams);
      setTeamPage(1);
      form.reset({
        name: project.name,
        description: project.description ?? "",
        start_date: project.start_date,
        deadline: project.deadline,
        status: project.status,
        priority: project.priority,
      });
    } else if (nextOpen) {
      setSelectedTeams([]);
      setTeamPage(1);
    } else if (!nextOpen) {
      form.reset();
      setSelectedTeams([]);
      setTeamPage(1);
    }
  };

  const handleTeamSelection = (team: ProjectTeam, selected: boolean) => {
    setSelectedTeams((current) => {
      if (!selected) {
        return current.filter(({ id }) => id !== team.id);
      }
      if (current.some(({ id }) => id === team.id)) {
        return current;
      }
      return [...current, team];
    });
  };

  const handleSubmit = (values: CreateProjectFormValues) => {
    if (project) {
      if (!canEditProject) return;
      const payload: UpdateProjectPayload = values;

      updateProject(
        { id: project.id, payload },
        {
          onSuccess: () => {
            if (!canAssignProjectMember || teamIds.length === 0) {
              form.reset();
              setOpen(false);
              return;
            }

            assignProjectTeams(
              { projectId: project.id, payload: { team_ids: teamIds } },
              {
                onSuccess: () => {
                  form.reset();
                  setOpen(false);
                },
              }
            );
          },
        }
      );
      return;
    }

    if (!canCreateProject) return;

    const payload: CreateProjectPayload = {
      ...values,
      teams: [],
      members: [],
    };

    createProject(payload, {
      onSuccess: async (response) => {
        await queryClient.invalidateQueries({ queryKey: ["projects"] });
        if (canAssignProjectMember && teamIds.length > 0) {
          assignProjectTeams(
            {
              projectId: response.data.id,
              payload: { team_ids: teamIds },
            },
            {
              onSuccess: () => {
                form.reset();
                setOpen(false);
              },
              onError: () => {
                form.reset();
                setOpen(false);
              },
            }
          );
          return;
        }

        form.reset();
        setOpen(false);
      },
    });
  };

  if (
    (project && !canEditProject) ||
    (!project && !canCreateProject)
  ) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>

      <DialogContent className="max-h-[min(90vh,820px)] gap-0 overflow-y-auto rounded-2xl border-0 p-0 shadow-2xl sm:max-w-[640px]">
        <DialogHeader className="border-b border-gray-100 px-6 py-5 text-left sm:px-7">
          <div className="flex items-start gap-4">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              {project ? (
                <Pencil aria-hidden="true" size={20} />
              ) : (
                <FolderPlus aria-hidden="true" size={21} />
              )}
            </div>
            <div className="space-y-1.5">
              <DialogTitle className="text-xl font-semibold tracking-tight text-gray-900">
                {project ? "Edit project" : "Create a new project"}
              </DialogTitle>
              <DialogDescription className="text-sm leading-5 text-gray-500">
                {project
                  ? "Update the project details, timeline, and priority."
                  : "Set up the project details, timeline, and priorities to get your team started."}
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
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="On Hold">On Hold</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                        <SelectItem value="Cancelled">Cancelled</SelectItem>
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

          {canAssignProjectMember && (
          <section className="space-y-4 border-t border-gray-100 pt-5">
            <div>
              <h3 className="text-sm font-semibold text-gray-900">
                Assign teams
              </h3>
              <p className="mt-1 text-xs text-gray-500">
                Choose one or more teams by name.
              </p>
            </div>

            <div className="space-y-3">
              <div className="max-h-52 space-y-1 overflow-y-auto rounded-lg border border-gray-200 bg-white p-2">
                {areTeamsLoading && (
                  <p className="p-3 text-sm text-gray-500">Loading teams...</p>
                )}

                {teamsError && (
                  <div className="flex items-center justify-between gap-3 p-3">
                    <p role="alert" className="text-sm text-destructive">
                      Failed to load teams: {teamsError.message}
                    </p>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => void refetchTeams()}
                    >
                      Retry
                    </Button>
                  </div>
                )}

                {!areTeamsLoading &&
                  !teamsError &&
                  availableTeams.map((team) => (
                    <label
                      key={team.id}
                      className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 hover:bg-gray-50"
                    >
                      <input
                        type="checkbox"
                        checked={teamIds.includes(team.id)}
                        onChange={(event) =>
                          handleTeamSelection(team, event.target.checked)
                        }
                        disabled={isPending || isTeamsPlaceholderData}
                        className="h-4 w-4 accent-primary"
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium text-gray-800">
                          {team.name}
                        </span>
                        <span className="block text-xs text-gray-500">
                          {team.members_count} members
                        </span>
                      </span>
                    </label>
                  ))}

                {!areTeamsLoading &&
                  !teamsError &&
                  availableTeams.length === 0 && (
                    <p className="p-3 text-sm text-gray-500">
                      No teams available.
                    </p>
                  )}
              </div>

              {teamPagination && teamPagination.last_page > 1 && (
                <div className="flex items-center justify-between">
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => setTeamPage((page) => page - 1)}
                    disabled={
                      teamPage <= 1 ||
                      areTeamsLoading ||
                      isTeamsPlaceholderData
                    }
                  >
                    Previous
                  </Button>
                  <span className="text-xs text-gray-500">
                    {isTeamsPlaceholderData
                      ? `Loading page ${teamPage}...`
                      : `Page ${teamPagination.current_page} of ${teamPagination.last_page}`}
                  </span>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => setTeamPage((page) => page + 1)}
                    disabled={
                      teamPage >= teamPagination.last_page ||
                      areTeamsLoading ||
                      isTeamsPlaceholderData
                    }
                  >
                    Next
                  </Button>
                </div>
              )}
            </div>

            {selectedTeams.length > 0 && (
              <ul className="flex flex-wrap gap-2">
                {selectedTeams.map(({ id: teamId, name: teamName }) => {
                  return (
                    <li
                      key={teamId}
                      className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary"
                    >
                      <span>{teamName ?? `Team ${teamId}`}</span>
                      <button
                        type="button"
                        aria-label={`Remove ${teamName ?? `team ${teamId}`}`}
                        className="rounded-full hover:bg-primary/10"
                        onClick={() => {
                          const isAlreadyAssigned =
                            project?.teams.some((team) => team.id === teamId) ??
                            false;

                          if (!project || !isAlreadyAssigned) {
                            setSelectedTeams((current) =>
                              current.filter((team) => team.id !== teamId)
                            );
                            return;
                          }

                          deleteProjectTeam(
                            { projectId: project.id, teamId },
                            {
                              onSuccess: () =>
                                setSelectedTeams((current) =>
                                  current.filter((team) => team.id !== teamId)
                                ),
                            }
                          );
                        }}
                        disabled={isPending}
                      >
                        <X aria-hidden="true" size={14} />
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
          )}

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
                    {project ? "Saving…" : "Creating…"}
                  </>
                ) : (
                  <>
                    <Plus aria-hidden="true" size={16} />
                    {project ? "Save changes" : "Create project"}
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
