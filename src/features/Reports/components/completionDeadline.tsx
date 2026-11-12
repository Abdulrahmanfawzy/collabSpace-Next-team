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
  value: { label: "Completed Tasks", color: "#3b3bff" },
} satisfies ChartConfig

const AXIS_TEXT = "#9ca3af"

export function CompletionVsDeadline({
  data,
  title = "Task Completion Time vs Deadline",
}: CompletionVsDeadlineProps) {
  // unique key per bar so repeated labels (Jun, Jun, ...) still work
  const rows = data.map((d, i) => ({
    ...d,
    id: i,
    axisLabel: d.label.replace(/\s+\d{4}$/, ""),
  }))
  const maxValue = Math.max(1, ...data.map((point) => point.value))
  const yTicks = Array.from({ length: 5 }, (_, index) => Math.ceil((maxValue * index) / 4))

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
              domain={[0, maxValue]}
              ticks={yTicks}
              tickLine={false}
              axisLine={false}
              width={34}
              tick={{ fill: AXIS_TEXT, fontSize: 13 }}
            />
            <XAxis
              dataKey="id"
              dataKey="axisLabel"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              interval="preserveStartEnd"
              minTickGap={12}
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
