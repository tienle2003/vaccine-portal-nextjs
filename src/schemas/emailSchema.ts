import { z } from "zod";

export const emailSchema = z
  .string()
  .min(1, "Email không được để trống")
  .email("Email không hợp lệ");
