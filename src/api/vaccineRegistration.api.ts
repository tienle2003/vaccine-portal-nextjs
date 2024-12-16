import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "./axios";
import { CreateVaccineRegistrationDto, VaccineRegistration } from "@/schemas";
import { ResponseData } from "@/types/response";
import { Pagination } from "@/types/paginate";
import { Status } from "@/types/statusEnum";

const createVaccineRegistration = async (
  data: CreateVaccineRegistrationDto
) => {
  const response = await axiosInstance.post("/vaccine-registrations", data);
  return response.data;
};

const updateVaccineRegistration = async (
  id: string | number,
  status: Status
): Promise<ResponseData<VaccineRegistration>> => {
  const response = await axiosInstance.patch(`/vaccine-registrations/${id}`, {
    status,
  });
  return response.data;
};

const getVaccineRegistrations = async (
  page?: number | string,
  size?: number | string,
  name?: string,
  idCardNumber?: string
): Promise<ResponseData<Pagination<VaccineRegistration>>> => {
  const response = await axiosInstance.get("/vaccine-registrations", {
    params: {
      page,
      size,
      name,
      idCardNumber,
    },
  });
  return response.data;
};

export const useCreateVaccineRegistration = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateVaccineRegistrationDto) =>
      createVaccineRegistration(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vaccineRegistration"] });
    },
  });
};

export const useUpdateVaccineRegistration = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string | number; status: Status }) =>
      updateVaccineRegistration(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vaccineRegistration"] });
    },
  });
};

export const useVaccineRegistrationQuery = (
  page?: number | string,
  size?: number | string,
  name?: string,
  idCardNumber?: string
) => {
  return useQuery({
    queryKey: ["vaccineRegistration", page, size, name, idCardNumber],
    queryFn: () => getVaccineRegistrations(page, size, name, idCardNumber),
  });
};
