interface CustomLabelProps {
  label: string;
  isRequired?: boolean;
}

import { Typography } from "@mui/material";
import React from "react";

const CustomLabel: React.FC<CustomLabelProps> = ({
  label,
  isRequired = false,
}) => {
  return (
    <Typography
      variant="body1"
      component="label"
      sx={{
        display: "inline-flex",
        alignItems: "center",
      }}
    >
      {label}
      {isRequired && (
        <Typography sx={{ color: "red", ml: 0.5 }}>(*)</Typography>
      )}
    </Typography>
  );
};

export default CustomLabel;
