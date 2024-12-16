import { InjectionPointFormData } from "./injectionPoint";

export interface Vaccine {
  id: string | number;
  name: string | number;
  batchNumber: string | number;
}

export interface VaccinationResult {
  id: string | number;
  isInjected: boolean;
  injectionDate: string;
  vaccine: Vaccine;
  vaccinationSite: InjectionPointFormData;
}
