import { Card, CardContent } from "../../../components/ui/card"
import { cn } from "@/utils/cn"
import { Progress } from "@/components/ui/progress"
import { Stat } from "../types/typesDashboard"
import { TrendingDown } from "lucide-react"

export default function StatCard({ stat }: { stat: Stat }) {
    const Icon = stat.icon
    const percent = (stat.value / stat.total) * 100
    console.log(stat);

    return (
        <Card className="rounded-2xl h-40 shadow-xs py-5 px-1">
            <CardContent>
                <div className="flex items-start justify-between">
                    <h3 className="text-base font-medium text-foreground">{stat.title}</h3>
                    <span
                        className={cn(
                            "grid size-8 place-items-center rounded-full",
                            stat.badge
                        )}
                    >
                        <Icon className="size-4" aria-hidden />
                    </span>
                </div>

                <div className="mt-2 flex items-center gap-3">
                    <span className="text-3xl font-semibold tabular-nums">{stat.value}</span>
                    <TrendingDown change={stat.change} />
                    - {stat.change}  from last month

                </div>

                <p className="mt-3 text-right text-[11px] tabular-nums text-muted-foreground">
                    {stat.value}/{stat.total}
                </p>
                <Progress
                    value={percent}
                    aria-label={`${stat.title}: ${stat.value} of ${stat.total}`}
                    className={cn("mt-1 h-1.5", stat.track, stat.bar)}
                />
            </CardContent>
        </Card>
    )
}
