import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/card";
import MeetingItem from "./MeetItems";
import { UpcomingMeetingsProps } from "../../types/typesDashboard";

export default  function UpcomingMeetings({
    meetings,
    viewAllHref = "/meetings",
  }: UpcomingMeetingsProps) {
    return (
      <Card className="rounded-2xl border-0 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 p-5 pb-3">
          <CardTitle className="text-xl font-medium">Up coming meetings</CardTitle>
          <Link href={viewAllHref} className="text-xs text-blue-600 hover:underline">
            View All
          </Link>
        </CardHeader>
        <CardContent className="p-5 pt-0">
          <ul className="space-y-3">
            {meetings.map((m) => (
              <MeetingItem key={m.id} meeting={m} />
            ))}
          </ul>
        </CardContent>
      </Card>
    )
  }
   