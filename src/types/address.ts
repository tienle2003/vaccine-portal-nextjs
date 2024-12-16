export interface Province {
  name: string;
  id: number | string;
}

export interface District {
  name: string;
  id: number | string;
  provinceId: number | string;
}

export interface Ward {
  name: string;
  id: number | string;
  districtId: number | string;
}
