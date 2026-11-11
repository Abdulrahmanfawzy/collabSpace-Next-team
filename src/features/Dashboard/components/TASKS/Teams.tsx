"use client"

import { Card, CardContent, CardHeader, CardTitle  } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import MemberRow from "./MemberRow";
import { TeamMember } from "../../types/typesDashboard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { members } from "../../../../constant/DataFiles";
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
