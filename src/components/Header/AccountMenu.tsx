import { useUser } from "@/api/user.api";
import { RootState, useAppDispatch, useAppSelector } from "@/app/redux/store";
import {
  CircularProgress,
  Divider,
  Fade,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import PrimaryButton from "../CustomButton";
import { logout } from "@/app/redux/authSlide";
import { useRouter } from "next/navigation";
import { Role } from "@/types/role";
import { setUser, clearUser } from "@/app/redux/userSlide";
import { useLogoutMutation } from "@/api/auth.api";
import { handleRequestError } from "@/utils/errorHandler";

const AccountMenu: React.FC = () => {
  const { userId, isAuthenticated, refreshToken } = useAppSelector(
    (state: RootState) => state.auth
  );
  const { name, role } = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { mutateAsync } = useLogoutMutation();
  const handleLogout = async () => {
    try {
      await mutateAsync(refreshToken || "");
      dispatch(logout());
      dispatch(clearUser());
      router.push("/login");
    } catch (error) {
      handleRequestError(error);
    }
  };

  const { data, isLoading } = useUser(userId);
  useEffect(() => {
    if (isAuthenticated && data) {
      dispatch(setUser(data?.data));
    }
  }, [data, isAuthenticated, dispatch]);
  return isAuthenticated && data ? (
    <>
      <Typography onClick={handleClick} className="text-xl font-bold">
        {isLoading ? <CircularProgress size={24} color="secondary" /> : name}
      </Typography>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        {role === Role.ADMIN && [
          <MenuItem
            key="injection-point"
            onClick={() => router.push("/admin/injection-point")}
          >
            Vaccination point
          </MenuItem>,
          <MenuItem
            key="vaccine-registration"
            onClick={() => router.push("/admin/vaccine-registration")}
          >
            Vaccine Registration
          </MenuItem>,
          <MenuItem
            key="document"
            onClick={() => router.push("/admin/document")}
          >
            Document
          </MenuItem>,
        ]}
        <MenuItem onClick={() => router.push("/user-account")}>
          Profile
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  ) : (
    <PrimaryButton
      type="submit"
      variant="contained"
      color="inherit"
      className="bg-white text-primary"
      onClick={() => router.push("/login")}
    >
      ĐĂNG NHẬP
    </PrimaryButton>
  );
};

export default AccountMenu;
