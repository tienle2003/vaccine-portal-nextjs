import { VaccineRegistration } from "@/schemas";
import { Gender } from "@/types/gender";
import { Data } from "@/types/table";

export const vaccineRegistrationMap = (
  items: VaccineRegistration[]
): Data[] => {
  return items.map(
    ({ id, user: { name, dob, gender, idCardNumber }, status }) => ({
      id,
      name,
      dob,
      gender: gender === Gender.MALE ? "Nam" : Gender.FEMALE ? "Nữ" : "Khác",
      idCardNumber,
      status,
    })
  );
};
