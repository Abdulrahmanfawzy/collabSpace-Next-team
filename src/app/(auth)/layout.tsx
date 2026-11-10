import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex min-h-svh flex-col bg-bg-light">
          <header className="absolute inset-x-0 top-0 z-10 flex h-[58px] items-center justify-between
       px-[19px] sm:px-6">
        <Link
          href="/login"
          className="text-[11px] md:text-[20px] font-medium tracking-[-0.01em] text-text-primary"
        >
          Collabspace
        </Link>

        <Button
          type="button"
          variant="outline"
          size="xs"
          aria-label="Language: English"
                  className="h-5.75 rounded-full border-gray-medium bg-transparent px-2 text-[8px]
          md:text-sm font-normal text-text-secondary shadow-none hover:bg-white"
        >
          English
          <ChevronDown aria-hidden="true" className="size-2.5" />
        </Button>
      </header>

      <main className="flex flex-1 bg-light items-center justify-center px-4 py-16">
        {children}
      </main>
    </div>
  );
}
