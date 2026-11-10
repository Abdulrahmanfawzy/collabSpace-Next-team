"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type {
  ProjectOverviewMember,
  ProjectOverviewTeam,
} from "@/types/project";

interface TeamMembersProps {
  teams: ProjectOverviewTeam[];
  members: ProjectOverviewMember[];
}

const TeamMembers = ({ teams, members }: TeamMembersProps) => {
  const [selectedTeamId, setSelectedTeamId] = useState(
    teams[0] ? String(teams[0].id) : ""
  );
  const selectedTeam =
    teams.find((team) => String(team.id) === selectedTeamId) ?? teams[0];

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
          >
            <SelectValue placeholder="Select team" />
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

      {/* Members List */}
      <div className="flex flex-col gap-3">

        {members.map((member) => (
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

              {member.role.toLowerCase().includes("owner") && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-white">
                  <Check size={10} />
                </span>
              )}
            </div>

            {/* Name */}
            <div className="min-w-0">
              <span className="block truncate text-[11px] font-medium text-gray-700">
                {member.name}
              </span>
              {member.job_title && (
                <span className="block truncate text-[9px] text-gray-500">
                  {member.job_title}
                </span>
              )}
            </div>

            {/* Role */}
            {member.role && (
              <span className="ml-auto text-right text-[9px] text-gray-500">
                {member.role}
              </span>
            )}
          </div>
        ))}

        {members.length === 0 && (
          <p className="text-[11px] text-gray-500">
            No project members are available.
          </p>
        )}
      </div>
    </section>
  );
};

export default TeamMembers;