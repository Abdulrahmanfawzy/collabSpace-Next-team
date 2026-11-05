import { Card, CardContent } from "../../../components/ui/card";
import Gauge from "./Guage";
import Trend from "./Trend";

export default function CompletionRateCard({ rate, change }: { rate: number; change: number }) {
    return (
      <Card className="rounded-2xl  border-0 shadow-sm">
        <CardContent className="flex items-start justify-between gap-2 ">
          <div>
            <h3 className="text-base font-medium text-foreground">Completion Rate</h3>
            <p className="mt-2 text-3xl font-semibold tabular-nums">{rate}%</p>
            <div className="mt-1">
              <Trend change={change} />
            </div>
          </div>
          <Gauge value={rate} />
        </CardContent>
      </Card>
    )
  }