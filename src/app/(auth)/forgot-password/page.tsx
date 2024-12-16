"use client";
import { useForgotPasswordMutation } from "@/api/auth.api";
import PrimaryButton from "@/components/CustomButton";
import TextInput from "@/components/TextInput";
import { ForgotPasswordFormData, forgotPasswordSchema } from "@/schemas";
import { handleRequestError } from "@/utils/errorHandler";
import { zodResolver } from "@hookform/resolvers/zod";
import { Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

const defaultValues = {
  email: "",
};

const ForgotPassword = () => {
  const router = useRouter();
  const handleCancel = () => {
    router.back();
  };

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ForgotPasswordFormData>({
    defaultValues,
    mode: "onChange",
    resolver: zodResolver(forgotPasswordSchema),
  });

  const { mutateAsync } = useForgotPasswordMutation();

  const onSubmit: SubmitHandler<ForgotPasswordFormData> = async (data) => {
    try {
      const { message } = await mutateAsync(data);
      toast.success(message);
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
          name="email"
          control={control}
          label="Để khôi phục mật khẩu, vui lòng nhập đúng email bạn đã dùng để đăng
            ký"
          placeHolder="Email"
          isRequired
          errMsg={errors.email?.message}
          isError={!!errors.email}
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
            {isSubmitting ? "Đang gửi..." : "Gửi"}
          </PrimaryButton>
        </Stack>
      </Stack>
    </div>
  );
};

export default ForgotPassword;
