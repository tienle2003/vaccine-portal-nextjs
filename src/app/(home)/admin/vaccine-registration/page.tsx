"use client";
import PrimaryButton from "@/components/CustomButton";
import { Box, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Data } from "@/types/table";
import TextInput from "@/components/TextInput";
import { Status } from "@/types/statusEnum";
import {
  useUpdateVaccineRegistration,
  useVaccineRegistrationQuery,
} from "@/api/vaccineRegistration.api";
import { handleRequestError } from "@/utils/errorHandler";
import { toast } from "react-toastify";
import VaccineRegistrationTable from "@/components/admin/vaccine-registration/VaccineRegistrationTable";
import { vaccineRegistrationMap } from "@/utils/vaccineRegistrationMap";

const PAGE_SIZE = 5;

const defaultValues = {
  name: "",
  identityCard: "",
};

const registrationResultSchema = z.object({
  name: z.string().nullable().optional(),
  identityCard: z
    .union([
      z.string().regex(/^[0-9]{9}$|^[0-9]{12}$/, "Số CMND/CCCD không hợp lệ"),
      z.literal(""), // Cho phép chuỗi rỗng
    ])
    .optional()
    .nullable(),
});

type FormData = z.infer<typeof registrationResultSchema>;

const VaccineRegistration = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormData>({
    defaultValues,
    mode: "onChange",
    resolver: zodResolver(registrationResultSchema),
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [vaccineRegistration, setVaccineRegistrations] = useState<
    Data[] | null
  >();
  const [name, setName] = useState<string>("");
  const [identityCard, setIdentityCard] = useState<string>("");

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const { name, identityCard } = data;
    setName(name || "");
    setIdentityCard(identityCard || "");
    setCurrentPage(1);
  };

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };

  const { mutateAsync } = useUpdateVaccineRegistration();
  const handleStatusChange = async (id: number, status: Status) => {
    try {
      const { message } = await mutateAsync({ id, status });
      toast.success(message);
    } catch (error) {
      handleRequestError(error);
    }
  };

  const { data } = useVaccineRegistrationQuery(
    currentPage,
    PAGE_SIZE,
    name,
    identityCard
  );

  const { items, totalPages } = data?.data || {};

  useEffect(() => {
    if (items) {
      const vaccinationResults = vaccineRegistrationMap(items);
      setVaccineRegistrations(vaccinationResults);
    }
  }, [items]);

  return (
    <Stack spacing={2}>
      <Stack
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        direction="row"
        alignItems="flex-start"
        justifyContent="center"
        spacing={2}
      >
        <Box width={260}>
          <TextInput
            placeHolder="Họ và tên"
            name="name"
            isError={!!errors.name}
            errMsg={errors.name?.message}
            control={control}
            size="small"
          />
        </Box>
        <Box width={260}>
          <TextInput
            placeHolder="Số CMND/CCCD"
            name="identityCard"
            isError={!!errors.identityCard}
            errMsg={errors.identityCard?.message}
            control={control}
            size="small"
          />
        </Box>
        <PrimaryButton
          disabled={isSubmitting || !isValid}
          type="submit"
          size="small"
          variant="contained"
          className="bg-primary flex items-center justify-between"
        >
          <SearchIcon />
          Tìm kiếm
        </PrimaryButton>
      </Stack>
      <VaccineRegistrationTable
        data={vaccineRegistration || []}
        handleStatusChange={handleStatusChange}
        onPageChange={handleChangePage}
        totalPages={totalPages || 0}
      />
    </Stack>
  );
};

export default VaccineRegistration;
