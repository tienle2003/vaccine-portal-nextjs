import { Stack, TextField } from "@mui/material";
import React from "react";
import { Controller, FieldValues } from "react-hook-form";
import CustomLabel from "./CustomLabel";
import { TextInputProps } from "@/types/input";

const TextInput = <T extends FieldValues>({
  name,
  control,
  label,
  isError,
  errMsg,
  type = "text",
  isRequired = false,
  placeHolder,
  size = "medium",
}: TextInputProps<T>) => {
  return (
    <div>
      <Stack spacing={0.5}>
        {label && <CustomLabel label={label} isRequired={isRequired} />}
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <TextField
              hiddenLabel
              placeholder={placeHolder || label}
              {...field}
              color="success"
              fullWidth
              margin="normal"
              error={isError}
              helperText={errMsg}
              type={type}
              onChange={(e) =>
                field.onChange(
                  type === "number" ? +e.target.value : e.target.value
                )
              }
              size={size}
            />
          )}
        />
      </Stack>
    </div>
  );
};

export default TextInput;
