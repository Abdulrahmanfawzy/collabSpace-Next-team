
"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, LockKeyhole, Mail, Pencil, UserRound } from "lucide-react";
import { toast } from "sonner";

import { FormInput } from "@/components/common/form-input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { AuthUser } from "@/features/auth/types/auth.types";

import {
  profileSchema,
  type ProfileFormValues,
} from "../schema/profile.schema";

interface ProfileEditFormProps {
  user: AuthUser;
  currentProject: string;
}

export function ProfileEditForm({ user, currentProject }: ProfileEditFormProps) {
  const router = useRouter();
  const avatarInputRef = useRef<HTMLInputElement>(null);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: user.name,
      email: user.email,
      phone: user.phone ?? "",
      availabilityStatus: user.available_status ?? "",
      about: user.about ?? "",
      avatar: undefined,
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
      jobTitle: user.job_title ?? "",
      yearsOfExperience:
        user.years_of_experience == null ? "" : String(user.years_of_experience),
      currentTeamProject: currentProject,
    },
  });
  const selectedAvatar = watch("avatar");
  const [avatarPreview, setAvatarPreview] = useState(user.avatar_url ?? undefined);

  useEffect(() => {
    if (!selectedAvatar) {
      setAvatarPreview(user.avatar_url ?? undefined);
      return;
    }

    const previewUrl = URL.createObjectURL(selectedAvatar);
    setAvatarPreview(previewUrl);

    return () => URL.revokeObjectURL(previewUrl);
  }, [selectedAvatar, user.avatar_url]);

  function handleAvatarChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (file) {
      setValue("avatar", file, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  }

  async function onSubmit(values: ProfileFormValues) {
    const profileFormData = new FormData();
    profileFormData.append("name", values.fullName.trim());
    profileFormData.append("email", values.email.trim());
    profileFormData.append("phone", values.phone.trim());
    profileFormData.append("job_title", values.jobTitle.trim());
    profileFormData.append("about", values.about.trim());
    if (values.availabilityStatus.trim()) {
      profileFormData.append("available_status", values.availabilityStatus.trim());
    }

    profileFormData.append(
      "years_of_experience",
      values.yearsOfExperience.trim(),
    );

    if (values.avatar) {
      profileFormData.append("avatar", values.avatar);
    }

    if (values.currentPassword || values.newPassword || values.confirmNewPassword) {
      profileFormData.append("current_password", values.currentPassword);
      profileFormData.append("new_password", values.newPassword);
      profileFormData.append("new_password_confirmation", values.confirmNewPassword);
    }

    try {
      const response = await fetch("/api/profile", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: profileFormData,
      });
      const result = (await response.json().catch(() => null)) as
        | { success?: boolean; message?: string }
        | null;

      if (!response.ok || !result?.success) {
        throw new Error(
          result?.message ?? "Unable to update your profile. Please try again.",
        );
      }

      toast.success(result.message ?? "Profile updated successfully.");
      router.refresh();
      router.push("/profile");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to update your profile. Please try again.",
      );
    }
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Profile Header */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <Avatar className="size-23.5">
            <AvatarImage src={avatarPreview} alt={user.name} />
            <AvatarFallback>
              {user.name
                .split(" ")
                .map((part) => part[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <button
            type="button"
            onClick={() => avatarInputRef.current?.click()}
            aria-label="Change profile photo"
            className="absolute -bottom-1 -right-1 flex size-11 items-center justify-center rounded-full bg-primary-50 text-primary"
          >
            <Pencil className="size-4" />
          </button>

          <input
            ref={avatarInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={handleAvatarChange}
          />
        </div>

        <h1 className="text-base md:text-[30px] font-semibold text-text-primary">
          {user.name}
        </h1>
      </div>

      {/* Personal Information */}
      <section className="grid grid-cols-1 gap-5 lg:grid-cols-[150px_minmax(0,1fr)] lg:gap-5">
        <div className="pt-1">
          <h2 className="text-sm md:text-[16px] font-semibold text-text-primary">
            Personal Info
          </h2>

          <p className="mt-2 max-w-36 text-xs md:text-[14px] leading-relaxed text-text-body">
            You can change your personal information settings here.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-white p-4">
          <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
            <FormInput
              control={control}
              name="fullName"
              label="Full Name"
              placeholder="Enter your full name"
              leadingIcon={<UserRound className="size-3.5" />}
            />

            <FormInput
              control={control}
              name="email"
              label="Email Address"
              type="email"
              placeholder="Enter your email"
              leadingIcon={<Mail className="size-3.5" />}
            />

            <FormInput
              control={control}
              name="phone"
              label="Phone Number"
              placeholder="Enter your phone number"
            />

            <FormInput
              control={control}
              name="availabilityStatus"
              label="Availability Status"
              placeholder="Available"
            />

            <Controller
              control={control}
              name="about"
              render={({ field }) => (
                <div className="sm:col-span-2 space-y-2">
                  <label
                    htmlFor="about"
                    className="text-xs md:text-sm font-medium text-text-secondary"
                  >
                    About
                  </label>
                  <Textarea
                    {...field}
                    id="about"
                    rows={4}
                    aria-invalid={Boolean(errors.about)}
                    placeholder="Tell us about your experience"
                    className="resize-y border-border bg-bg-light text-sm text-text-body"
                  />
                  {errors.about?.message && (
                    <p className="text-xs text-destructive">{errors.about.message}</p>
                  )}
                </div>
              )}
            />

            {/* Avatar Validation Error */}
            {errors.avatar?.message && (
              <p className="sm:col-span-2 text-xs text-destructive">
                {errors.avatar.message}
              </p>
            )}

            {/* Password Fields */}
            <div className="sm:col-span-2">
              <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                <FormInput
                  control={control}
                  name="currentPassword"
                  label="Current Password"
                  type="password"
                  placeholder="Enter your current password"
                  leadingIcon={<LockKeyhole className="size-3.5" />}
                  autoComplete="current-password"
                />

                <FormInput
                  control={control}
                  name="newPassword"
                  label="New Password"
                  type="password"
                  placeholder="Enter a new password"
                  leadingIcon={<LockKeyhole className="size-3.5" />}
                  autoComplete="new-password"
                />

                <FormInput
                  control={control}
                  name="confirmNewPassword"
                  label="Confirm New Password"
                  type="password"
                  placeholder="Confirm your new password"
                  leadingIcon={<LockKeyhole className="size-3.5" />}
                  autoComplete="new-password"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="grid grid-cols-1 gap-5 lg:grid-cols-[150px_minmax(0,1fr)] lg:gap-5">
        <div className="pt-1">
          <h2 className="text-sm md:text-[16px] font-semibold text-text-primary">
            Experience
          </h2>

          <p className="mt-2 max-w-36 text-xs md:text-[14px] leading-relaxed text-text-body">
            You can change Experience settings here.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-white p-4">
          <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
            <FormInput
              control={control}
              name="jobTitle"
              label="Job Title"
              placeholder="Enter your job title"
            />

            <FormInput
              control={control}
              name="yearsOfExperience"
              label="Years of Experience"
              placeholder="Enter years of experience"
            />

            <div className="sm:col-span-2">
              <FormInput
                control={control}
                name="currentTeamProject"
                label="Current Team / Project"
                placeholder="Enter your current team or project"
                disabled
              />
            </div>
          </div>
        </div>
      </section>

      {/* Save Button */}
      <div className="border-t border-border pt-3">
        <Button
          type="submit"
          variant="auth"
          disabled={isSubmitting}
          className="h-10 w-full rounded-full"
        >
          Save
          <Check className="ml-1 size-4" />
        </Button>
      </div>
    </form>
  );
}
