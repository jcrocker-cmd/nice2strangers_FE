import { useState, useEffect, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Paper,
  TextField,
  Box,
} from "@mui/material";
import axios from "axios";
import CustomModal from "../common/CustomModal";

interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  salary: number;
  createdDate: string;
  departmentId: number;
}

const columns = [
  { id: "id", label: "ID", minWidth: 170 },
  { id: "name", label: "Name", minWidth: 100 },
  { id: "email", label: "Email", minWidth: 170 },
  { id: "phone", label: "Phone", minWidth: 100 },
  { id: "salary", label: "Salary", minWidth: 100 },
  { id: "createdDate", label: "Created Date", minWidth: 170 },
  { id: "departmentId", label: "Department ID", minWidth: 100 },
];

export default function CustomTable() {
  const [rows, setRows] = useState<Employee[]>([]);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get<Employee[]>(
          "https://localhost:7095/api/Employees/employees"
        );
        setRows(res.data);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };
    fetchData();
  }, []);

  const filteredRows = useMemo(() => {
    if (!searchText) return rows;
    return rows.filter((row) =>
      Object.values(row).some((field) =>
        field?.toString().toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [rows, searchText]);

  const handleChangePage = (_event: unknown, newPage: number) =>
    setPage(newPage);

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden", p: 4 }}>
        <h2 className="pb-6 font-semibold text-3xl">Transactions</h2>
        <div className="flex items-center justify-between gap-4">
          <Box mb={2} sx={{ flex: 1 }}>
            <TextField
              sx={{ width: "100%" }}
              size="small"
              variant="outlined"
              label="Search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </Box>
          <button onClick={() => setIsOpen(true)} className="p-2 text-white bg-[#22c55e] rounded-lg">Open Modal</button>
        </div>
        <TableContainer sx={{ maxHeight: 500 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    style={{
                      minWidth: column.minWidth,
                      color: "white",
                      backgroundColor: "#1e293b",
                      fontWeight: "bold",
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.phone}</TableCell>
                    <TableCell>{row.salary}</TableCell>
                    <TableCell>{row.createdDate}</TableCell>
                    <TableCell>{row.departmentId}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <CustomModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2>Hello from Modal</h2>
      </CustomModal>
    </>
  );
}
