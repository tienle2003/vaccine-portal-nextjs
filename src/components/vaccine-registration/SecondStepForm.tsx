import {
  Checkbox,
  Divider,
  FormControlLabel,
  Stack,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import LocalHospitalOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined";
import React, { ReactElement, useState } from "react";
import PrimaryButton from "@/components/CustomButton";
import { useCreateVaccineRegistration } from "@/api/vaccineRegistration.api";
import { CreateVaccineRegistrationDto } from "@/schemas";
import { toast } from "react-toastify";
import { useUpdateUserMutation } from "@/api/user.api";
import { RootState, useAppDispatch, useAppSelector } from "@/app/redux/store";
import { setUser } from "@/app/redux/userSlide";
import { handleRequestError } from "@/utils/errorHandler";

interface TermsProps {
  id: number;
  icon: ReactElement;
  content: string;
}

const terms: TermsProps[] = [
  {
    id: 1,
    content:
      "1. Tiêm chủng vắc xin là biện pháp phòng chống dịch hiệu quả, tuy nhiên vắc xin phòng COVID-19 có thể không phòng được bệnh hoàn toàn. Người được tiêm chủng vắc xin phòng COVID-19 có thể phòng được bệnh hoặc giảm mức độ nặng nếu mắc bệnh. Tuy nhiên, sau khi tiêm chủng vẫn phải tiếp tục thực hiện nghiêm các biện pháp phòng chống dịch theo quy định.",
    icon: <VerifiedUserIcon className="text-[#2195F2] w-6 h-6" />,
  },
  {
    id: 2,
    content:
      "2. Tiêm chủng vắc xin phòng COVID-19 có thể gây ra một số biểu hiện tại chỗ tiêm hoặc toàn thân như sưng, đau chỗ tiêm, nhức đầu, buồn nôn, sốt, đau cơ…hoặc tai biến nặng sau tiêm chủng. Tiêm vắc xin mũi 2 do Pfizer sản xuất ở người đã tiêm mũi 1 bằng vắc xin AstraZeneca có thể tăng khả năng xảy ra phản ứng thông thường sau tiêm chủng.",
    icon: <VaccinesIcon className="text-[#2195F2] w-6 h-6" />,
  },
  {
    id: 3,
    content:
      "3. Khi có triệu chứng bất thường về sức khỏe, người được tiêm chủng cần đến ngay cơ sở y tế gần nhất để được tư vấn, thăm khám và điều trị kịp thời.",
    icon: <LocalHospitalOutlinedIcon className="text-[#2195F2] w-6 h-6" />,
  },
];

const SecondStepForm: React.FC<{
  handelNextStep: () => void;
  handelBackStep: () => void;
  formData: CreateVaccineRegistrationDto;
}> = ({ handelNextStep, handelBackStep, formData }) => {
  const dispatch = useAppDispatch();
  const { userId } = useAppSelector((state: RootState) => state.auth);
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
  const { mutateAsync: registerVaccineAsync } = useCreateVaccineRegistration();
  const { mutateAsync: updateUserAsync } = useUpdateUserMutation();
  const handleSubmit = async () => {
    try {
      if (!isConfirmed) return;
      const { insuaranceNumber, ...other } = formData;
      if (insuaranceNumber && userId) {
        const { statusCode, data } = await updateUserAsync({
          id: userId,
          data: { healthInsuranceNumber: insuaranceNumber },
        });
        if (statusCode === 200) {
          dispatch(setUser(data));
        }
      }
      const { message } = await registerVaccineAsync(other);
      toast.success(message);
      handelNextStep();
    } catch (error) {
      handleRequestError(error);
    }
  };
  return (
    <Stack className="px-9" spacing={2}>
      <Stack spacing={2}>
        {terms.map((term) => (
          <Stack spacing={1} direction="row" alignItems="center" key={term.id}>
            {term.icon}
            <Typography variant="body1">{term.content}</Typography>
          </Stack>
        ))}
      </Stack>
      <Divider />
      <Stack spacing={2} direction="row" alignItems="center">
        <Typography variant="body1">
          Sau khi đã đọc các thông tin nêu trên, tôi đã hiểu về các nguy cơ và:{" "}
        </Typography>
        <FormControlLabel
          control={
            <Checkbox
              checked={isConfirmed}
              onChange={(e) => setIsConfirmed(e.target.checked)}
            />
          }
          label="Đồng ý tiêm chủng"
        />
      </Stack>
      <Stack direction="row" spacing={2} justifyContent="center">
        <PrimaryButton
          variant="outlined"
          className="text-primary border-primary"
          onClick={handelBackStep}
        >
          <ArrowBackIcon />
          Hủy bỏ
        </PrimaryButton>
        <PrimaryButton
          variant="contained"
          className="bg-primary"
          type="submit"
          disabled={!isConfirmed}
          onClick={handleSubmit}
        >
          Tiếp tục <ArrowForwardIcon />
        </PrimaryButton>
      </Stack>
    </Stack>
  );
};

export default SecondStepForm;
