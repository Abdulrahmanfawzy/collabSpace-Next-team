"use client";

import { useState } from "react";
import Image from "next/image";

import google from "@/assets/auth/Social.png";
import { Button } from "@/components/ui/button";

import {
    useGoogleRedirectMutation,
} from "@/features/auth/hooks/useAuthMutations";

export function GoogleSocialButton() {
    const mutation = useGoogleRedirectMutation();

    const [errorMessage, setErrorMessage] =
        useState("");

    async function handleGoogleLogin() {
        setErrorMessage("");

        const result = await mutation.mutateAsync();

        if (!result.success) {
            setErrorMessage(result.message);
            return;
        }

        window.location.assign(
            result.data.authorization_url,
        );
    }

    return (
        <div>
            <Button
                type="button"
                variant="outline"
                disabled={mutation.isPending}
                onClick={handleGoogleLogin}
                className="h-12 w-full rounded-[5px] border-border bg-transparent px-4 py-2 text-[9px] font-normal text-text-secondary shadow-none hover:bg-bg-light hover:text-text-primary md:text-[16px] flex items-center justify-center gap-2.5"
            >
                <Image
                    src={google}
                    alt="Google"
                    className="size-5 shrink-0 self-center md:size-4"
                />

                {mutation.isPending
                    ? "Redirecting..."
                    : "Sign With Google"}
            </Button>

            {errorMessage && (
                <p
                    role="alert"
                    className="mt-2 text-center text-xs text-destructive"
                >
                    {errorMessage}
                </p>
            )}
        </div>
    );
}