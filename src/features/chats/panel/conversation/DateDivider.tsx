
interface DateDividerProps {
  date: string;
}

export default function DateDivider({ date }: DateDividerProps) {
  return (
    <div className="flex items-center gap-4 py-2">
      <div className="h-px flex-1 bg-border" />

      <span className="shrink-0 text-xs font-medium text-muted-foreground">
        {date}
      </span>

      <div className="h-px flex-1 bg-border" />
    </div>
  );
}
