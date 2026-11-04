import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import google from "@/assets/auth/Social.png";

type AuthCardProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
  showSocialLogin?: boolean;
};

export function AuthCard({
  title,
  subtitle,
  children,
  showSocialLogin = true,
}: AuthCardProps) {
  return (
    <section className="w-full max-w-160 rounded-[14px] bg-white p-6 shadow-md sm:p-10">
      <header className="mb-6 text-center">
        <h1 className="text-[17px] font-semibold leading-5.5 tracking-[-0.02em]
         text-text-primary md:text-[31px]">
          {title}
        </h1>
        <p className="mt-3 text-[9px] leading-3.25 text-text-body md:mt-5 md:text-[16px]">
          {subtitle}
        </p>
      </header>

      {showSocialLogin ? (
        <>
          <Button
            type="button"
            variant="outline"
            className="h-7.25 w-full rounded-[5px] border-border bg-transparent px-3 text-[9px] font-normal text-text-secondary shadow-none hover:bg-bg-light hover:text-text-primary md:text-[16px]"
          >
            <Image src={google} alt="Google" className="mr-2.5 size-5 md:size-4" />
            Sign With Google
          </Button>

          <div className="my-2.5 flex items-center gap-3 text-[9px] leading-3 text-text-body">
            <span aria-hidden="true" className="h-px flex-1 bg-border" />
            <span>OR</span>
            <span aria-hidden="true" className="h-px flex-1 bg-border" />
          </div>
        </>
      ) : null}

      {children}
    </section>
  );
}
