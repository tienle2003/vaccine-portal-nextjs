"use client";
import { Grid2 as Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import PrimaryButton from "@/components/CustomButton";
import CustomTable from "@/components/CustomTable";
import vaccinationRecordData from "@/data/vaccinationRecord.json";
import UserInfoCard from "@/components/vaccine-certificate/UserInfoCard";
import UserInfoField from "@/components/vaccine-certificate/UserInfoField";
import Link from "next/link";
import { RootState, useAppSelector } from "@/app/redux/store";
import { useVaccinationResults } from "@/api/vaccinationResult.api";
import { Data } from "@/types/table";
import { VaccinationResult } from "@/types/vaccinationResult";
import dayjs from "dayjs";

const PAGE_SIZE = 5;

const VaccinceCertificate = () => {
  const {
    name,
    dob,
    idCardNumber,
    healthInsuranceNumber,
    province,
    district,
    ward,
  } = useAppSelector((state: RootState) => state.user);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { data } = useVaccinationResults(currentPage, PAGE_SIZE);
  const [vaccinationResults, setVaccinationResults] = useState<Data[] | null>();
  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };
  const { totalPages, items, totalItems } = data?.data || {};
  useEffect(() => {
    if (items) {
      const vaccinationResults = items.map(
        (vaccinationResult: VaccinationResult, index) => {
          const {
            vaccinationSite: { name: vaccinationSite },
            vaccine: { name: vaccineName, batchNumber },
            injectionDate,
          } = vaccinationResult;
          return {
            id: index + 1,
            injectionDate: dayjs(injectionDate).format("DD/MM/YYYY"),
            vaccinationSite,
            vaccineName,
            batchNumber,
          };
        }
      );
      setVaccinationResults(vaccinationResults);
    }
  }, [data, items]);
  return (
    <Stack direction="row" spacing={2}>
      <Stack className="px-2 w-full" alignItems="center">
        <Typography variant="body1">
          CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
        </Typography>
        <Typography variant="body1" fontWeight={600}>
          Độc lập - Tự do - Hạnh phúc
        </Typography>
        <Typography variant="h5" fontWeight={600} mt={3}>
          CHỨNG NHẬN TIÊM CHỦNG COVID-19
        </Typography>
        <Grid container spacing={2} size={12} width="100%" mt={3}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <UserInfoField title="Họ và tên" content={name} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <UserInfoField
              title="Ngày sinh"
              content={dayjs(dob).format("DD/MM/YYYY")}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <UserInfoField title="Số CMND/CCCD" content={idCardNumber} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <UserInfoField
              title="Số thẻ BHYT"
              content={healthInsuranceNumber || "Không có"}
            />
          </Grid>
          <Grid size={12}>
            <UserInfoField
              title="Địa chỉ"
              content={`${ward?.name} - ${district?.name} - ${province?.name}`}
            />
          </Grid>
          <Grid size={12}>
            <UserInfoField
              title="Kết luận"
              content={
                totalItems && totalItems > 2
                  ? "Đã được tiêm phòng vắc xin phòng bệnh Covid-19"
                  : "Chưa được tiêm phòng vắc xin phòng bệnh Covid-19"
              }
            />
          </Grid>
        </Grid>
        <Stack mt={3} width="100%">
          <CustomTable
            columns={vaccinationRecordData.columns}
            rows={vaccinationResults || []}
            onPageChange={handleChangePage}
            rowsPerPage={PAGE_SIZE}
            totalPages={totalPages || 0}
          />
        </Stack>
        <Link href="/vaccine-registration">
          <PrimaryButton variant="contained" className="bg-primary my-3">
            ĐĂNG KÝ MŨI TIÊM TIẾP THEO
          </PrimaryButton>
        </Link>
      </Stack>
      <UserInfoCard vaccineDoses={totalItems || 0} />
    </Stack>
  );
};

export default VaccinceCertificate;
