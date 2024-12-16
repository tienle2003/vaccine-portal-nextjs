import { z } from "zod";
import { passwordSchema } from "./passwordSchema";

export const defaultValues = {
  newPassword: "",
  confirmNewPassword: "",
};

export const resetPasswordSchema = z
  .object({
    newPassword: passwordSchema,
    confirmNewPassword: passwordSchema,
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Mật khẩu mới và xác nhận mật khẩu không khớp",
    path: ["confirmNewPassword"],
  });

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
