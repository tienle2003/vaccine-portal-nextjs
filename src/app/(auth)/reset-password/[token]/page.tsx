"use client";
import { useResetPasswordMutation } from "@/api/auth.api";
import PrimaryButton from "@/components/CustomButton";
import TextInput from "@/components/TextInput";
import { ResetPasswordFormData, resetPasswordSchema } from "@/schemas";
import { handleRequestError } from "@/utils/errorHandler";
import { zodResolver } from "@hookform/resolvers/zod";
import { Stack } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

const defaultValues = {
  newPassword: "",
  confirmNewPassword: "",
};

const ResetPassword = () => {
  const router = useRouter();
  const { token } = useParams<{ token: string }>();
  const handleCancel = () => {
    router.back();
  };

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ResetPasswordFormData>({
    defaultValues,
    mode: "onChange",
    resolver: zodResolver(resetPasswordSchema),
  });

  const { mutateAsync } = useResetPasswordMutation();
  const onSubmit: SubmitHandler<ResetPasswordFormData> = async (data) => {
    try {
      const { message } = await mutateAsync({
        newPassword: data.newPassword,
        token,
      });
      toast.success(message);
      router.push("/login");
    } catch (error) {
      handleRequestError(error);
    }
  };
  return (
    <div className="w-full">
      <Stack
        spacing={3}
        className="m-36"
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextInput
          name="newPassword"
          control={control}
          label="Mật khẩu mới"
          placeHolder="Mật khẩu mới"
          type="password"
          isRequired
          errMsg={errors.newPassword?.message}
          isError={!!errors.newPassword}
        />
        <TextInput
          name="confirmNewPassword"
          control={control}
          label="Xác nhận mật khẩu mới"
          placeHolder="Xác nhận mật khẩu mới"
          type="password"
          isRequired
          errMsg={errors.confirmNewPassword?.message}
          isError={!!errors.confirmNewPassword}
        />
        <Stack direction="row" spacing={2} justifyContent="center">
          <PrimaryButton onClick={handleCancel} variant="outlined">
            Quay lại
          </PrimaryButton>
          <PrimaryButton
            type="submit"
            disabled={isSubmitting || !isValid}
            variant="contained"
          >
            {isSubmitting ? "Resetting..." : "Reset"}
          </PrimaryButton>
        </Stack>
      </Stack>
    </div>
  );
};

export default ResetPassword;
