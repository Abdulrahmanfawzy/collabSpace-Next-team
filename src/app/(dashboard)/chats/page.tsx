import ChatsLayout from "@/features/chats/layout/ChatsLayout";
import { requireAnyPermission } from "@/features/auth/permissions/authorization";

export default async function ChatsPage() {
  await requireAnyPermission(
    "access_all_project_chats",
    "access_project_chats",
    "send_project_chat",
  );
  return (
    <div>
      <ChatsLayout />
    </div>
  )
}
