import {
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  FolderKanban,
  MapPin,
  Mail,
  Phone,
  File,
} from "lucide-react";

import {
  profileActivities,
  profileStats,
  profileUser,
} from "../data/mock-profile";

function StatCard({
  icon: Icon,
  label,
  value,
  description,
}: {
  icon: typeof CheckCircle2;
  label: string;
  value: string;
  description: string;
}) {
  return (
    <article className="rounded-xl border border-border bg-white p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-text-body">{label}</p>
        <Icon className="size-5 text-primary" />
      </div>

      <p className="mt-4 text-2xl font-semibold text-text-primary">{value}</p>

      <p className="mt-1 text-xs text-text-muted">{description}</p>
    </article>
  );
}

export function ProfileOverview() {

  return (
    <div className="space-y-12">
      <div className="flex flex-col max-w-[75%]">
        <section className="rounded-xl border p-5 md:p-6">
          <h2 className="text-lg font-semibold text-text-primary">About</h2>

          <p className="mt-4 text-sm leading-7 text-text-body">
            {profileUser.bio}
          </p>

          <section className="mt-6 ">
            <h2 className="text-lg font-semibold text-text-primary">
              Recent Activities
            </h2>

            <div className="mt-5 w-full space-y-4">
              {profileActivities.map((activity) => (
                <article
                  key={activity.id}
                  className="flex justify-between space-between"
                >
                  <div
                    className="mt-1 flex w-fit space-x-1 
                 "
                  >
                    <File className="size-4 text-destructive/50 rounded-full bg-primary-50" />{" "}
                    <h3 className="text-sm font-medium text-text-primary">
                      {activity.title}
                    </h3>
                  </div>

                  <div className="w-fit text-center">
                    <p className="mt-1 text-xs text-text-body">
                      {activity.timestamp}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </section>
      </div>
    </div>
  );
}
