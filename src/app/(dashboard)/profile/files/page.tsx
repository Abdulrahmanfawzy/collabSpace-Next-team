import type { Metadata } from "next";

import { ProfileFiles } from "@/features/profile/components/ProfileFiles";

export const metadata: Metadata = {
  title: "Profile Files",
};

export default function ProfileFilesPage() {
  return <ProfileFiles />;
}
