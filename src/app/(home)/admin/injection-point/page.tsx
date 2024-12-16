"use client";
import PrimaryButton from "@/components/CustomButton";
import SelectInput from "@/components/SelectInput";
import vaccinationPoints from "@/data/vaccinationPoint.json";
import { Box, Chip, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from "@mui/icons-material/Add";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addressSchema } from "@/schemas";
import { z } from "zod";
import CustomTable from "@/components/CustomTable";
import { Column, Data } from "@/types/table";
import ModalForm from "@/components/admin/injection-point/FormModal";
import useAddress from "@/api/address.api";
import { useVaccinationSitesQuery } from "@/api/vaccinationSite.api";
import { VaccinationSite } from "@/types/vaccinationSite";

const defaultValues = {
  provinceId: 0,
  districtId: 0,
  wardId: 0,
};

const PAGE_SIZE = 5;

type FormData = z.infer<typeof addressSchema>;

const InjectionPoint = () => {
  const [open, setOpen] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState<VaccinationSite | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [vaccinationSites, setVaccinationSites] = useState<Data[] | null>();
  const [province, setProvince] = useState<string | number>("");
  const [district, setDistrict] = useState<string | number>("");
  const [ward, setWard] = useState<string | number>("");
  const handleOpen = () => setOpen(true);
  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };
  const handleClose = () => {
    setSelectedRow(null);
    setOpen(false);
  };
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormData>({
    defaultValues,
    mode: "onChange",
    resolver: zodResolver(addressSchema),
  });

  const { provinceId: selectedProvince, districtId: selectedDistrict } =
    watch();

  const { data } = useVaccinationSitesQuery(
    currentPage,
    PAGE_SIZE,
    province,
    district,
    ward
  );

  const { items, totalPages } = data?.data || {};

  useEffect(() => {
    if (selectedProvince !== 0) {
      setValue("districtId", 0);
      setValue("wardId", 0);
    }
  }, [selectedProvince, setValue]);

  useEffect(() => {
    if (selectedDistrict !== 0) setValue("wardId", 0);
  }, [selectedDistrict, setValue]);

  useEffect(() => {
    if (items) {
      const vaccinationSites = items.map((vaccinationSite: VaccinationSite) => {
        const { province, district, ward, ...other } = vaccinationSite;
        return {
          ...other,
          province: province,
          district: district,
          ward: ward,
        };
      });
      setVaccinationSites(vaccinationSites);
    }
  }, [items]);

  const { provinces, districts, wards } = useAddress(
    selectedProvince,
    selectedDistrict
  );

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const { provinceId, districtId, wardId } = data;
    setProvince(provinceId);
    setDistrict(districtId);
    setWard(wardId);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setProvince("");
    setDistrict("");
    setWard("");
    setCurrentPage(1);
    reset(defaultValues);
  };

  const handleOpenUpdateForm = (row: VaccinationSite) => {
    setSelectedRow(row);
    setOpen(true);
  };

  const acctionCulumn = [
    {
      id: "accion",
      label: "Hành động",
      minWidth: 100,
      render: (row: VaccinationSite) => (
        <Chip
          label="Cập nhật"
          variant="outlined"
          color="info"
          onClick={() => handleOpenUpdateForm(row)}
        />
      ),
    },
  ];
  const columns: Column[] = vaccinationPoints.columns.concat(acctionCulumn);
  return (
    <Stack spacing={2}>
      <Stack>
        <PrimaryButton
          onClick={handleOpen}
          variant="contained"
          className="bg-primary ml-auto flex items-center justify-between"
        >
          <AddIcon />
          Thêm mới
        </PrimaryButton>
      </Stack>
      <Stack
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        direction="row"
        alignItems="flex-start"
        justifyContent="center"
        spacing={2}
      >
        <Box width={260}>
          <SelectInput
            name="provinceId"
            placeHolder="Tỉnh/Thành phố"
            size="small"
            control={control}
            isError={!!errors.provinceId}
            errMsg={errors.provinceId?.message}
            options={provinces.map((province) => ({
              id: province.id,
              name: province.name,
            }))}
          />
        </Box>
        <Box width={260}>
          <SelectInput
            name="districtId"
            placeHolder="Quận/Huyện"
            size="small"
            control={control}
            isError={!!errors.districtId}
            errMsg={errors.districtId?.message}
            options={districts.map((district) => ({
              id: district.id,
              name: district.name,
            }))}
            disabled={!selectedProvince}
          />
        </Box>
        <Box width={260}>
          <SelectInput
            name="wardId"
            placeHolder="Xã/Phường"
            size="small"
            control={control}
            isError={!!errors.wardId}
            errMsg={errors.wardId?.message}
            options={wards.map((ward) => ({
              id: ward.id,
              name: ward.name,
            }))}
            disabled={!selectedDistrict}
          />
        </Box>
        <PrimaryButton
          disabled={isSubmitting || !isValid}
          type="submit"
          size="small"
          variant="contained"
          className="bg-primary text-white flex items-center justify-between"
        >
          <SearchIcon />
          Tìm kiếm
        </PrimaryButton>
        <PrimaryButton
          size="small"
          variant="contained"
          color="error"
          className="flex items-center justify-around"
          onClick={handleClearFilters}
        >
          <ClearIcon />
          Xóa
        </PrimaryButton>
      </Stack>
      <CustomTable
        columns={columns}
        rows={vaccinationSites || []}
        onPageChange={handleChangePage}
        rowsPerPage={PAGE_SIZE}
        totalPages={totalPages || 0}
      />
      <ModalForm open={open} handleClose={handleClose} rowData={selectedRow} />
    </Stack>
  );
};

export default InjectionPoint;
