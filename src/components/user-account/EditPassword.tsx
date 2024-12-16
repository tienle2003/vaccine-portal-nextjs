import React from "react";
import { Grid2 as Grid, Stack } from "@mui/material";
import TextInput from "../TextInput";
import { SubmitHandler, useForm } from "react-hook-form";
import { changePasswordSchema, ChangePasswordFormData } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import PrimaryButton from "../CustomButton";
import { useUpdatePasswordMutation } from "@/api/user.api";
import { handleRequestError } from "@/utils/errorHandler";
import { toast } from "react-toastify";

const defaultValues = {
  currentPassword: "",
  newPassword: "",
  confirmNewPassword: "",
};

const EditPassword: React.FC = () => {
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ChangePasswordFormData>({
    defaultValues,
    mode: "onChange",
    resolver: zodResolver(changePasswordSchema),
  });

  const { mutateAsync } = useUpdatePasswordMutation();
  const onSubmit: SubmitHandler<ChangePasswordFormData> = async (payload) => {
    try {
      const { message } = await mutateAsync(payload);
      toast.success(message);
      reset(defaultValues);
    } catch (error) {
      handleRequestError(error);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack pl={2} spacing={2}>
        <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid size={{ xs: 4, sm: 4, md: 3 }}>
            <TextInput
              name="currentPassword"
              control={control}
              label="Mật khẩu hiện tại"
              placeHolder="Mật khẩu mới"
              type="password"
              isRequired
              errMsg={errors.currentPassword?.message}
              isError={!!errors.currentPassword}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid size={{ xs: 4, sm: 4, md: 3 }}>
            <TextInput
              name="newPassword"
              control={control}
              label="Mật khẩu mới"
              type="password"
              isRequired
              errMsg={errors.newPassword?.message}
              isError={!!errors.newPassword}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid size={{ xs: 4, sm: 4, md: 3 }}>
            <TextInput
              name="confirmNewPassword"
              control={control}
              label="Xác nhận lại mật khẩu"
              type="password"
              isRequired
              errMsg={errors.confirmNewPassword?.message}
              isError={!!errors.confirmNewPassword}
            />
          </Grid>
        </Grid>
        <Stack direction="row" spacing={2}>
          <PrimaryButton
            size="small"
            variant="outlined"
            className=" border-primary text-primary"
            onClick={() => reset(defaultValues)}
          >
            Hủy bỏ
          </PrimaryButton>
          <PrimaryButton
            size="small"
            variant="contained"
            className="bg-primary"
            type="submit"
            disabled={isSubmitting || !isValid}
          >
            Lưu
          </PrimaryButton>
        </Stack>
      </Stack>
    </form>
  );
};

export default EditPassword;
