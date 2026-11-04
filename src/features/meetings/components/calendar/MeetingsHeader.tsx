
import { Button } from "@/components/ui/button";


export default function MeetingsHeader() {
  return (
    <div className="container mx-auto my-3 flex items-center justify-between rounded-lg bg-app-neutral-light px-6 py-4">
        <h1 className="text-2xl font-bold text-text-primary">
          Meetings
        </h1>
     

      <Button variant="default" className="rounded-[30px]">
       
        Add Meeting
      </Button>
    </div>
  );
}
