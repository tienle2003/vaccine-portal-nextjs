import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";

interface OverlayLoadingProps {
  message?: string;
}

const OverlayLoading: React.FC<OverlayLoadingProps> = ({ message }) => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
    >
      <CircularProgress size={100} />
      {message && (
        <Typography variant="h6" color="white">
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default OverlayLoading;
