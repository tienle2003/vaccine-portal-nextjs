import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

import logoFooterLeft from "../../public/images/logo_footer_left.png";
import logoFooterRight from "../../public/images/logo_footer_right.png";
import PrimaryButton from "./CustomButton";

const Footer: React.FC = () => {
  return (
    <Box className="flex justify-between px-4 py-8  w-full text-white bg-primary">
      <Stack>
        <Typography>
          © Bản quyền thuộc{" "}
          <span className="font-bold">
            TRUNG TÂM CÔNG NGHỆ PHÒNG, CHỐNG DỊCH COVID-19 QUỐC GIA
          </span>
        </Typography>
        <Typography>
          {" "}
          Phát triển bởi <span className="text-red-500">Viettel</span>
        </Typography>
        <Image
          priority
          className="object-contain"
          src={logoFooterLeft}
          alt="logo"
        />
      </Stack>
      <Stack spacing={2} alignItems="end">
        <Typography>
          Tải sổ sức khỏe điện tử để đăng ký tiêm và nhận giấy chứng nhận tiêm
        </Typography>
        <Stack direction="row" spacing={2}>
          <PrimaryButton size="small" color="inherit" variant="outlined">
            App tiêm di động (Cho HCM)
          </PrimaryButton>
          <PrimaryButton size="small" color="inherit" variant="outlined">
            App Store
          </PrimaryButton>
          <PrimaryButton size="small" color="inherit" variant="outlined">
            Google play
          </PrimaryButton>
        </Stack>
        <Image
          priority
          className="object-contain"
          src={logoFooterRight}
          alt="logo"
        />
      </Stack>
    </Box>
  );
};

export default Footer;
