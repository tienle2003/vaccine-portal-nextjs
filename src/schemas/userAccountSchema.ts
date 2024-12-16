import { z } from "zod";
import dayjs from "dayjs";
import { Gender } from "@/types/gender";
import { addressSchema } from "./addressSchema";

export const userAccountSchema = z.object({
  name: z.string().min(1, "Họ tên không được để trống"),
  dob: z
    .date({
      required_error: "Ngày sinh không được bỏ trống",
      invalid_type_error: "Ngày sinh không hợp lệ",
    })
    .refine(
      (date) => date <= new Date(),
      "Ngày sinh không được là ngày tương lai"
    )
    .transform((date) => dayjs(date).format("YYYY-MM-DD")),
  gender: z
    .enum([Gender.MALE, Gender.FEMALE, Gender.OTHER])
    .default(Gender.MALE),
  address: addressSchema,
});

export type UserAccountFormData = z.infer<typeof userAccountSchema>;
