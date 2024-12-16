import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "./axios";
import { ResponseData } from "@/types/response";
import { Pagination } from "@/types/paginate";
import { VaccinationSite } from "@/types/vaccinationSite";

const getVaccinationSites = async (
  page?: number | string,
  size?: number | string,
  province?: number | string,
  district?: number | string,
  ward?: number | string
): Promise<ResponseData<Pagination<VaccinationSite>>> => {
  const response = await axiosInstance.get(`/vaccination-sites`, {
    params: {
      page,
      size,
      province,
      district,
      ward,
    },
  });
  return response.data;
};

export interface vaccinationSitePayload {
  name: string;
  detailAddress: string;
  manager: string;
  numberOfTables: string | number;
  provinceId: string | number;
  districtId: string | number;
  wardId: string | number;
}

const updateVaccinationSite = async (
  id: string | number,
  data: vaccinationSitePayload
) => {
  const response = await axiosInstance.patch(`/vaccination-sites/${id}`, data);
  return response.data;
};

const createVaccinationSite = async (data: vaccinationSitePayload) => {
  const response = await axiosInstance.post("/vaccination-sites/", data);
  return response.data;
};

export const useVaccinationSitesQuery = (
  page?: number | string,
  size?: number | string,
  province?: number | string,
  district?: number | string,
  ward?: number | string
) => {
  return useQuery({
    queryKey: ["vaccinationSites", page, size, province, district, ward],
    queryFn: () => getVaccinationSites(page, size, province, district, ward),
  });
};

export const useUpdateVaccinationSite = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string | number;
      data: vaccinationSitePayload;
    }) => updateVaccinationSite(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vaccinationSites"] });
    },
  });
};

export const useCreateVaccinationSite = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data }: { data: vaccinationSitePayload }) =>
      createVaccinationSite(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vaccinationSites"] });
    },
  });
};
