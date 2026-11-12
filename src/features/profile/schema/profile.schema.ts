import { z } from "zod";

const optionalString = z.union([
  z.literal(""),
  z.string().trim().min(1, "This field cannot contain only spaces."),
]);

const avatarSchema = z.custom<File>(
  (value) => typeof File !== "undefined" && value instanceof File,
  "Please select a valid image.",
);

export const profileSchema = z
  .object({
    fullName: z.string().trim().min(1, "Full name is required."),
    email: z.string().trim().email("Enter a valid email address."),
    phone: optionalString,
    availabilityStatus: optionalString,
    about: optionalString,
    jobTitle: optionalString,
    yearsOfExperience: z.union([
      z.literal(""),
      z.string().trim().regex(/^\d+$/, "Enter a whole number of years."),
    ]),
    currentTeamProject: z.string(),

    avatar: avatarSchema.optional(),

    currentPassword: z.string(),
    newPassword: z.string(),
    confirmNewPassword: z.string(),
  })
  .superRefine(async (values, ctx) => {
    // Avatar validation
    if (values.avatar) {
      const file = values.avatar;

      const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

      if (!allowedTypes.includes(file.type)) {
        ctx.addIssue({
          code: "custom",
          path: ["avatar"],
          message: "Only JPG, JPEG, PNG, and WEBP images are allowed.",
        });
      }

      if (file.size > 2 * 1024 * 1024) {
        ctx.addIssue({
          code: "custom",
          path: ["avatar"],
          message: "Image size must not exceed 2 MB.",
        });
      }

      if (allowedTypes.includes(file.type) && file.size <= 2 * 1024 * 1024) {
        try {
          const image = await createImageBitmap(file);

          if (image.width > 4000 || image.height > 4000) {
            ctx.addIssue({
              code: "custom",
              path: ["avatar"],
              message: "Image dimensions must not exceed 4000 × 4000 pixels.",
            });
          }

          image.close();
        } catch {
          ctx.addIssue({
            code: "custom",
            path: ["avatar"],
            message: "Unable to read this image. Please select another one.",
          });
        }
      }
    }

    // Password validation
    const { currentPassword, newPassword, confirmNewPassword } = values;

    const changingPassword =
      currentPassword.length > 0 ||
      newPassword.length > 0 ||
      confirmNewPassword.length > 0;

    if (!changingPassword) return;

    if (!currentPassword.trim()) {
      ctx.addIssue({
        code: "custom",
        path: ["currentPassword"],
        message: "Current password is required.",
      });
    }

    if (!newPassword.trim()) {
      ctx.addIssue({
        code: "custom",
        path: ["newPassword"],
        message: "New password is required.",
      });
    } else if (newPassword.length < 8) {
      ctx.addIssue({
        code: "custom",
        path: ["newPassword"],
        message: "Password must contain at least 8 characters.",
      });
    }

    if (!confirmNewPassword.trim()) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmNewPassword"],
        message: "Please confirm your new password.",
      });
    } else if (newPassword !== confirmNewPassword) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmNewPassword"],
        message: "Passwords do not match.",
      });
    }
  });

export type ProfileFormValues = z.infer<typeof profileSchema>;
