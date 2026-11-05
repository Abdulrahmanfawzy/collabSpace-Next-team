"use client"

// components/project-overview.tsx
import * as React from "react"
import { Area, AreaChart, XAxis, YAxis } from "recharts"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import Filter from "./FilterChart"

/* ---------- Props ---------- */

export type ProjectPoint = {
  x: number 
  value: number 
}

export type AxisTick = {
  x: number 
  label: string 
}

export type ProjectOverviewProps = {
  data: ProjectPoint[]
  ticks: AxisTick[]
  projects?: string[] // first item is the default
  periods?: string[] // first item is the default
  onProjectChange?: (project: string) => void
  onPeriodChange?: (period: string) => void
}

/* ---------- Config ---------- */

const chartConfig = {
  value: { label: "Projects", color: "#4f6bff" },
} satisfies ChartConfig

const Y_TICKS = [0, 5000, 10000, 15000, 20000, 25000]

const formatK = (v: number) => `${v / 1000}k`



export function ProjectOverview({
  data,
  ticks,
  projects = ["All Projects"],
  periods = ["This Year", "Last Year"],
  onPeriodChange,
}: ProjectOverviewProps) {
  const gradientId = React.useId().replace(/:/g, "")
  const labelFor = (x: number) => ticks.find((t) => t.x === x)?.label ?? ""
  const maxX = Math.max(...data.map((d) => d.x))
    const onProjectChange =(p)=>{
        console.log(p);
        
    }
  return (
    <Card className="rounded-2xl  border-0 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 px-5 pb-2 pt-5">
        <CardTitle className="text-xl font-medium">Project overview</CardTitle>
        <div className="flex items-center gap-4">
          <Filter label="Project" options={projects} onChange={onProjectChange} />
          <Filter label="Period" options={periods} onChange={onPeriodChange} />
        </div>
      </CardHeader>

      <CardContent className="px-2 pb-3 sm:px-4">
        <ChartContainer config={chartConfig} className="h-[260px] w-full">
          <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-value)" stopOpacity={0.14} />
                <stop offset="100%" stopColor="var(--color-value)" stopOpacity={0} />
              </linearGradient>
            </defs>

            <YAxis
              domain={[0, 25000]}
              ticks={Y_TICKS}
              tickFormatter={formatK}
              tickLine={false}
              axisLine={false}
              width={40}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            />
            <XAxis
              type="number"
              dataKey="x"
              domain={[0, maxX]}
              ticks={ticks.map((t) => t.x)}
              tickFormatter={labelFor}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            />

            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  hideLabel
                  formatter={(v) => (
                    <span className="font-medium tabular-nums">
                      {Number(v).toLocaleString()}
                    </span>
                  )}
                />
              }
            />

            <Area
              type="natural"
              dataKey="value"
              stroke="var(--color-value)"
              strokeWidth={2}
              fill={`url(#${gradientId})`}
              dot={false}
              activeDot={{ r: 4 }}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default ProjectOverview