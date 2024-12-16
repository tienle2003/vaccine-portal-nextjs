"use client";
import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import logoHeader from "../../../public/images/Logo.png";
import Image from "next/image";
import Link from "next/link";
import DropDownMenu from "../DropDownMenu";
import dynamic from "next/dynamic";

const AccountMenu = dynamic(() => import("./AccountMenu"), {
  ssr: false,
});

const Header: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box className="flex justify-between items-center px-9 w-full h-20 text-white bg-gradient-to-r from-[#ef4147] via-[#2E3091] to-primary">
      <Stack
        direction="row"
        spacing={2}
        sx={{ justifyContent: "center", alignItems: "center" }}
      >
        <Image className="object-contain" src={logoHeader} alt="logo" />
        <Typography variant="h6" fontWeight="bold">
          CỔNG THÔNG TIN TIÊM CHỦNG COVID-19
        </Typography>
      </Stack>
      <Stack
        direction="row"
        spacing={3}
        sx={{ justifyContent: "center", alignItems: "center" }}
      >
        <Link className="text-lg font-semibold" href="/">
          Trang chủ
        </Link>
        <Link className="text-lg font-semibold" href="/vaccine-registration">
          Đăng ký tiêm
        </Link>
        <Typography
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          className="text-lg font-semibold"
        >
          Tra cứu
          <KeyboardArrowDownIcon />
        </Typography>
        <DropDownMenu
          anchorEl={anchorEl}
          isOpen={open}
          handleClose={handleClose}
        />
        <Link className="text-lg font-semibold" href="/document">
          Tài liệu
        </Link>
        <AccountMenu />
      </Stack>
    </Box>
  );
};

export default Header;
