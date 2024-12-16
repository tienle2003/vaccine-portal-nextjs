import { z } from "zod";
import { addressSchema } from "./addressSchema";

export const injectionPointSchema = z.object({
  name: z.string().min(1, "Tên địa điểm không được để trống"),
  manager: z.string().min(1, "Người đứng đầu cơ sở không được để trống"),
  numberOfTables: z
    .number({ invalid_type_error: "Số bàn tiêm phải là số" })
    .positive("Số bàn tiêm phải là số dương")
    .min(1, "Số bàn tiêm phải là số lớn hơn 0"),
  detailAddress: z.string().min(1, "Số nhà, tên đường không được để trống"),
  address: addressSchema,
});
