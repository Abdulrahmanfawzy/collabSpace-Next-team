"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { ProjectAssignedTeam } from "@/types/project";

interface TeamMembersProps {
  teams: ProjectAssignedTeam[];
  isLoading: boolean;
  error: Error | null;
}

const TeamMembers = ({ teams, isLoading, error }: TeamMembersProps) => {
  const [selectedTeamId, setSelectedTeamId] = useState("");
  const selectedTeam = teams.find(
    (team) => String(team.id) === selectedTeamId
  ) ?? teams[0];

  useEffect(() => {
    if (selectedTeam && !teams.some((team) => String(team.id) === selectedTeamId)) {
      setSelectedTeamId(String(selectedTeam.id));
    }
  }, [selectedTeam, selectedTeamId, teams]);

  return (
    <section className="w-full rounded-xl bg-white p-4 shadow-sm">

      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <h3 className="text-sm font-semibold text-gray-900">
          Team Members
        </h3>

        <Select
          value={selectedTeam ? String(selectedTeam.id) : ""}
          onValueChange={setSelectedTeamId}
          disabled={teams.length === 0}
        >
          <SelectTrigger
            aria-label="Select team"
            className="h-auto w-auto gap-1 border-0 bg-transparent p-0 text-[10px] text-gray-500 shadow-none focus-visible:ring-0"
            disabled={isLoading}
          >
            <SelectValue placeholder={isLoading ? "Loading teams..." : "Select team"} />
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

      {selectedTeam && (
        <div className="mb-3 flex items-center justify-between text-[10px] text-gray-500">
          <span>
            {selectedTeam.completed_tasks}/{selectedTeam.total_tasks} tasks
          </span>
          <span>{selectedTeam.completion_percentage}% complete</span>
        </div>
      )}

      {/* Members List */}
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
          <div
            key={member.id}
            className="flex items-center gap-2"
          >
            {/* Avatar */}
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

            {/* Name */}
            <div className="min-w-0">
              <span className="block truncate text-[11px] font-medium text-gray-700">
                {member.name}
              </span>
              <span className="block truncate text-[9px] text-gray-500">
                {member.role_in_team}
                {member.is_leader ? " · Team Lead" : ""}
              </span>
            </div>

            {/* Role */}
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
    </section>
  );
};

export default TeamMembers;