import { Pagination } from "@/types/paginate";
import { ResponseData } from "@/types/response";
import axiosInstance from "./axios";
import { useQuery } from "@tanstack/react-query";
import { VaccinationResult } from "@/types/vaccinationResult";

const getVaccinationResults = async (
  page?: number | string,
  size?: number | string
): Promise<ResponseData<Pagination<VaccinationResult>>> => {
  const response = await axiosInstance.get(`/vaccination-results`, {
    params: {
      page,
      size,
    },
  });
  return response.data;
};

export const useVaccinationResults = (
  page?: number | string,
  size?: number | string
) => {
  return useQuery({
    queryKey: ["vaccinationResults", page, size],
    queryFn: () => getVaccinationResults(page, size),
  });
};
