import { Stack, Typography } from "@mui/material";
import React, { ReactElement } from "react";

interface UserInfoFieldProps {
  title: string;
  content: string;
  icon?: ReactElement;
}

const UserInfoField: React.FC<UserInfoFieldProps> = ({
  title,
  content,
  icon,
}) => {
  return (
    <Stack direction="row" spacing={1}>
      {icon && icon}
      <Stack spacing={0.5}>
        <Typography variant="body1">{title}</Typography>
        <Typography variant="body1" fontWeight={600}>
          {content}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default UserInfoField;
