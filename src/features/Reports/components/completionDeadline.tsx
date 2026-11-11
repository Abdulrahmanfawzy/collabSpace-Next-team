"use client"

// components/completion-vs-deadline.tsx
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

export type CompletionPoint = {
  label: string // x-axis label, can repeat (e.g. "Jun" twice)
  value: number // 0–100
}

export type CompletionVsDeadlineProps = {
  data: CompletionPoint[]
  title?: string
}

const chartConfig = {
  value: { label: "Completion", color: "#3b3bff" },
} satisfies ChartConfig

const AXIS_TEXT = "#9ca3af"
const Y_TICKS = [0, 25, 50, 75, 100]

export function CompletionVsDeadline({
  data,
  title = "Task Completion Time vs Deadline",
}: CompletionVsDeadlineProps) {
  // unique key per bar so repeated labels (Jun, Jun, ...) still work
  const rows = data.map((d, i) => ({ ...d, id: i }))

  return (
    <Card className="rounded-2xl border-0 shadow-sm">
      <CardHeader className="p-5 pb-2">
        <CardTitle className="text-xl font-medium">{title}</CardTitle>
      </CardHeader>

      <CardContent className="px-3 pb-4 sm:px-5">
        <ChartContainer config={chartConfig} className="h-[280px] w-full">
          <BarChart data={rows} margin={{ top: 24, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke="#eef0f4" />

            <YAxis
              domain={[0, 100]}
              ticks={Y_TICKS}
              tickLine={false}
              axisLine={false}
              width={34}
              tick={{ fill: AXIS_TEXT, fontSize: 13 }}
            />
            <XAxis
              dataKey="id"
              tickFormatter={(_, i) => rows[i]?.label ?? ""}
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              interval={0}
              tick={{ fill: AXIS_TEXT, fontSize: 13 }}
            />

            <ChartTooltip
              cursor={{ fill: "rgba(59,59,255,0.06)" }}
              content={
                <ChartTooltipContent
                  hideIndicator
                  labelFormatter={(_, payload) => payload?.[0]?.payload?.label}
                />
              }
            />

            <Bar
              dataKey="value"
              fill="var(--color-value)"
              radius={[7, 7, 0, 0]}
              maxBarSize={28}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default CompletionVsDeadline