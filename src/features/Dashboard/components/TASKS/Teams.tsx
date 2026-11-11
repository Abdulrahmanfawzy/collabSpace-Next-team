"use client"

import { Card, CardContent, CardHeader, CardTitle  } from "@/components/ui/card";
import { Team } from "../../types/typesDashboard";
export type TeamsProps = {
  teams: Team[]
}


export function Teams({ teams }: TeamsProps) {
    return (
      <Card className="rounded-2xl h-105 pb-5 border-0 shadow-sm">
        <CardHeader className="flex flex-row items-center gap-2 space-y-0 p-5 pb-3">
          <CardTitle className="text-xl font-medium">Teams</CardTitle>
        </CardHeader>
  
        <CardContent className="p-5 pt-0">
          <div className="mb-4 flex justify-between text-xs text-muted-foreground">
            <span>Team</span>
            <span>Members / Projects</span>
          </div>
          <ul className="space-y-5">
            {teams.map((team) => (
              <li key={team.id} className="flex items-center justify-between gap-3 text-sm">
                <span className="truncate font-medium" title={team.description}>{team.name}</span>
                <span className="shrink-0 text-xs tabular-nums text-muted-foreground">{team.members_count} / {team.projects_count}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    )
  }
