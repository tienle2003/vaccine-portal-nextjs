import { z } from "zod";

export const passwordSchema = z
  .string()
  .min(8, "Mật khẩu tối thiểu 8 ký tự")
  .refine((s) => !s.includes(" "), "Mật khẩu không được chứa dấu cách");
