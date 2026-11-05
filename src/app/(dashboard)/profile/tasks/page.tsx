import type { Metadata } from "next";

import  ProfileTasks  from "@/features/profile/components/ProfileTasks";

export const metadata: Metadata = {
  title: "Profile Tasks",
};

export default function ProfileTasksPage() {
  return <ProfileTasks />;
}
