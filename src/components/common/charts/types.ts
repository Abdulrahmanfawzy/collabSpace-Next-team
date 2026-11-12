export interface ChartData {
  label: string
  value: number
}

export interface ChartFilterOption {
  label: string
  value: string
}

export interface ChartFilter {
  label: string
  value?: string
  options?: readonly ChartFilterOption[]
  onChange?: (value: string) => void
  onClick?: () => void
}

export interface AreaChartProps {
  title: string
  data?: readonly ChartData[]
  xAxisLabels?: readonly string[]
  filters?: readonly ChartFilter[]
  maxValue?: number
  steps?: number
  height?: number
  color?: string
  valueFormatter?: (value: number) => string
  valueLabel?: string
  isLoading?: boolean
  className?: string
}