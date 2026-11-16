import Link from "next/link";
import { auth, signOut } from "@/auth";
import getNotifications, { getUnreadNotificationCount } from "@/api/notifications.api";
import type { NotificationItem } from "@/api/notifications.api";
import MainNav from "./components/MainNav";
import { HeaderActions } from "./components/HeaderAction";

const Navbar = async () => {
  const session = await auth();
  const account = session?.user;
  let notifications: NotificationItem[] = [];
  let unreadCount = 0;

  if (session?.backendToken) {
    const [notificationResult, countResult] = await Promise.allSettled([
      getNotifications(session.backendToken),
      getUnreadNotificationCount(session.backendToken),
    ]);
    if (notificationResult.status === "fulfilled") notifications = notificationResult.value;
    else console.error("Navbar notifications error:", notificationResult.reason);
    if (countResult.status === "fulfilled") unreadCount = countResult.value;
    else console.error("Navbar unread notification count error:", countResult.reason);
  }
  const user = account
    ? {
        name: account.name,
        role: account.job_title || account.roles?.[0] || "Member",
        email: account.email,
        avatar: account.avatar_url || undefined,
      }
    : null;

  async function handleSignOut() {
    "use server";
    await signOut({ redirectTo: "/login" });
  }

  return (
    <header className="relative w-full py-3 sm:py-5 bg-white mb-5 border-b border-neutral-100/80 shadow-2xs">
      <nav className="app-container mx-auto flex items-center justify-between gap-3 sm:gap-6">
        <div className="flex items-center gap-3 sm:gap-6">
          <Link
            href="/"
            className="text-lg sm:text-xl leading-none font-normal shrink-0 tracking-tight text-neutral-900 hover:opacity-85 transition-opacity"
          >
            Collabspace
          </Link>
          <MainNav
            roles={account?.roles ?? []}
            user={user}
            onSignOut={handleSignOut}
          />
        </div>
        <div>
          <HeaderActions
            user={user}
            notifications={notifications}
            unreadCount={unreadCount}
            onSignOut={handleSignOut}
            signInHref="/login"
          />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
