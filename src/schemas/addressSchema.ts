import { z } from "zod";

export const addressSchema = z.object({
  provinceId: z.number().min(1, "Tỉnh/Thành phố không được để trống"),
  districtId: z.number().min(1, "Quận/Huyện không được để trống"),
  wardId: z.number().min(1, "Phường/Xã không được để trống"),
});
