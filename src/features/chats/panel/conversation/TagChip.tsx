
interface TagChipProps {
  label: string;
}

export default function TagChip({ label }: TagChipProps) {
  return (
    <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
      {label}
    </span>
  );
}
