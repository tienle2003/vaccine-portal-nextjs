import {
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";

import GroupIcon from "@mui/icons-material/Group";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import React, { ReactNode } from "react";
import { useRouter } from "next/navigation";

interface DropDownMenuProps {
  anchorEl: HTMLElement | null;
  isOpen: boolean;
  handleClose: () => void;
}

interface DropDownItemProps {
  title: string;
  subTitle?: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  to: string;
}

const DropDownItem: React.FC<DropDownItemProps> = ({
  title,
  endIcon,
  startIcon,
  subTitle,
  to,
}) => {
  const router = useRouter();
  return (
    <MenuItem onClick={() => router.push(to)}>
      <Stack direction="row" spacing={2} alignItems="center">
        {startIcon && <ListItemIcon>{startIcon}</ListItemIcon>}{" "}
        <ListItemText>
          <Typography variant="body1" fontWeight="600">
            {title}
          </Typography>
          <Typography>{subTitle}</Typography>
        </ListItemText>
        {endIcon && <ListItemIcon>{endIcon}</ListItemIcon>}
      </Stack>
    </MenuItem>
  );
};

const dropDownItems: DropDownItemProps[] = [
  {
    title: "Tra cứu chứng nhận tiêm",
    subTitle: "Cập nhật nhanh và chính xác nhất",
    startIcon: <GroupIcon fontSize="large" color="secondary" />,
    endIcon: <ArrowForwardIcon fontSize="large" color="secondary" />,
    to: "/vaccine-certificate",
  },
  {
    title: "Tra cứu kết quả đăng ký",
    subTitle: "Cập nhật nhanh và chính xác nhất",
    startIcon: <GroupIcon fontSize="large" color="info" />,
    endIcon: <ArrowForwardIcon fontSize="large" color="info" />,
    to: "/registration-result",
  },
];

const DropDownMenu: React.FC<DropDownMenuProps> = ({
  anchorEl,
  isOpen,
  handleClose,
}) => {
  return (
    <Menu
      sx={{
        "& .MuiPaper-root": {
          mt: 2,
          padding: "10px",
          borderRadius: "12px",
        },
      }}
      id="basic-menu"
      anchorEl={anchorEl}
      open={isOpen}
      onClose={handleClose}
      MenuListProps={{
        "aria-labelledby": "basic-button",
      }}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      {dropDownItems.map((dropDownItem, index) => (
        <DropDownItem
          key={index}
          title={dropDownItem.title}
          subTitle={dropDownItem.subTitle}
          startIcon={dropDownItem.startIcon}
          endIcon={dropDownItem.endIcon}
          to={dropDownItem.to}
        />
      ))}
    </Menu>
  );
};

export default DropDownMenu;
