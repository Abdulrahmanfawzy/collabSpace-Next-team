import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/card";
import MeetingItem from "./MeetItems";
import { UpcomingMeetingsProps } from "../../types/typesDashboard";
import { ScrollArea } from "@/components/ui/scroll-area";

export default  function UpcomingMeetings({
    meetings,
    viewAllHref = "/meetings",
  }: UpcomingMeetingsProps) {
    return (
    <Card className="flex h-105 flex-col rounded-2xl border-0 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 p-5 pb-3">
          <CardTitle className="text-xl font-medium">Up coming meetings</CardTitle>
          <Link href={viewAllHref} className="text-xs text-blue-600 hover:underline">
            View All
          </Link>
        </CardHeader>
        <CardContent className="flex min-h-0 flex-1 flex-col p-5 pt-0">
          <ScrollArea className="min-h-0 flex-1 pr-3">
            <ul className="space-y-3">
              {meetings.map((m) => (
                <MeetingItem key={m.id} meeting={m} />
              ))}
            </ul>
          </ScrollArea>
        </CardContent>
      </Card>
    )
  }

