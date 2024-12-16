import { statusLabelMap, Status, statusColorMap } from "@/types/statusEnum";
import { Chip, Tooltip } from "@mui/material";
import React from "react";

interface RegistrationStatusProps {
  status: Status;
}

const RegistrationStatus: React.FC<RegistrationStatusProps> = ({ status }) => {
  return (
    <Tooltip title={statusLabelMap[status]} placement="top" arrow>
      <Chip
        label={statusLabelMap[status]}
        color={statusColorMap[status]}
        variant="outlined"
      />
    </Tooltip>
  );
};

export default RegistrationStatus;
