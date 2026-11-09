
import MeetingsHeader from "@/features/meetings/components/calendar/MeetingsHeader";
import MeetingsCalendar from "@/features/meetings/components/calendar/meetings-calendar";
export default function page() {
  return (
    <div>
      <MeetingsHeader />
     
      <div className="container mx-auto my-3 overflow-hidden rounded-lg border border-border bg-background">
        <MeetingsCalendar />
      </div>
     
    </div>
  )
}
