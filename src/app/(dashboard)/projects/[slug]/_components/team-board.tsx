"use client";

import { TeamBoardProps } from "../../../../../types/teams.types";
import { TeamColumn } from "./team-column";


export const TeamBoard = ({ teams }: TeamBoardProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {teams.map((team) => (
        <TeamColumn key={team.id} team={team} />
      ))}
    </div>
  );
};