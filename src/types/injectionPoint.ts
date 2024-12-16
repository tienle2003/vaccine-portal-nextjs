interface Address {
  provinceId: number;
  districtId: number;
  wardId: number;
}

export interface InjectionPointFormData {
  name: string;
  owner: string;
  quantity: number;
  address: Address;
}
