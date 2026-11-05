import { ArrowUpRight } from "lucide-react";

export default function Trend({ change }: { change: number }) {
    return (
      <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <ArrowUpRight className="size-3 text-green-600" aria-hidden />
        <span>
          <span className="sr-only">Up </span>+{change}% from last month
        </span>
      </p>
    )
  }