import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Rate } from "../types/typesReports"
export default function RateCard({ rate }: { rate: Rate }) {
    const positive = (rate.change ?? 0) >= 0
  
    return (
      <Card className="rounded-2xl border-0 shadow-sm ">
        <CardContent className=" px-3">
          <h3 className="text-lg font-medium text-foreground">{rate.title}</h3>
  
          <p className="mt-4 text-4xl font-semibold tabular-nums">{rate.value}{rate.suffix ?? " %"}</p>
  
          {rate.change !== undefined && <p className="mt-4 text-[11px] text-muted-foreground">
            <span className={cn("font-medium", positive ? "text-green-600" : "text-red-500")}>
              <span className="sr-only">{positive ? "Up " : "Down "}</span>
              {positive ? "+" : ""}
              {rate.change}%
            </span>{" "}
            From last month
          </p>}
        </CardContent>
      </Card>
    )
  }
