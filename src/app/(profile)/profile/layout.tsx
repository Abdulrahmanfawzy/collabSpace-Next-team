import type { ReactNode } from "react";

import { ProfileHeader } from "@/features/profile/components/ProfileHeader";
import MainNav from "@/components/layout/Navbar/components/MainNav";
export default function ProfileLayout({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen bg-light px-4 py-6 md:px-8 md:py-10">
      <div className="mx-auto max-w-7xl space-y-6">
        <MainNav />
        <ProfileHeader />
        {children}
      </div>
    </main>
  );
}
