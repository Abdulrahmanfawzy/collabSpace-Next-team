
"use client"

import { useId } from "react"
import { ChevronDown } from "lucide-react"
import {
  Area,
  AreaChart as RechartsAreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { CommonSelect } from "@/components/common/common-select"
import { cn } from "cn"
import type { AreaChartProps } from "./types"

const AreaChart = ({
  title,
  data = [],
  xAxisLabels,
  filters = [],
  maxValue = 25000,
  steps = 5,
  height = 155,
  color = "#3B82F6",
  valueFormatter = (value) => `${value / 1000}k`,
  className,
}: AreaChartProps) => {
  const gradientId = `chart-gradient-${useId().replace(/:/g, "")}`

  if (!Number.isFinite(maxValue) || maxValue <= 0) {
    throw new RangeError("AreaChart maxValue must be a positive finite number.")
  }
  if (!Number.isInteger(steps) || steps <= 0) {
    throw new RangeError("AreaChart steps must be a positive integer.")
  }

  const ticks = Array.from(
    { length: steps + 1 },
    (_, index) => (maxValue / steps) * (steps - index)
  )
  const chartData = data.map((item, index) => ({ ...item, index }))
  const xAxisTicks = xAxisLabels?.length
    ? xAxisLabels.map((_, index) =>
        xAxisLabels.length === 1
          ? 0
          : (index / (xAxisLabels.length - 1)) * (chartData.length - 1)
      )
    : chartData.map((item) => item.index)

  return (
    <section className={cn("w-full rounded-xl bg-white p-4 shadow-sm", className)}>
      {/* Header */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-sm font-medium text-gray-900">{title}</h2>

        <div className="flex items-center gap-4 text-[10px] text-gray-500">
          {filters.map((filter) =>
            filter.options?.length ? (
              <CommonSelect
                key={filter.label}
                options={filter.options}
                value={filter.value}
                onValueChange={filter.onChange}
                placeholder={filter.label}
                triggerClassName="h-6! w-auto min-w-0 rounded-none border-0 p-0 text-[10px] shadow-none"
              />
            ) : (
              <button
                key={filter.label}
                type="button"
                onClick={filter.onClick}
                className="flex items-center gap-1 hover:text-gray-900"
              >
                {filter.label}
                <ChevronDown aria-hidden="true" size={12} />
              </button>
            )
          )}
        </div>
      </div>

      {/* Chart */}
      <div className="min-w-0" style={{ width: "100%", height }}>
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <RechartsAreaChart
              data={chartData}
              margin={{
                top: 5,
                right: 0,
                left: 0,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient
                  id={gradientId}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor={color}
                    stopOpacity={0.14}
                  />
                  <stop
                    offset="100%"
                    stopColor={color}
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid
                vertical={false}
                stroke="#F3F4F6"
              />

              <XAxis
                dataKey="index"
                type="number"
                domain={[0, Math.max(chartData.length - 1, 1)]}
                ticks={xAxisTicks}
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "#9CA3AF",
                  fontSize: 9,
                }}
                tickMargin={8}
                tickFormatter={(value: number) => {
                  if (xAxisLabels?.length) {
                    const labelIndex =
                      xAxisLabels.length === 1
                        ? 0
                        : Math.round(
                            (value / Math.max(chartData.length - 1, 1)) *
                              (xAxisLabels.length - 1)
                          )
                    return xAxisLabels[labelIndex] ?? ""
                  }
                  return chartData[Math.round(value)]?.label ?? ""
                }}
              />

              <YAxis
                domain={[0, maxValue]}
                ticks={ticks}
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "#9CA3AF",
                  fontSize: 9,
                }}
                tickFormatter={valueFormatter}
                width={35}
              />

              <Tooltip
                cursor={false}
                contentStyle={{
                  borderRadius: "10px",
                  border: "1px solid #F3F4F6",
                  fontSize: "12px",
                }}
                formatter={(value) => [
                  Number(value).toLocaleString(),
                  "Projects",
                ]}
              />

              <Area
                type="natural"
                dataKey="value"
                stroke={color}
                strokeWidth={1.5}
                fill={`url(#${gradientId})`}
                fillOpacity={1}
                dot={false}
                activeDot={{
                  r: 4,
                  fill: color,
                  stroke: "#fff",
                  strokeWidth: 2,
                }}
              />
            </RechartsAreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-gray-400">
            No data available
          </div>
        )}
      </div>
    </section>
  )
}

export { AreaChart }
export default AreaChart
