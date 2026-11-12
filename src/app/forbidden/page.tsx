import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ForbiddenPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-light px-6">
      <section className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">403 · Forbidden</p>
        <h1 className="mt-3 text-2xl font-semibold">You don’t have access to this page</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Your account role doesn’t include permission to view this page.
        </p>
        <Button asChild className="mt-6 rounded-full">
          <Link href="/">Back to dashboard</Link>
        </Button>
      </section>
    </main>
  );
}
