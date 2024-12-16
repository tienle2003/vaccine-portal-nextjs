import { District, Province, Ward } from "./address";

export interface VaccinationSite {
  id: string | number;
  name: string;
  detailAddress: string;
  manager: string;
  numberOfTables: string | number;
  province: Province;
  district: District;
  ward: Ward;
}
