"use client";
import React, { useEffect, useState } from "react";
import RegistrationStatus from "@/components/RegistrationStatus";
import CustomTable from "@/components/CustomTable";
import { Column, Data } from "@/types/table";
import { useVaccineRegistrationQuery } from "@/api/vaccineRegistration.api";
import { vaccineRegistrationMap } from "@/utils/vaccineRegistrationMap";

const PAGE_SIZE = 5;

const columns: Column[] = [
  { id: "id", label: "STT", minWidth: 50 },
  { id: "name", label: "Họ và tên", minWidth: 150 },
  { id: "dob", label: "Ngày sinh", minWidth: 150 },
  { id: "gender", label: "Giới tính", minWidth: 150 },
  {
    id: "idCardNumber",
    label: "Số CMND/CCCD/Mã định danh công dân",
    minWidth: 150,
  },
  {
    id: "status",
    label: "Trạng thái",
    minWidth: 100,
    render: (row) => <RegistrationStatus status={row.status} />,
  },
];

const RegistrationResult = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [vaccineRegistration, setVaccineRegistrations] = useState<
    Data[] | null
  >();
  const { data } = useVaccineRegistrationQuery(currentPage, PAGE_SIZE);
  const { items, totalPages } = data?.data || {};
  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };
  useEffect(() => {
    if (items) {
      const vaccinationResults = vaccineRegistrationMap(items);
      setVaccineRegistrations(vaccinationResults);
    }
  }, [items]);
  return (
    <CustomTable
      columns={columns}
      rows={vaccineRegistration || []}
      totalPages={totalPages || 0}
      rowsPerPage={PAGE_SIZE}
      onPageChange={handleChangePage}
    />
  );
};

export default RegistrationResult;
