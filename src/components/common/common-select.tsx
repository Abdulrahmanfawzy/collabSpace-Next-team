"use client"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "cn"
import type { ComponentProps } from "react"

type SelectOption = {
  label: string
  value: string
}

type CommonSelectProps = Omit<ComponentProps<typeof Select>, "children"> & {
  options: readonly SelectOption[]
  placeholder?: string
  triggerClassName?: string
  contentClassName?: string
}

export function CommonSelect({
  options,
  placeholder = "Select an option",
  triggerClassName,
  contentClassName,
  ...selectProps
}: CommonSelectProps) {
  return (
    <Select {...selectProps}>
      <SelectTrigger
        className={cn(
          "w-45 rounded-[16px] border border-secondary-500 bg-transparent",
          triggerClassName
        )}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className={contentClassName}>
        <SelectGroup>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
