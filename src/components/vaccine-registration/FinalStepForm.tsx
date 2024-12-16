import { Grid2 as Grid, Stack, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import React from "react";
import PrimaryButton from "@/components/CustomButton";
import UserInfoField from "../vaccine-certificate/UserInfoField";
import Link from "next/link";
import { RootState, useAppSelector } from "@/app/redux/store";
import { Gender } from "@/types/gender";

const FinalStepForm: React.FC = () => {
  const {
    name,
    dob,
    gender,
    healthInsuranceNumber,
    idCardNumber,
    province,
    district,
    ward,
  } = useAppSelector((state: RootState) => state.user);
  return (
    <Stack className="px-9" spacing={4}>
      <Stack spacing={2} direction="column">
        {" "}
        <Typography variant="h6" fontWeight="bold" textAlign="center">
          Đăng ký tiêm chủng COVID-19 thành công. Mã đặt tiêm của bạn là {"   "}
          <Typography
            variant="inherit"
            component="span"
            ml={0.5}
            className="text-red-600"
          >
            0120211103501237
          </Typography>
        </Typography>
        <Typography variant="body1" textAlign="center">
          Cảm ơn quý khách đã đăng ký tiêm chủng vắc xin COVID-19. Hiện tại Bộ y
          tế đang tiến hành thu thập nhu cầu và thông tin để lập danh sách đối
          tượng đăng ký tiêm vắc xin COVID-19 theo từng địa bàn. Chúng tôi sẽ
          liên hệ với quý khách theo số điện thoại{" "}
          <Typography component="span" className="text-blue-600">
            0123456789
          </Typography>{" "}
          khi có kế hoạch tiêm trong thời gian sớm nhất.
        </Typography>
        <Typography textAlign="center">
          Mời bạn tải ứng dụng &quot;SỔ SỨC KHỎE ĐIỆN TỬ&quot; tại{" "}
          <Typography
            component="span"
            className="text-red-600 underline hover:underline-offset-4"
          >
            https://hssk.kcb.vn/#/sskdt
          </Typography>{" "}
          để theo dõi kết quả đăng ký tiêm và nhận chứng nhận tiêm chủng
          COVID-19
        </Typography>
      </Stack>
      <Grid container spacing={2} size={12} width="100%" mt={3}>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <UserInfoField title="Họ và tên" content={name} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <UserInfoField title="Ngày sinh" content={dob} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <UserInfoField
            title="Giới tính"
            content={
              gender === Gender.MALE ? "Nam" : Gender.FEMALE ? "Nữ" : "Khác"
            }
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <UserInfoField
            title="Số CMND/CCCD/Mã định danh công dân"
            content={idCardNumber}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <UserInfoField
            title="Số thẻ BHYT"
            content={healthInsuranceNumber || "Không có"}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}></Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <UserInfoField title="Tỉnh/Thành phố" content={province?.name} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <UserInfoField title="Quận/Huyện" content={district?.name} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <UserInfoField title="Xã/Phường" content={ward?.name} />
        </Grid>
      </Grid>
      <Stack direction="row" spacing={2} justifyContent="center">
        <PrimaryButton
          variant="outlined"
          className="text-primary border-primary"
        >
          <ArrowBackIcon />
          <Link href="/">Trang chủ</Link>
        </PrimaryButton>
        <PrimaryButton variant="contained" className="bg-primary" type="submit">
          Xuất thông tin <ArrowForwardIcon />
        </PrimaryButton>
      </Stack>
    </Stack>
  );
};

export default FinalStepForm;
