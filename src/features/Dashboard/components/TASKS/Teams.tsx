"use client"

import { Card, CardContent, CardHeader, CardTitle  } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import MemberRow from "./MemberRow";
import { TeamMember } from "../../types/typesDashboard";
import { ScrollArea } from "@/components/ui/scroll-area";
export type TeamsProps = {
  members: TeamMember[]
  teams?: string[] // dropdown options, first item is the default
}


export function Teams({ members, teams = ["UI/UX"] }: TeamsProps) {
    const onTeamChange = (team: string) => { console.log(team) }
    return (
      <Card className="rounded-2xl h-105 pb-5 border-0 shadow-sm">
        <CardHeader className="flex flex-row items-center gap-2 space-y-0 p-5 pb-3">
          <CardTitle className="text-xl font-medium">Teams</CardTitle>
          <Select defaultValue={teams[0]} onValueChange={onTeamChange}>
            <SelectTrigger
              aria-label="Team"
              className="h-7 w-auto gap-1 border-0 bg-transparent px-1 text-xs text-muted-foreground shadow-none focus:ring-0"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {teams.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardHeader>
  
        <CardContent className="flex min-h-0 flex-1 flex-col p-5 pt-0">
          <div className="mb-4 flex justify-between text-xs text-muted-foreground">
            <span>Name</span>
            <span>Tasks</span>
          </div>
          <ScrollArea className="min-h-0 flex-1 pr-3">
            <ul className="space-y-5">
              {members.map((m) => (
                <MemberRow key={m.id} member={m} />
              ))}
            </ul>
          </ScrollArea>
        </CardContent>
      </Card>
    )
  }
