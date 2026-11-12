"use client";

import { useState } from "react";
import { Check, Trash2, UserPlus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAssignTeamMembers } from "@/hooks/teams/use-assign-team-members";
import { useDeleteTeamMember } from "@/hooks/teams/use-delete-team-member";
import { useGetTeamRoles } from "@/hooks/teams/use-get-team-roles";
import type {
  ProjectAssignedTeam,
  ProjectOverviewMember,
} from "@/types/project";

interface TeamMembersProps {
  projectId: number;
  teams: ProjectAssignedTeam[];
  availableMembers: ProjectOverviewMember[];
  canManageMembers: boolean;
  isLoading: boolean;
  error: Error | null;
}

const TeamMembers = ({
  projectId,
  teams,
  availableMembers,
  canManageMembers,
  isLoading,
  error,
}: TeamMembersProps) => {
  const [selectedTeamId, setSelectedTeamId] = useState("");
  const [manageTeamId, setManageTeamId] = useState<number | null>(null);
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [selectedRole, setSelectedRole] = useState<string>();

  const selectedTeam =
    teams.find((team) => String(team.id) === selectedTeamId) ?? teams[0];
  const manageTeam = teams.find((team) => team.id === manageTeamId);

  const memberOptions = new Map<
    number,
    { id: number; name: string; email?: string }
  >();
  availableMembers.forEach((member) => {
    memberOptions.set(member.id, {
      id: member.id,
      name: member.name,
      email: member.email,
    });
  });
  teams.forEach((team) => {
    team.members.forEach((member) => {
      if (!memberOptions.has(member.id)) {
        memberOptions.set(member.id, { id: member.id, name: member.name });
      }
    });
  });
  const assignableMembers = [...memberOptions.values()].sort((first, second) =>
    first.name.localeCompare(second.name)
  );
  const membersToAdd = assignableMembers.filter(
    (member) =>
      !manageTeam?.members.some((teamMember) => teamMember.id === member.id)
  );

  const {
    data: roleData,
    isPending: areRolesLoading,
    error: rolesError,
  } = useGetTeamRoles();
  const assignMembers = useAssignTeamMembers();
  const deleteMember = useDeleteTeamMember();

  const openMemberManager = () => {
    if (!selectedTeam) return;
    setManageTeamId(selectedTeam.id);
    setSelectedUserIds([]);
  };

  const closeMemberManager = (open: boolean) => {
    if (!open) {
      setManageTeamId(null);
      setSelectedUserIds([]);
    }
  };

  const handleAssignMember = () => {
    const role = selectedRole || roleData?.default;
    if (!manageTeam || selectedUserIds.length === 0 || !role) return;

    assignMembers.mutate(
      {
        teamId: manageTeam.id,
        projectId,
        payload: {
          members: [
            ...selectedUserIds.map((userId) => ({
              user_id: Number(userId),
              role_in_team: role,
            })),
          ],
        },
      },
      {
        onSuccess: () => setSelectedUserIds([]),
      }
    );
  };

  const handleRemoveMember = (userId: number) => {
    if (!manageTeam) return;

    deleteMember.mutate({
      teamId: manageTeam.id,
      userId,
      projectId,
    });
  };

  const handleUpdateMemberRole = (userId: number, role: string) => {
    if (!manageTeam) return;

    assignMembers.mutate({
      teamId: manageTeam.id,
      projectId,
      payload: {
        members: [{ user_id: userId, role_in_team: role }],
      },
    });
  };

  return (
    <section className="w-full rounded-xl bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <h3 className="shrink-0 text-sm font-semibold text-gray-900">
            Team Members
          </h3>

          <Select
            value={selectedTeam ? String(selectedTeam.id) : ""}
            onValueChange={setSelectedTeamId}
            disabled={teams.length === 0}
          >
            <SelectTrigger
              aria-label="Select team"
              className="h-auto min-w-0 w-auto gap-1 border-0 bg-transparent p-0 text-[10px] text-gray-500 shadow-none focus-visible:ring-0"
              disabled={isLoading}
            >
              <SelectValue
                placeholder={isLoading ? "Loading teams..." : "Select team"}
              />
            </SelectTrigger>
            <SelectContent align="start">
              {teams.map((team) => (
                <SelectItem key={team.id} value={String(team.id)}>
                  {team.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {canManageMembers && (
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="shrink-0"
            onClick={openMemberManager}
            disabled={!selectedTeam || isLoading}
          >
            <UserPlus />
            Manage
          </Button>
        )}
      </div>

      {selectedTeam && (
        <div className="mb-3 flex items-center justify-between text-[10px] text-gray-500">
          <span>
            {selectedTeam.completed_tasks}/{selectedTeam.total_tasks} tasks
          </span>
          <span>{selectedTeam.completion_percentage}% complete</span>
        </div>
      )}

      <div className="flex flex-col gap-3">
        {isLoading && (
          <p className="text-[11px] text-gray-500">Loading team members...</p>
        )}

        {error && (
          <p role="alert" className="text-[11px] text-destructive">
            {error.message}
          </p>
        )}

        {selectedTeam?.members.map((member) => (
          <div key={member.id} className="flex items-center gap-2">
            <div className="relative shrink-0">
              {member.avatar_url ? (
                <img
                  src={member.avatar_url}
                  alt={member.name}
                  className="h-8 w-8 rounded-full object-cover"
                />
              ) : (
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-xs font-medium text-gray-600">
                  {member.name.charAt(0).toUpperCase()}
                </span>
              )}

              {member.is_leader && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-white">
                  <Check aria-label="Team leader" size={10} />
                </span>
              )}
            </div>

            <div className="min-w-0">
              <span className="block truncate text-[11px] font-medium text-gray-700">
                {member.name}
              </span>
              <span className="block truncate text-[9px] text-gray-500">
                {member.role_in_team}
                {member.is_leader ? " · Team Lead" : ""}
              </span>
            </div>

            <span className="ml-auto shrink-0 text-right text-[9px] text-gray-500">
              {member.tasks_ratio}
            </span>
          </div>
        ))}

        {!isLoading && !error && !selectedTeam?.members.length && (
          <p className="text-[11px] text-gray-500">
            {teams.length === 0
              ? "No teams are assigned to this project."
              : "No members are assigned to this team."}
          </p>
        )}
      </div>

      <Dialog
        open={canManageMembers && manageTeamId !== null}
        onOpenChange={closeMemberManager}
      >
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Manage {manageTeam?.name ?? "team"} members</DialogTitle>
            <DialogDescription>
              Add a project member, update an existing member&apos;s role, or
              remove someone from this team.
            </DialogDescription>
          </DialogHeader>

          <div className="max-h-56 space-y-2 overflow-y-auto">
            {manageTeam?.members.map((member) => (
              <div
                key={member.id}
                className="flex items-center gap-3 rounded-lg border p-2"
              >
                {member.avatar_url ? (
                  <img
                    src={member.avatar_url}
                    alt=""
                    className="h-9 w-9 rounded-full object-cover"
                  />
                ) : (
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-medium text-gray-600">
                    {member.name.charAt(0).toUpperCase()}
                  </span>
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{member.name}</p>
                </div>
                <Select
                  value={member.role_in_team}
                  onValueChange={(role) =>
                    handleUpdateMemberRole(member.id, role)
                  }
                  disabled={
                    areRolesLoading ||
                    Boolean(rolesError) ||
                    assignMembers.isPending
                  }
                >
                  <SelectTrigger
                    aria-label={`Role for ${member.name}`}
                    className="max-w-40"
                  >
                    <SelectValue placeholder={member.role_in_team} />
                  </SelectTrigger>
                  <SelectContent>
                    {roleData?.roles.map((role) => (
                      <SelectItem key={role.value} value={role.value}>
                        {role.value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  type="button"
                  size="icon-sm"
                  variant="ghost"
                  className="text-destructive hover:text-destructive"
                  aria-label={`Remove ${member.name} from ${
                    manageTeam?.name ?? "team"
                  }`}
                  title={`Remove ${member.name}`}
                  disabled={deleteMember.isPending}
                  onClick={() => handleRemoveMember(member.id)}
                >
                  <Trash2 />
                </Button>
              </div>
            ))}

            {!manageTeam?.members.length && (
              <p className="rounded-lg border border-dashed p-4 text-center text-sm text-muted-foreground">
                This team has no members yet.
              </p>
            )}
          </div>

          {rolesError && (
            <p role="alert" className="text-xs text-destructive">
              Failed to load team roles: {rolesError.message}
            </p>
          )}

          <div className="space-y-3 rounded-lg bg-muted/40 p-3">
            <h4 className="text-sm font-medium">Add project members</h4>
            {membersToAdd.length > 0 ? (
              <>
                <div className="max-h-40 space-y-1 overflow-y-auto rounded-md border bg-background p-2">
                  {membersToAdd.map((member) => {
                    const userId = String(member.id);

                    return (
                      <label
                        key={member.id}
                        className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 hover:bg-muted"
                      >
                        <input
                          type="checkbox"
                          checked={selectedUserIds.includes(userId)}
                          onChange={(event) => {
                            setSelectedUserIds((current) =>
                              event.target.checked
                                ? [...current, userId]
                                : current.filter((id) => id !== userId)
                            );
                          }}
                          className="h-4 w-4 accent-primary"
                        />
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm">
                            {member.name}
                          </span>
                          <span className="block truncate text-xs text-muted-foreground">
                            {member.email || "Project member"}
                          </span>
                        </span>
                      </label>
                    );
                  })}
                </div>

                <Select
                  value={selectedRole ?? roleData?.default ?? ""}
                  onValueChange={setSelectedRole}
                  disabled={
                    areRolesLoading ||
                    Boolean(rolesError) ||
                    !roleData?.roles.length
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue
                      placeholder={
                        areRolesLoading ? "Loading roles..." : "Select a role"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {roleData?.roles.map((role) => (
                      <SelectItem key={role.value} value={role.value}>
                        {role.value}
                        {role.is_leader ? " · Leader" : ""}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

              </>
            ) : (
              <p className="text-xs text-muted-foreground">
                All known project members are already on this team.
              </p>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              onClick={handleAssignMember}
              disabled={
                selectedUserIds.length === 0 ||
                !(selectedRole || roleData?.default) ||
                areRolesLoading ||
                Boolean(rolesError) ||
                assignMembers.isPending
              }
            >
              {assignMembers.isPending
                ? "Saving..."
                : selectedUserIds.length > 0
                  ? `Save ${selectedUserIds.length} ${
                      selectedUserIds.length === 1 ? "member" : "members"
                    }`
                  : "Save members"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default TeamMembers;
