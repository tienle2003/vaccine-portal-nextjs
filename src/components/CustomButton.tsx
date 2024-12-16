import { Button, ButtonProps } from "@mui/material";

export default function PrimaryButton(props: ButtonProps) {
  return (
    <Button
      {...props}
      sx={{
        ...props?.sx,
        minWidth: "100px",
        borderRadius: "8px 8px 8px 0",
        fontSize: "18px",
        fontWeight: "bold",
        textTransform: "none",
      }}
    >
      {props.children}
    </Button>
  );
}
