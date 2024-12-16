import CustomTable from "@/components/CustomTable";
import RegistrationStatus from "@/components/RegistrationStatus";
import { Status, statusColorMap } from "@/types/statusEnum";
import { Column, Data } from "@/types/table";
import { MenuItem, TextField } from "@mui/material";
import { useMemo } from "react";

const PAGE_SIZE = 5;

const VaccineRegistrationTable: React.FC<{
  data: Data[];
  onPageChange: (page: number) => void;
  totalPages: number;
  handleStatusChange: (id: number, status: Status) => void;
}> = ({ data, handleStatusChange, onPageChange, totalPages }) => {
  const columns: Column[] = useMemo(
    () => [
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
      {
        id: "action",
        label: "Hành động",
        minWidth: 200,
        render: (row) => (
          <TextField
            select
            fullWidth
            size="small"
            color={statusColorMap[row.status as Status]}
            value={row.status}
            onChange={(e) =>
              handleStatusChange(row.id, e.target.value as unknown as Status)
            }
          >
            <MenuItem value={Status.COMPLETED}>Đồng ý</MenuItem>
            <MenuItem value={Status.REJECTED}>Từ chối</MenuItem>
            <MenuItem value={Status.PENDING}>Đang phê duyệt</MenuItem>
          </TextField>
        ),
      },
    ],
    [handleStatusChange]
  );
  return (
    <CustomTable
      columns={columns}
      rows={data || []}
      onPageChange={onPageChange}
      rowsPerPage={PAGE_SIZE}
      totalPages={totalPages || 0}
    />
  );
};

export default VaccineRegistrationTable;
