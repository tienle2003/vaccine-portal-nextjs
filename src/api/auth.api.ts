import { useMutation } from "@tanstack/react-query";
import axiosInstance from "./axios";
import { ResponseData } from "@/types/response";
import { RegisterFormData } from "@/app/(auth)/register/page";
import { LoginFormData } from "@/app/(auth)/login/page";
import { User } from "@/types/user";
import { ForgotPasswordFormData } from "@/schemas";

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
}

export interface ResetPasswordPayload {
  newPassword: string;
  token: string;
}

const fetchLogin = async (
  data: LoginFormData
): Promise<ResponseData<TokenResponse>> => {
  const response = await axiosInstance.post("/auth/login", data);
  return response.data;
};

const fetchRegister = async (
  data: RegisterFormData
): Promise<ResponseData<User>> => {
  const { address, ...other } = data;
  const response = await axiosInstance.post("/auth/register", {
    ...address,
    ...other,
  });
  return response.data;
};

const fetchLogout = async (
  refreshToken: string
): Promise<ResponseData<null>> => {
  return await axiosInstance.post("/auth/logout", { refreshToken });
};

export const fetchRefreshToken = async (
  refreshToken: string
): Promise<ResponseData<TokenResponse>> => {
  const response = await axiosInstance.post("/auth/refresh-token", {
    refreshToken,
  });
  return response.data;
};

const fetchForgotPassword = async (
  data: ForgotPasswordFormData
): Promise<ResponseData<null>> => {
  const response = await axiosInstance.post("/auth/forgot-password", data);
  return response.data;
};

const fetchResetPassword = async (
  data: ResetPasswordPayload
): Promise<ResponseData<null>> => {
  const response = await axiosInstance.post("/auth/reset-password", data);
  return response.data;
};

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: (data: LoginFormData) => fetchLogin(data),
  });
};

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: (data: RegisterFormData) => fetchRegister(data),
  });
};

export const useForgotPasswordMutation = () => {
  return useMutation({
    mutationFn: (data: ForgotPasswordFormData) => fetchForgotPassword(data),
  });
};

export const useLogoutMutation = () => {
  return useMutation({
    mutationFn: (refreshToken: string) => fetchLogout(refreshToken),
  });
};

export const useResetPasswordMutation = () => {
  return useMutation({
    mutationFn: (data: ResetPasswordPayload) => fetchResetPassword(data),
  });
};
