import { Status } from "@/types/statusEnum";
import { User } from "@/types/user";
import dayjs from "dayjs";
import { z } from "zod";

export const vaccineRegistrationSchema = z.object({
  priorityType: z.number().default(1),
  insuaranceNumber: z.string().length(15).optional(),
  job: z.string().optional(),
  company: z.string().optional(),
  currentAddress: z.string().optional(),
  preferredDate: z
    .date()
    .optional()
    .transform((date) => dayjs(date).format("YYYY-MM-DD")),
  injectionSession: z.number().default(1),
});

export type CreateVaccineRegistrationDto = z.infer<
  typeof vaccineRegistrationSchema
>;
export interface VaccineRegistration extends CreateVaccineRegistrationDto {
  id: string | number;
  status: Status;
  user: User;
}
