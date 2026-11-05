import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  
export default function Filter({
    options,
    onChange,
    label,
  }: {
    options: string[]
    onChange?: (value: string) => void
    label: string
  }) {
    return (
      <Select defaultValue={options[0]} onValueChange={onChange}>
        <SelectTrigger
          aria-label={label}
          className="h-8 w-auto flex-row-reverse gap-2 border-0 bg-transparent px-1 text-sm text-muted-foreground shadow-none focus:ring-0 [&_svg]:text-foreground [&_svg]:opacity-100"
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent align="end">
          {options.map((o) => (
            <SelectItem key={o} value={o}>
              {o}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    )
  }
  