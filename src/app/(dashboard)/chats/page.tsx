
import { auth } from "@/auth";
import ChatsLayout from "@/features/chats/layout/ChatsLayout";

export default async function ChatsPage() {
  const session = await auth();

  return (
    <ChatsLayout user={session?.user ?? null} />
  );
}
