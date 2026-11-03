"use client";

import {
  useState,
  type ComponentProps,
  type HTMLInputTypeAttribute,
  type ReactNode,
} from "react";
import { Eye, EyeOff } from "lucide-react";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
  type UseControllerProps,
} from "react-hook-form";
import { cn } from "@/lib/utils";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

type FormInputProps<TFieldValues extends FieldValues> = Omit<
  ComponentProps<typeof Input>,
  "name" | "type" | "value" | "defaultValue" | "onChange" | "onBlur"
> & {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  label: string;
  type?: HTMLInputTypeAttribute;
  leadingIcon?: ReactNode;
  wrapperClassName?: string;
  rules?: UseControllerProps<TFieldValues, Path<TFieldValues>>["rules"];
};

function FormInput<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  type = "text",
  leadingIcon,
  wrapperClassName,
  rules,
  className,
  id,
  ...inputProps
}: FormInputProps<TFieldValues>) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const isPassword = type === "password";
  const inputId = id ?? String(name);

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field, fieldState }) => (
        <Field className={cn("gap-0", wrapperClassName)}>
          <div className="relative gap-2">
            <FieldLabel
              htmlFor={inputId}
              className="absolute -top-1.25 left-2 z-10 bg-white px-0.75 text-[8px] md:text-[12px]
               leading-2.5 text-text-secondary"
            >
              {label}
            </FieldLabel>

            {leadingIcon ? (
              <span
                aria-hidden="true"
                className="pointer-events-none absolute left-2.25 right-0.5 top-1 z-10 size-4 flex translate-y-1
                 items-center justify-center text-text-muted"
              >
                {leadingIcon}
              </span>
            ) : null}

            <Input
              {...inputProps}
              {...field}
              id={inputId}
              type={isPassword && passwordVisible ? "text" : type}
              value={(field.value ?? "") as string | number}
              aria-invalid={fieldState.invalid}
              className={cn(
                "h-7.75 rounded-[7px] border-border bg-bg-light px-2.5 py-4 text-[9px] md:text-sm leading-none text-text-body shadow-none placeholder:text-text-muted focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/10",
                leadingIcon && "pl-10",
                isPassword && "pr-8",
                className,
              )}
            />

            {isPassword ? (
              <button
                type="button"
                tabIndex={-1}
                aria-label={passwordVisible ? "Hide password" : "Show password"}
                onClick={() => setPasswordVisible((visible) => !visible)}
                className="absolute right-2.25 top-1/2 z-10 flex -translate-y-1/2 items-center justify-center text-text-muted transition-colors hover:text-primary"
              >
                {passwordVisible ? (
                  <EyeOff aria-hidden="true" className="size-4" />
                ) : (
                  <Eye aria-hidden="true" className="size-4" />
                )}
              </button>
            ) : null}
          </div>

          <FieldError>{fieldState.error?.message}</FieldError>
        </Field>
      )}
    />
  );
}

export { FormInput };
