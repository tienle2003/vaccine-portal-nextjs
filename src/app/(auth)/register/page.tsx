"use client";
import { Typography } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { registerSchema } from "@/schemas";
import PrimaryButton from "@/components/CustomButton";
import TextInput from "@/components/TextInput";
import DateInput from "@/components/DateInput";
import React from "react";
import SelectInput from "@/components/SelectInput";
import { useRouter } from "next/navigation";
import useAddress from "@/api/address.api";
import { useRegisterMutation } from "@/api/auth.api";
import { toast } from "react-toastify";
import { Gender } from "@/types/gender";
import { handleRequestError } from "@/utils/errorHandler";

const defaultValues = {
  idCardNumber: "",
  email: "",
  password: "",
  name: "",
  dob: "",
  gender: Gender.MALE,
  address: {
    provinceId: 0,
    districtId: 0,
    wardId: 0,
  },
};

export type RegisterFormData = z.infer<typeof registerSchema>;

export default function Register() {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm<RegisterFormData>({
    defaultValues,
    mode: "onChange",
    resolver: zodResolver(registerSchema),
  });
  const selectedProvince = watch("address.provinceId");
  const selectedDistrict = watch("address.districtId");

  React.useEffect(() => {
    if (selectedProvince !== 0) {
      setValue("address.districtId", 0);
      setValue("address.wardId", 0);
    }
  }, [selectedProvince, setValue]);

  React.useEffect(() => {
    if (selectedDistrict !== 0) setValue("address.wardId", 0);
  }, [selectedDistrict, setValue]);

  const { provinces, districts, wards } = useAddress(
    selectedProvince,
    selectedDistrict
  );

  const { mutateAsync } = useRegisterMutation();
  const onSubmit: SubmitHandler<RegisterFormData> = async (payload) => {
    try {
      const { message } = await mutateAsync(payload);
      toast.success(message);
      router.push("/login");
    } catch (error) {
      handleRequestError(error);
    }
  };
  return (
    <div className="w-full overflow-y-auto">
      <div className="m-36">
        <Typography
          variant="h4"
          fontWeight="700"
          align="center"
          marginBottom={"1.5rem"}
          sx={{
            lineHeight: "42px",
          }}
        >
          Đăng ký tài khoản
        </Typography>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            name="idCardNumber"
            control={control}
            label="Số CMND/CCCD"
            isRequired
            errMsg={errors.idCardNumber?.message}
            isError={!!errors.idCardNumber}
          />
          <TextInput
            name="email"
            control={control}
            label="Email"
            isRequired
            errMsg={errors.email?.message}
            isError={!!errors.email}
          />
          <TextInput
            name="password"
            type="password"
            control={control}
            label="Mật khẩu"
            isRequired
            errMsg={errors.password?.message}
            isError={!!errors.password}
          />
          <TextInput
            name="name"
            control={control}
            label="Họ tên"
            isRequired
            errMsg={errors.name?.message}
            isError={!!errors.name}
          />
          <DateInput
            name="dob"
            label="Ngày sinh"
            isRequired
            control={control}
            isError={!!errors.dob}
            errMsg={errors.dob?.message}
            disabledFuture
          />
          <SelectInput
            name="gender"
            label="Giới tính"
            isRequired
            control={control}
            isError={!!errors.gender}
            errMsg={errors.gender?.message}
            options={[
              { id: Gender.MALE, name: "Nam" },
              { id: Gender.FEMALE, name: "Nữ" },
              { id: Gender.OTHER, name: "Khác" },
            ]}
          />
          <SelectInput
            name="address.provinceId"
            label="Tỉnh/Thành phố"
            isRequired
            control={control}
            isError={!!errors.address?.provinceId}
            errMsg={errors.address?.provinceId?.message}
            options={provinces.map((province) => ({
              id: province.id,
              name: province.name,
            }))}
          />
          <SelectInput
            name="address.districtId"
            label="Quận/Huyện"
            isRequired
            control={control}
            isError={!!errors.address?.districtId}
            errMsg={errors.address?.districtId?.message}
            options={districts.map((district) => ({
              id: district.id,
              name: district.name,
            }))}
            disabled={!selectedProvince}
          />
          <SelectInput
            name="address.wardId"
            label="Xã/Phường"
            placeHolder="Xã/Phường"
            isRequired
            control={control}
            isError={!!errors.address?.wardId}
            errMsg={errors.address?.wardId?.message}
            options={wards.map((ward) => ({
              id: ward.id,
              name: ward.name,
            }))}
            disabled={!selectedDistrict}
          />
          <PrimaryButton
            disabled={isSubmitting || !isValid}
            type="submit"
            variant="outlined"
            sx={{ marginLeft: "auto", display: "flex" }}
          >
            Tiếp tục
          </PrimaryButton>
        </form>
      </div>
    </div>
  );
}
