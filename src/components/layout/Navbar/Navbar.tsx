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
    <header className="w-full py-5 bg-white mb-5">
      <nav className=" app-container mx-auto flex items-center gap-6">
        <h1 className="text-xl leading-4 font-normal">Collabspace</h1>
        <MainNav roles={account?.roles ?? []} />
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
