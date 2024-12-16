import PrimaryButton from "@/components/CustomButton";
import SelectInput from "@/components/SelectInput";
import TextInput from "@/components/TextInput";
import { injectionPointSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Divider,
  IconButton,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import useAddress from "@/api/address.api";
import { VaccinationSite } from "@/types/vaccinationSite";
import {
  useCreateVaccinationSite,
  useUpdateVaccinationSite,
} from "@/api/vaccinationSite.api";
import { handleRequestError } from "@/utils/errorHandler";
import { toast } from "react-toastify";

interface ModalFormProps {
  open: boolean;
  handleClose: () => void;
  rowData?: VaccinationSite | null;
}

const defaultValues = {
  name: "",
  manager: "",
  numberOfTables: 1,
  address: {
    provinceId: 0,
    districtId: 0,
    wardId: 0,
  },
};

type FormData = z.infer<typeof injectionPointSchema>;

const ModalForm: FC<ModalFormProps> = ({ open, handleClose, rowData }) => {
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormData>({
    defaultValues,
    mode: "onChange",
    resolver: zodResolver(injectionPointSchema),
  });

  const handleCloseForm = () => {
    handleClose();
    reset(defaultValues);
  };

  const [prevProvince, setPrevProvince] = useState<number | undefined>();
  const [prevDistrict, setPrevDistrict] = useState<number | undefined>();
  const selectedProvince = watch("address.provinceId");
  const selectedDistrict = watch("address.districtId");
  const { provinces, districts, wards } = useAddress(
    selectedProvince,
    selectedDistrict
  );

  useEffect(() => {
    if (rowData) {
      const {
        name,
        detailAddress,
        manager,
        numberOfTables,
        province,
        district,
        ward,
      } = rowData;
      reset({
        name,
        manager,
        detailAddress,
        numberOfTables: +numberOfTables,
      });
      setPrevProvince(+province.id);
      setPrevDistrict(+district.id);
      setValue("address.provinceId", +province.id);
      setValue("address.districtId", +district.id);
      setValue("address.wardId", +ward.id);
    } else {
      reset(defaultValues);
    }
  }, [rowData, reset, setValue]);

  React.useEffect(() => {
    if (selectedProvince !== prevProvince) {
      setValue("address.districtId", 0);
      setValue("address.wardId", 0);
    }
  }, [prevProvince, setValue, selectedProvince]);

  React.useEffect(() => {
    if (selectedDistrict !== prevDistrict) setValue("address.wardId", 0);
  }, [prevDistrict, setValue, selectedDistrict]);

  const { mutateAsync: updateVaccinationSite } = useUpdateVaccinationSite();
  const { mutateAsync: createVaccinationSite } = useCreateVaccinationSite();

  const onSubmit: SubmitHandler<FormData> = async (payload) => {
    try {
      const { address, ...other } = payload;
      if (rowData) {
        const { message } = await updateVaccinationSite({
          id: rowData.id,
          data: { ...address, ...other },
        });
        toast.success(message);
      } else {
        const { message } = await createVaccinationSite({
          data: { ...address, ...other },
        });
        toast.success(message);
      }
    } catch (error) {
      handleRequestError(error);
    } finally {
      handleCloseForm();
    }
  };
  return (
    <Modal open={open} onClose={handleCloseForm}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          borderRadius: "8px",
          p: 2,
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography fontWeight={600} variant="h6" component="h2">
            Thêm mới điểm tiêm
          </Typography>
          <IconButton onClick={handleCloseForm}>
            <CloseIcon />
          </IconButton>
        </Stack>
        <Divider />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={1.5}>
            <TextInput
              name="name"
              label="Tên địa điểm"
              errMsg={errors.name?.message}
              isError={!!errors.name}
              control={control}
              size="small"
            />
            <TextInput
              name="detailAddress"
              label="Số nhà, tên đường"
              errMsg={errors.detailAddress?.message}
              isError={!!errors.detailAddress}
              control={control}
              size="small"
            />
            <SelectInput
              name="address.provinceId"
              label="Tỉnh/Thành phố"
              size="small"
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
              size="small"
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
              size="small"
              control={control}
              isError={!!errors.address?.wardId}
              errMsg={errors.address?.wardId?.message}
              options={wards.map((ward) => ({
                id: ward.id,
                name: ward.name,
              }))}
              disabled={!selectedDistrict}
            />
            <TextInput
              name="manager"
              label="Người đứng đầu cơ sở"
              errMsg={errors.manager?.message}
              isError={!!errors.manager}
              control={control}
              size="small"
            />
            <TextInput
              name="numberOfTables"
              label="Số bàn tiêm"
              errMsg={errors.numberOfTables?.message}
              isError={!!errors.numberOfTables}
              control={control}
              type="number"
              size="small"
            />
            <Stack direction="row" spacing={1} justifyContent="end">
              <PrimaryButton
                variant="outlined"
                size="small"
                className="text-primary border-primary"
                onClick={handleCloseForm}
              >
                Hủy bỏ
              </PrimaryButton>
              <PrimaryButton
                className="bg-primary"
                variant="contained"
                size="small"
                type="submit"
                disabled={isSubmitting || !isValid}
              >
                {rowData ? "Cập nhật" : "Xác nhận"}
              </PrimaryButton>
            </Stack>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
};

export default ModalForm;
