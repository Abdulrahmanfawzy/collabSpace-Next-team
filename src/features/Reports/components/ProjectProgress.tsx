"use client"

// components/projects-progress.tsx
import * as React from "react"
import { Area, AreaChart, XAxis, YAxis } from "recharts"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

/* ---------- Props ---------- */

export type ProgressPoint = {
  x: number // position on the horizontal axis
  value: number // 0–100
}

export type ProgressTick = {
  x: number // where the label sits
  label: string // e.g. "Jan", "2016"
}

export type ProjectsProgressProps = {
  data: ProgressPoint[]
  ticks: ProgressTick[]
  projects?: string[] // first item is the default
  onProjectChange?: (project: string) => void
}

/* ---------- Config ---------- */

const chartConfig = {
  value: { label: "Progress", color: "#86efac" },
} satisfies ChartConfig

const AXIS_TEXT = "#9ca3af"
const Y_TICKS = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]

/* ---------- Component ---------- */

export function ProjectsProgress({
  data,
  ticks,
  projects = ["All Projects"],
  
}: ProjectsProgressProps) {
  const gradientId = React.useId().replace(/:/g, "")
  const labelFor = (x: number) => ticks.find((t) => t.x === x)?.label ?? ""
  const maxX = Math.max(...data.map((d) => d.x))
  const onProjectChange=(p) => console.log(p)

  return (
    <Card className="rounded-2xl border-0 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 px-5 pb-2 pt-5">
        <CardTitle className="text-xl font-medium">Projects Progress</CardTitle>

        <Select defaultValue={projects[0]} onValueChange={onProjectChange}>
          <SelectTrigger
            aria-label="Project"
            className="h-8 w-auto flex-row-reverse gap-2 border-0 bg-transparent px-1 text-sm shadow-none focus:ring-0 [&_svg]:text-foreground [&_svg]:opacity-100"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent align="end">
            {projects.map((p) => (
              <SelectItem key={p} value={p}>
                {p}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent className="px-2 pb-4 sm:px-4">
        <ChartContainer config={chartConfig} className="h-[280px] w-full">
          <AreaChart data={data} margin={{ top: 12, right: 8, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-value)" stopOpacity={0.7} />
                <stop offset="100%" stopColor="var(--color-value)" stopOpacity={0} />
              </linearGradient>
            </defs>

            <YAxis
              domain={[10, 105]}
              ticks={Y_TICKS}
              tickLine={false}
              axisLine={false}
              width={38}
              tick={{ fill: AXIS_TEXT, fontSize: 12 }}
            />
            <XAxis
              type="number"
              dataKey="x"
              domain={[0, maxX]}
              ticks={ticks.map((t) => t.x)}
              tickFormatter={labelFor}
              tickLine={false}
              axisLine={false}
              tickMargin={12}
              tick={{ fill: AXIS_TEXT, fontSize: 12 }}
            />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel hideIndicator />}
            />

            <Area
              type="linear"
              dataKey="value"
              stroke="none"
              fill={`url(#${gradientId})`}
              dot={false}
              activeDot={{ r: 4, fill: "#22c55e", stroke: "#fff" }}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default ProjectsProgress