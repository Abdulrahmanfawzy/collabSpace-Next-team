"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Check, LockKeyhole, Mail, Pencil, UserRound } from "lucide-react";

import { FormInput } from "@/components/common/form-input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import { profileUser } from "../data/mock-profile";

type ProfileFormValues = {
  fullName: string;
  email: string;
  phone: string;
  availabilityStatus: string;
  password: string;
  jobTitle: string;
  yearsOfExperience: string;
  currentTeamProject: string;
};

export function ProfileEditForm() {
  const router = useRouter();

  const { control, handleSubmit } = useForm<ProfileFormValues>({
    defaultValues: {
      fullName: profileUser.fullName,
      email: profileUser.email,
      phone: profileUser.phone,
      availabilityStatus: "Available",
      password: "",
      jobTitle: profileUser.jobTitle,
      yearsOfExperience: "6 Years",
      currentTeamProject: "CollabSpace - Web Platform",
    },
  });

  function onSubmit(values: ProfileFormValues) {
    console.log("Profile form values:", values);
    router.push("/profile");
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Profile Header */}
      <div className="flex items-center gap-3">
        <div className="relative ">
          <Avatar className="size-23.5">
            <AvatarImage src={profileUser.avatar} alt={profileUser.fullName} />
            <AvatarFallback>MS</AvatarFallback>
          </Avatar>

          <span className="absolute -bottom-1 -right-1 flex size-7 items-center
           justify-center rounded-full bg-primary-50 text-primary">
            <Pencil className="size-4" />
          </span>
        </div>

        <h1 className="text-base md:text-[30px] font-semibold text-text-primary">
          {profileUser.fullName}
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
              rules={{ required: "Full name is required." }}
            />

            <FormInput
              control={control}
              name="email"
              label="Email Address"
              type="email"
              placeholder="Enter your email"
              leadingIcon={<Mail className="size-3.5" />}
              rules={{
                required: "Email is required.",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address.",
                },
              }}
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

            <div className="sm:col-span-2">
              <FormInput
                control={control}
                name="password"
                label="Change Password"
                type="password"
                placeholder="Enter a new password"
                leadingIcon={<LockKeyhole className="size-3.5" />}
                autoComplete="new-password"
                rules={{
                  minLength: {
                    value: 8,
                    message: "Password must contain at least 8 characters.",
                  },
                }}
              />
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
          className="h-10 w-full rounded-full"
        >
          Save
          <Check className="ml-1 size-4" />
        </Button>
      </div>
    </form>
  );
}
