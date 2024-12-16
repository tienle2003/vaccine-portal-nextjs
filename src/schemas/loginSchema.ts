import { z } from "zod";
import { emailSchema } from "./emailSchema";

export const loginSchema = z.object({
  email: emailSchema,
  password: z
    .string()
    .min(8, "Mật khẩu tối thiểu 8 ký tự")
    .refine((s) => !s.includes(" "), "Mật khẩu không được chứa dấu cách"),
});
