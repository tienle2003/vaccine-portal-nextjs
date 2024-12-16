import { Grid2 as Grid, Stack, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import React, { Dispatch, SetStateAction } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  vaccineRegistrationSchema,
  CreateVaccineRegistrationDto,
} from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import SelectInput from "@/components/SelectInput";
import TextInput from "@/components/TextInput";
import DateInput from "@/components/DateInput";
import PrimaryButton from "@/components/CustomButton";
import notes from "@/data/notes.json";
import { useRouter } from "next/navigation";

export const defaultValues = {
  priorityType: 1,
  insuaranceNumber: "",
  job: "",
  company: "",
  currentAddress: "",
  preferredDate: "",
  injectionSession: 1,
};

const FirstStepForm: React.FC<{
  handleNextStep: () => void;
  setFormData: Dispatch<SetStateAction<CreateVaccineRegistrationDto>>;
}> = ({ handleNextStep, setFormData }) => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<CreateVaccineRegistrationDto>({
    defaultValues,
    mode: "onChange",
    resolver: zodResolver(vaccineRegistrationSchema),
  });

  const onSubmit: SubmitHandler<CreateVaccineRegistrationDto> = (data) => {
    setFormData(data);
    handleNextStep();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack className="px-9" spacing={3}>
        <Typography variant="body1" fontWeight="bold">
          1. Thông tin người đăng ký tiêm
        </Typography>
        <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid size={{ xs: 4, sm: 4, md: 3 }}>
            <SelectInput
              name="priorityType"
              label="Nhóm ưu tiên"
              isRequired
              control={control}
              isError={!!errors.priorityType}
              errMsg={errors.priorityType?.message}
              options={[
                { id: 1, name: "Nhóm 1" },
                { id: 2, name: "Nhóm 2" },
                { id: 3, name: "Nhóm 3" },
              ]}
            />
          </Grid>
          <Grid size={{ xs: 4, sm: 4, md: 3 }}>
            <TextInput
              name="insuaranceNumber"
              type="text"
              control={control}
              label="Số BHYT"
              errMsg={errors.insuaranceNumber?.message}
              isError={!!errors.insuaranceNumber}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid size={{ xs: 4, sm: 4, md: 3 }}>
            <TextInput
              name="job"
              type="text"
              control={control}
              label="Nghề nghiệp"
              errMsg={errors.job?.message}
              isError={!!errors.job}
            />
          </Grid>
          <Grid size={{ xs: 4, sm: 4, md: 3 }}>
            <TextInput
              name="company"
              type="text"
              control={control}
              label="Đơn vị công tác"
              errMsg={errors.company?.message}
              isError={!!errors.company}
            />
          </Grid>
          <Grid size={{ xs: 4, sm: 4, md: 3 }}>
            <TextInput
              name="currentAddress"
              type="text"
              control={control}
              label="Địa chỉ hiện tại"
              errMsg={errors.currentAddress?.message}
              isError={!!errors.currentAddress}
            />
          </Grid>
        </Grid>
        <Typography variant="body1" fontWeight="bold">
          2. Thông tin đăng ký tiêm chủng
        </Typography>
        <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid size={{ xs: 4, sm: 4, md: 3 }}>
            <DateInput
              name="preferredDate"
              label="Ngày mong muốn được tiêm (dự kiến)"
              control={control}
              isError={!!errors.preferredDate}
              errMsg={errors.preferredDate?.message}
              disabledPast
            />
          </Grid>
          <Grid size={{ xs: 4, sm: 4, md: 3 }}>
            <SelectInput
              name="injectionSession"
              label="Buổi tiêm mong muốn"
              control={control}
              isError={!!errors.injectionSession}
              errMsg={errors.injectionSession?.message}
              options={[
                { id: 1, name: "Sáng" },
                { id: 2, name: "Chiều" },
              ]}
            />
          </Grid>
        </Grid>
        <Stack className="text-red-700">
          <Typography>Lưu ý:</Typography>
          <Stack>
            {notes.map((note) => (
              <Typography component="li" key={note.id}>
                {note.content}
              </Typography>
            ))}
          </Stack>
        </Stack>
        <Stack direction="row" spacing={2} justifyContent="center">
          <PrimaryButton
            variant="outlined"
            className=" border-primary text-primary"
            onClick={() => router.push("register")}
          >
            <ArrowBackIcon />
            Hủy bỏ
          </PrimaryButton>
          <PrimaryButton
            variant="contained"
            className="bg-primary"
            type="submit"
            disabled={isSubmitting || !isValid}
          >
            Tiếp tục <ArrowForwardIcon />
          </PrimaryButton>
        </Stack>
      </Stack>
    </form>
  );
};

export default FirstStepForm;
