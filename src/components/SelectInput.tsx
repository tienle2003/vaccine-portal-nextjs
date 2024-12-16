import {
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import React from "react";
import { Controller, FieldValues } from "react-hook-form";
import CustomLabel from "./CustomLabel";
import { SelectInputProps } from "@/types/input";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const SelectInput = <T extends FieldValues>({
  name,
  control,
  label,
  isError,
  errMsg,
  options,
  disabled = false,
  size = "medium",
  isRequired = false,
  placeHolder,
}: SelectInputProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Stack spacing={0.5}>
          {label && <CustomLabel label={label} isRequired={isRequired} />}
          <FormControl size={size} fullWidth color="success" error={isError}>
            <Select
              {...field}
              disabled={disabled}
              MenuProps={MenuProps}
              displayEmpty
              renderValue={(selected) => {
                if (!selected) {
                  return (
                    <span style={{ color: "#aaa" }}>
                      {placeHolder || label}
                    </span>
                  );
                }
                return (
                  options.find((option) => option.id === selected)?.name ||
                  selected
                );
              }}
            >
              {options.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>{errMsg}</FormHelperText>
          </FormControl>
        </Stack>
      )}
    />
  );
};

export default SelectInput;
