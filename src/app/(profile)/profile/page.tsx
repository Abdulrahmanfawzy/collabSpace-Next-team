import type { Metadata } from "next";

import { ProfileOverview } from "@/features/profile/components/ProfileOverview";

export const metadata: Metadata = {
  title: "Profile Overview",
};

export default function ProfilePage() {
  return <ProfileOverview />;
}
