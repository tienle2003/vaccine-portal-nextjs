import { Grid2 as Grid, Stack } from "@mui/material";
import TextInput from "../TextInput";
import DateInput from "../DateInput";
import SelectInput from "../SelectInput";
import { Gender } from "@/types/gender";
import PrimaryButton from "../CustomButton";
import {
  UserAccountFormData,
  userAccountSchema,
} from "@/schemas/userAccountSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import useAddress from "@/api/address.api";
import { RootState, useAppDispatch, useAppSelector } from "@/app/redux/store";
import { useUpdateUserMutation } from "@/api/user.api";
import { handleRequestError } from "@/utils/errorHandler";
import { toast } from "react-toastify";
import { setUser } from "@/app/redux/userSlide";

const defaultValues: UserAccountFormData = {
  name: "",
  dob: "",
  gender: Gender.MALE,
  address: {
    provinceId: 0,
    districtId: 0,
    wardId: 0,
  },
};

const EditUserAccount: React.FC = () => {
  const userData = useAppSelector((state: RootState) => state.user);
  const { id, name, district, province, ward, dob, gender } = userData;
  const dispatch = useAppDispatch();
  const {
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<UserAccountFormData>({
    defaultValues,
    mode: "onChange",
    resolver: zodResolver(userAccountSchema),
  });

  const [prevProvince, setPrevProvince] = useState<number>(+province?.id);
  const [prevDistrict, setPrevDistrict] = useState<number>(+district?.id);
  const selectedProvince = watch("address.provinceId");
  const selectedDistrict = watch("address.districtId");

  useEffect(() => {
    if (selectedProvince !== prevProvince) {
      setValue("address.districtId", 0);
      setValue("address.wardId", 0);
      setPrevProvince(selectedProvince);
    }
  }, [selectedProvince, setValue, prevProvince]);

  useEffect(() => {
    if (selectedDistrict !== prevDistrict) {
      setValue("address.wardId", 0);
      setPrevDistrict(selectedDistrict);
    }
  }, [selectedDistrict, setValue, prevDistrict]);

  const initializeFormValues = useCallback(() => {
    setPrevProvince(+province?.id);
    setPrevDistrict(+district?.id);
    setValue("address.provinceId", +province?.id);
    setValue("address.districtId", +district?.id);
    setValue("address.wardId", +ward?.id);
    setValue("name", name);
    setValue("gender", gender);
    setValue("dob", dob);
  }, [province, district, ward, name, gender, dob, setValue]);

  useEffect(() => {
    initializeFormValues();
  }, [initializeFormValues]);

  const { provinces, districts, wards } = useAddress(
    selectedProvince,
    selectedDistrict
  );

  const { mutateAsync } = useUpdateUserMutation();

  const onSubmit: SubmitHandler<UserAccountFormData> = async (payload) => {
    const {
      address: { districtId, provinceId, wardId },
      ...other
    } = payload;
    try {
      const { message, data } = await mutateAsync({
        id,
        data: {
          ...other,
          provinceId,
          districtId,
          wardId,
        },
      });
      toast.success(message);
      dispatch(setUser(data));
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
              name="name"
              control={control}
              label="Họ và tên"
              errMsg={errors.name?.message}
              isError={!!errors.name}
            />
          </Grid>
          <Grid size={{ xs: 4, sm: 4, md: 3 }}>
            <DateInput
              name="dob"
              label="Ngày sinh"
              control={control}
              isError={!!errors.dob}
              errMsg={errors.dob?.message}
              disabledFuture
            />
          </Grid>
          <Grid size={{ xs: 4, sm: 4, md: 3 }}>
            <SelectInput
              name="gender"
              label="Giới tính"
              control={control}
              isError={!!errors.gender}
              errMsg={errors.gender?.message}
              options={[
                { id: Gender.MALE, name: "Nam" },
                { id: Gender.FEMALE, name: "Nữ" },
                { id: Gender.OTHER, name: "Khác" },
              ]}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid size={{ xs: 4, sm: 4, md: 3 }}>
            <SelectInput
              name="address.provinceId"
              label="Tỉnh/Thành phố"
              control={control}
              isError={!!errors.address?.districtId}
              errMsg={errors.address?.districtId?.message}
              options={provinces.map((province) => ({
                id: province.id,
                name: province.name,
              }))}
            />
          </Grid>
          <Grid size={{ xs: 4, sm: 4, md: 3 }}>
            <SelectInput
              name="address.districtId"
              label="Quận/Huyện"
              control={control}
              isError={!!errors.address?.districtId}
              errMsg={errors.address?.districtId?.message}
              options={districts.map((district) => ({
                id: district.id,
                name: district.name,
              }))}
              disabled={!selectedProvince}
            />
          </Grid>
          <Grid size={{ xs: 4, sm: 4, md: 3 }}>
            <SelectInput
              name="address.wardId"
              label="Xã/Phường"
              control={control}
              isError={!!errors.address?.wardId}
              errMsg={errors.address?.wardId?.message}
              options={wards.map((ward) => ({
                id: ward.id,
                name: ward.name,
              }))}
              disabled={!selectedDistrict}
            />
          </Grid>
        </Grid>
        <Stack direction="row" spacing={2}>
          <PrimaryButton
            size="small"
            variant="outlined"
            className=" border-primary text-primary"
            onClick={initializeFormValues}
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

export default EditUserAccount;
