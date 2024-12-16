"use client";
import EditPassword from "@/components/user-account/EditPassword";
import EditUserAccount from "@/components/user-account/EditUserAccount";
import { Stack, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const UserAccount = () => {
  return (
    <Stack spacing={3} pb={3}>
      <Typography variant="body1" fontWeight="bold">
        Thông tin cá nhân <EditIcon />
      </Typography>
      <EditUserAccount />
      <Typography variant="body1" fontWeight="bold">
        Mật khẩu <EditIcon />
      </Typography>
      <EditPassword />
    </Stack>
  );
};

export default UserAccount;
