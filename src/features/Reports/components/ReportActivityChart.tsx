"use client";

import { Line, LineChart, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import type { ProjectReportPoint } from "@/api/projectReports.api";

type Props = {
  data: ProjectReportPoint[];
  period: string;
  year: number;
  summary: {
    total_projects: number;
    active_projects: number;
    average_completion_rate: number;
  };
};

const chartConfig = {
  projects: { label: "Projects", color: "#3f3cff" },
} satisfies ChartConfig;

export default function ReportActivityChart({ data, period, year, summary }: Props) {
  const chartData = data.map((point) => ({
    ...point,
    axisLabel: point.month,
  }));

  return (
    <Card className="rounded-xl border-0 bg-white shadow-none">
      <CardHeader className="flex flex-row items-center justify-between px-4 pb-0 pt-4 sm:px-5">
        <div>
          <CardTitle className="text-base font-medium">Project Activity</CardTitle>
          <p className="mt-1 text-xs text-muted-foreground">
            {summary.total_projects} total · {summary.active_projects} active · {summary.average_completion_rate}% average completion
          </p>
        </div>
        <span className="text-xs font-medium capitalize text-muted-foreground">
          {period} · {year}
        </span>
      </CardHeader>
      <CardContent className="px-2 pb-4 pt-2 sm:px-4">
        <ChartContainer config={chartConfig} className="h-[220px] w-full">
          <LineChart data={chartData} margin={{ top: 12, right: 12, left: 0, bottom: 0 }}>
            <YAxis
              allowDecimals={false}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 10 }}
              width={30}
            />
            <XAxis
              dataKey="axisLabel"
              axisLine={false}
              tickLine={false}
              tickMargin={8}
              interval="preserveStartEnd"
              tick={{ fill: "#9ca3af", fontSize: 10 }}
            />
            <ChartTooltip
              content={<ChartTooltipContent labelFormatter={(_, payload) => payload?.[0]?.payload?.label} />}
            />
            <Line
              type="linear"
              dataKey="projects"
              name="Projects"
              stroke="var(--color-projects)"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 4, fill: "var(--color-projects)" }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
