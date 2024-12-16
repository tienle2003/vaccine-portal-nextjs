import { District, Province, Ward } from "./address";
import { Gender } from "./gender";
import { Role } from "./role";

export interface User {
  id: string | number;
  name: string;
  email: string;
  dob: string;
  idCardNumber: string;
  healthInsuranceNumber: string;
  gender: Gender;
  role: Role;
  province: Province;
  district: District;
  ward: Ward;
}

export type UpdateUserData = Omit<
  Partial<User>,
  "province" | "district" | "ward"
> & {
  provinceId?: string | number;
  districtId?: string | number;
  wardId?: string | number;
};
