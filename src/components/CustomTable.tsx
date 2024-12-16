import { Column, CustomTableProps, Data } from "@/types/table";
import {
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";

const CustomTable: React.FC<CustomTableProps> = ({
  rows,
  columns,
  rowsPerPage,
  onPageChange,
  totalPages,
}) => {
  const handleChange = (_event: React.ChangeEvent<unknown>, page: number) => {
    onPageChange(page);
  };
  const renderCellValue = (column: Column, row: Data) => {
    const value = row[column.id];
    if (column.render) return column.render(row);
    if (column.format && typeof value === "number") return column.format(value);
    if (typeof value === "object" && value !== null)
      return value.name || value.id || "";
    return String(value || "");
  };
  return (
    <div>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align="center"
                  style={{ minWidth: column.minWidth }}
                >
                  <Typography fontWeight={600}>{column.label}</Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length > 0 &&
              rows.map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      return (
                        <TableCell key={column.id} align="center">
                          {renderCellValue(column, row)}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            {!!rows.length && rows.length < rowsPerPage && (
              <TableRow style={{ height: 53 * (rowsPerPage - rows.length) }}>
                <TableCell />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {rows.length === 0 && (
        <Typography my={5} variant="h5" fontWeight="bold" textAlign="center">
          Không có dữ liệu
        </Typography>
      )}
      {rows.length !== 0 && (
        <Stack alignItems="center" py={2}>
          <Pagination
            count={totalPages}
            onChange={handleChange}
            variant="outlined"
            color="primary"
          />
        </Stack>
      )}
    </div>
  );
};

export default CustomTable;
