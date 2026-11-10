import { ChevronRight } from "lucide-react";

type Props = {
  data: {
    name: string;
  };
};

export default function MeetingHeader({ data }: Props) {
  return (
    <div className="flex flex-col gap-3 border-b p-4">
      {/* Breadcrumb */}
      <div className="flex text-2xl font-bold items-center gap-2 text-sm text-muted-foreground">
        <span>Meeting</span>
        <ChevronRight size={16} />
        <span className="text-foreground">{data.name}</span>
      </div>

      {/* Meeting Title */}
      <h1 className="text-2xl font-bold">
        {data.name}
      </h1>
    </div>
  );
}
