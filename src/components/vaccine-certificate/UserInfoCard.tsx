import { Box, Paper, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import BrandingWatermarkIcon from "@mui/icons-material/BrandingWatermark";
import Image from "next/image";
import React from "react";

import UserInfoField from "./UserInfoField";
import logoHeader from "../../../public/images/Logo.png";
import QR from "../../../public/images/QR.png";
import { RootState, useAppSelector } from "@/app/redux/store";

const UserInfoCard: React.FC<{ vaccineDoses: number }> = ({ vaccineDoses }) => {
  const { name, dob, idCardNumber } = useAppSelector(
    (state: RootState) => state.user
  );
  const getBackgroundColor = (vaccineDoses: number) => {
    if (vaccineDoses == 0) return "#D32F2F";
    if (vaccineDoses == 1) return "#FBC02D";
    return "#43A047";
  };
  return (
    <Paper
      className="min-w-96 h-fit p-6 rounded-lg rounded-bl-none flex flex-col items-center space-y-6"
      sx={{ backgroundColor: getBackgroundColor(vaccineDoses) }}
    >
      <Image
        className="object-contain"
        src={logoHeader}
        alt="logo"
        height={100}
        width={100}
      />
      <Typography variant="h5" className="text-white text-center font-semibold">
        ĐÃ TIÊM {vaccineDoses} MŨI VẮC XIN
      </Typography>
      <Image className="object-contain" src={QR} alt="logo" />
      <Box className="w-full rounded-lg rounded-bl-none bg-white p-4 space-y-4">
        <UserInfoField title="Họ và tên" content={name} icon={<PersonIcon />} />
        <UserInfoField
          title="Ngày sinh"
          content={dob}
          icon={<CalendarMonthIcon />}
        />
        <UserInfoField
          title="Số CMND/CCCD"
          content={idCardNumber}
          icon={<BrandingWatermarkIcon />}
        />
      </Box>
    </Paper>
  );
};

export default UserInfoCard;
