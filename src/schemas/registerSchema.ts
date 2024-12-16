import { z } from "zod";
import { emailSchema } from "./emailSchema";
import { addressSchema } from "./addressSchema";
import dayjs from "dayjs";
import { passwordSchema } from "./passwordSchema";
import { Gender } from "@/types/gender";

export const registerSchema = z.object({
  idCardNumber: z
    .string()
    .regex(
      /^[0-9]{9}$|^[0-9]{12}$/,
      "Số CMND/CCCD chứa đầy đủ 9 hoặc 12 chữ số và không có chữ cái"
    ),
  email: emailSchema,
  password: passwordSchema,
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
  gender: z.string().default(Gender.MALE),
  address: addressSchema,
});
