
import { File } from "lucide-react";

import { RelativeTime } from "@/components/common/RelativeTime";
import type { ApiProfileActivity } from "@/features/profile/types/profile.types";

interface ProfileOverviewProps {
  about: string | null;
  activities: ApiProfileActivity[];
}

export function ProfileOverview({
  about,
  activities,
}: ProfileOverviewProps) {
  return (
    <div className="space-y-12">
      <div className="flex max-w-[75%] flex-col">
        <section className="rounded-xl border p-5 md:p-6">
          <h2 className="text-lg font-semibold text-text-primary">
            About
          </h2>

          <p className="mt-4 text-sm leading-7 text-text-body">
            {about?.trim() || "No information available."}
          </p>

          <section className="mt-6">
            <h2 className="text-lg font-semibold text-text-primary">
              Recent Activities
            </h2>

            <div className="mt-5 w-full space-y-4">
              {activities.length > 0 ? (
                activities.map((activity) => (
                  <article
                    key={activity.id}
                    className="flex justify-between gap-4"
                  >
                    <div className="mt-1 flex w-fit items-start space-x-1">
                      <File className="size-4 shrink-0 rounded-full bg-primary-50 text-destructive/50" />

                      <h3 className="text-sm font-medium text-text-primary">
                        {activity.description || activity.action}
                      </h3>
                    </div>

                    <div className="w-fit shrink-0 text-center">
                      <p className="mt-1 text-xs text-text-body">
                        <RelativeTime date={activity.created_at} />
                      </p>
                    </div>
                  </article>
                ))
              ) : (
                <p className="text-sm text-text-body">
                  No recent activities found.
                </p>
              )}
            </div>
          </section>
        </section>
      </div>
    </div>
  );
}
