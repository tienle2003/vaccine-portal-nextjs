"use client";
import React, { useEffect, useState } from "react";
import { Box, Paper, Stack, Typography } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

import { addressSchema } from "@/schemas";
import vaccinationPoints from "@/data/vaccinationPoint.json";
import SelectInput from "../SelectInput";
import PrimaryButton from "../CustomButton";
import CustomTable from "../CustomTable";
import useAddress from "@/api/address.api";
import { useVaccinationSitesQuery } from "@/api/vaccinationSite.api";
import { VaccinationSite } from "@/types/vaccinationSite";
import { Data } from "@/types/table";

const defaultValues = {
  provinceId: 0,
  districtId: 0,
  wardId: 0,
};

const PAGE_SIZE = 4;

type FormData = z.infer<typeof addressSchema>;

const VaccinationPointsTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [province, setProvince] = useState<string | number>("");
  const [district, setDistrict] = useState<string | number>("");
  const [ward, setWard] = useState<string | number>("");
  const { data } = useVaccinationSitesQuery(
    currentPage,
    PAGE_SIZE,
    province,
    district,
    ward
  );
  const [vaccinationSites, setVaccinationSites] = useState<Data[] | null>();
  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (data?.data?.items) {
      const vaccinationSites = data?.data?.items.map(
        (vaccinationSite: VaccinationSite) => {
          const { province, district, ward, ...other } = vaccinationSite;
          return {
            ...other,
            province: province.name,
            district: district.name,
            ward: ward.name,
          };
        }
      );
      setVaccinationSites(vaccinationSites);
    }
  }, [data]);

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormData>({
    defaultValues,
    mode: "onChange",
    resolver: zodResolver(addressSchema),
  });

  const { provinceId: selectedProvince, districtId: selectedDistrict } =
    watch();

  useEffect(() => {
    if (selectedProvince !== 0) {
      setValue("districtId", 0);
      setValue("wardId", 0);
    }
  }, [selectedProvince, setValue]);

  useEffect(() => {
    if (selectedDistrict !== 0) setValue("wardId", 0);
  }, [selectedDistrict, setValue]);

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

  return (
    <Box sx={{ paddingX: "36px" }}>
      <Paper elevation={4} className="px-3">
        <Typography variant="h5" fontWeight="bold" className="py-4 px-2">
          Tra cứu điểm tiêm theo địa bàn
        </Typography>
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
          columns={vaccinationPoints.columns}
          rows={(vaccinationSites as unknown as Data[]) || []}
          rowsPerPage={PAGE_SIZE}
          totalPages={data?.data?.totalPages || 0}
          onPageChange={handleChangePage}
        />
      </Paper>
    </Box>
  );
};

export default VaccinationPointsTable;
