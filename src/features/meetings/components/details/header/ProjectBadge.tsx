
import {CalendarDays,  Clipboard, Clock} from "lucide-react";
type Props = {
    name: string;
    startTime: string;
    endTime: string;
    year?: string;
};

export default function ProjectBadge({ name, startTime, endTime, year }: Props) {
    return (
        <div className="flex items-center gap-4">

              <Clipboard className="h-4 w-4 font-medium text-primary" />
            <h3 className="inline-flex w-fit items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              {name}
            </h3>
            <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-muted-foreground" />
                <span className="ml-2 text-sm text-muted-foreground">
                    {year}
                </span>
            </div>
            <div className="flex items-center gap-2">
                <Clock size={16} className="text-muted-foreground" />
                <span className="ml-2 text-sm text-muted-foreground">
                    {startTime}
                </span>
                -
                <span className="ml-2 text-sm text-muted-foreground">
                    {endTime}
                </span>
            </div>
        </div>
    );
}
