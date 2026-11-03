import * as React from "react";
import { cn } from "@/lib/utils";

function Field({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field"
      className={cn("flex min-w-0 flex-col gap-1.5", className)}
      {...props}
    />
  );
}

function FieldLabel({
  className,
  ...props
}: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="field-label"
      className={cn("text-[11px] font-normal text-text-body", className)}
      {...props}
    />
  );
}

function FieldError({
  className,
  children,
  ...props
}: React.ComponentProps<"p">) {
  if (!children) {
    return null;
  }

  return (
    <p
      data-slot="field-error"
      role="alert"
      className={cn("text-[10px] leading-4 text-support-red", className)}
      {...props}
    >
      {children}
    </p>
  );
}

export { Field, FieldError, FieldLabel };
