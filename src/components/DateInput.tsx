import { Stack } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import React from "react";
import { Controller, FieldValues } from "react-hook-form";
import CustomLabel from "./CustomLabel";
import { DateInputProps } from "@/types/input";

const DateInput = <T extends FieldValues>({
  name,
  label,
  control,
  isError,
  errMsg,
  disabledFuture = false,
  disabledPast = false,
  isRequired = false,
}: DateInputProps<T>) => {
  return (
    <Stack spacing={0.5}>
      {label && <CustomLabel label={label} isRequired={isRequired} />}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              format="DD/MM/YYYY"
              disableFuture={disabledFuture}
              disablePast={disabledPast}
              value={field.value ? dayjs(field.value) : null}
              inputRef={field.ref}
              onChange={(date) => {
                field.onChange(date ? dayjs(date).toDate() : null);
              }}
              sx={{ with: "100%" }}
              slotProps={{
                textField: {
                  color: "success",
                  error: isError,
                  helperText: errMsg,
                },
              }}
            />
          </LocalizationProvider>
        )}
      />
    </Stack>
  );
};

export default DateInput;
