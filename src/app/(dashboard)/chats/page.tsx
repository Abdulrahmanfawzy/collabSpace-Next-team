
import { auth } from "@/auth";
import ChatsLayout from "@/features/chats/layout/ChatsLayout";
import { requireAnyPermission } from "@/features/auth/permissions/authorization";

export default async function ChatsPage() {
  const session = await auth();

  await requireAnyPermission(
    "access_all_project_chats",
    "access_project_chats",
    "send_project_chat",
  );
  return (
    <ChatsLayout user={session?.user ?? null} />
  );
}
