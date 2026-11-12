"use client"

import { Card, CardContent, CardHeader, CardTitle  } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Team } from "../../types/typesDashboard";
import { ScrollArea } from "@/components/ui/scroll-area";
export type TeamsProps = {
  teams: Team[]
}


export function Teams({ teams }: TeamsProps) {
    return (
      <Card className="rounded-2xl h-105 pb-5 border-0 shadow-sm">
        <CardHeader className="flex flex-row items-center gap-2 space-y-0 p-5 pb-3">
          <CardTitle className="text-xl font-medium">Teams</CardTitle>
        </CardHeader>
  
        <CardContent className="flex min-h-0 flex-1 flex-col p-5 pt-0">
          <div className="mb-4 flex justify-between text-xs text-muted-foreground">
            <span>Team</span>
            <span>Members / Projects</span>
          </div>
          <ScrollArea className="min-h-0 flex-1 pr-3">
            <ul className="space-y-3">
              {teams.map((team) => (
                <li key={team.id} className="flex items-center justify-between gap-4 rounded-xl bg-muted/40 px-4 py-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{team.name}</p>
                    {team.description && (
                      <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">{team.description}</p>
                    )}
                  </div>
                  <p className="shrink-0 text-right text-xs text-muted-foreground">
                    {team.members_count} members <span className="px-1">·</span> {team.projects_count} projects
                  </p>
                </li>
              ))}
              {teams.length === 0 && (
                <li className="py-8 text-center text-sm text-muted-foreground">You haven’t joined a team yet.</li>
              )}
            </ul>
          </ScrollArea>
        </CardContent>
      </Card>
    )
  }
