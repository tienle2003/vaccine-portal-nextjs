import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "./axios";
import { UpdateUserData, User } from "@/types/user";
import { ResponseData } from "@/types/response";
import { ChangePasswordFormData } from "@/schemas";

const getProfile = async (id: number | string): Promise<ResponseData<User>> => {
  const response = await axiosInstance.get(`/users/${id}`);
  return response.data;
};

const updateProfile = async (
  id: number | string,
  data: UpdateUserData
): Promise<ResponseData<User>> => {
  const response = await axiosInstance.patch(`/users/${id}`, data);
  return response.data;
};

export type ChangePasswordDto = Omit<
  ChangePasswordFormData,
  "confirmNewPassword"
>;

const updatePassword = async (
  data: ChangePasswordDto
): Promise<ResponseData<User>> => {
  const response = await axiosInstance.put(`/users/change-password`, data);
  return response.data;
};

export const useUser = (id: number | string | null) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => getProfile(id!),
    enabled: !!id,
  });
};

export const useUpdateUserMutation = () => {
  return useMutation({
    mutationFn: ({ id, data }: { id: string | number; data: UpdateUserData }) =>
      updateProfile(id!, data),
  });
};

export const useUpdatePasswordMutation = () => {
  return useMutation({
    mutationFn: (data: ChangePasswordDto) => updatePassword(data),
  });
};
