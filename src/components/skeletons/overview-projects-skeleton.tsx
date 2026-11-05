
import { Skeleton } from "@/components/ui/skeleton";

const OverviewProjectsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

      {/* Left Section */}
      <div className="lg:col-span-8 space-y-4">

        {/* Description Skeleton */}
        <div className="rounded-2xl bg-white p-4 space-y-4">
          <Skeleton className="h-5 w-28" />

          <div className="space-y-2">
            <Skeleton className="h-4 w-[85%]" />
            <Skeleton className="h-4 w-[75%]" />
          </div>
        </div>

        {/* Project Overview Skeleton */}
        <div className="rounded-2xl bg-white p-4 space-y-6">

          <div className="flex items-center justify-between">
            <Skeleton className="h-5 w-36" />

            <div className="flex items-center gap-4">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>

          {/* Chart Skeleton */}
          <div className="pt-2">
            <div className="flex h-44 gap-3">

              {/* Y Axis */}
              <div className="flex flex-col justify-between py-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-2 w-7" />
                ))}
              </div>

              {/* Chart Area */}
              <div className="flex flex-1 flex-col justify-between">
                <div className="flex flex-col justify-between flex-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton
                      key={i}
                      className="h-px w-full"
                    />
                  ))}
                </div>

                {/* X Axis */}
                <div className="flex justify-between pt-3">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <Skeleton
                      key={i}
                      className="h-2 w-6"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Skeleton */}
        <div className="rounded-2xl bg-white p-4 space-y-5">

          <Skeleton className="h-5 w-36" />

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-5">

            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">

                <Skeleton className="size-10 shrink-0 rounded-full" />

                <div className="space-y-2">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-3 w-14" />
                </div>

              </div>
            ))}

          </div>
        </div>

      </div>

      {/* Right Section */}
      <div className="lg:col-span-4 space-y-4">

        {/* Project Progress Skeleton */}
        <div className="rounded-2xl bg-white p-4 space-y-5">

          <Skeleton className="h-4 w-28" />

          {/* Gauge Skeleton */}
          <div className="flex flex-col items-center gap-3 py-8">

            <div className="relative flex items-center justify-center">
              <Skeleton className="h-24 w-36 rounded-t-full" />
            </div>

            <Skeleton className="h-5 w-12" />
            <Skeleton className="h-3 w-24" />

          </div>

          {/* Tasks Statistics */}
          <div className="grid grid-cols-3 gap-2">

            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-3 w-full" />
              </div>
            ))}

          </div>
        </div>

        {/* Team Members Skeleton */}
        <div className="rounded-2xl bg-white p-4 space-y-5">

          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-3 w-12" />
            <Skeleton className="size-3 rounded-full" />
          </div>

          {/* Members */}
          <div className="space-y-4">

            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-3"
              >
                <Skeleton className="size-9 shrink-0 rounded-full" />

                <Skeleton className="h-3 w-24" />

                {i === 0 && (
                  <div className="ml-auto">
                    <Skeleton className="h-3 w-10" />
                  </div>
                )}
              </div>
            ))}

          </div>
        </div>

      </div>

    </div>
  );
};

export default OverviewProjectsSkeleton;
