
import { Skeleton } from "@/components/ui/skeleton";

const FileCardSkeleton = () => {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-gray-300 bg-white px-3 py-2.5">
      {/* PDF Icon */}
      <Skeleton className="size-8 shrink-0 rounded-md" />

      {/* File Information */}
      <div className="flex flex-1 flex-col gap-1.5">
        <Skeleton className="h-3 w-28" />
        <Skeleton className="h-2.5 w-20" />
        <Skeleton className="h-2 w-24" />
      </div>

      {/* Download Icon */}
      <Skeleton className="size-4 shrink-0" />
    </div>
  );
};

const FilesSkeleton = () => {
  return (
    <div className="space-y-8">

      {/* Recent Files */}
      <section className="space-y-4">
        <Skeleton className="h-5 w-28" />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <FileCardSkeleton key={index} />
          ))}
        </div>
      </section>

      {/* All Files */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-9 w-24 rounded-full" />
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 9 }).map((_, index) => (
            <FileCardSkeleton key={index} />
          ))}
        </div>
      </section>

    </div>
  );
};

export default FilesSkeleton;
