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
import Swal from "sweetalert2";
import StatusBadge from "../common/StatusBadge";
import ActionButton from "../common/ActionButton";
import { ApiRoutes, CardBrands, SWAL } from "../../../constants/constants";
import { Spinner } from "../common/ProgressSpinner";
import TransactionCards from "../common/TransactionCards";
import "../../../index.css";
import ProductsContent from "../modal_content/ProductsContent";

interface Newsletter {
  id: string;
  name: string;
  email: string;
  createdDate: string;
}
interface TransactionStats {
  all: number;
  succeeded: number;
  refunded: number;
  disputed: number;
  failed: number;
  uncaptured: number;
}

interface NewsletterProps {
  setIsGlobalLoading: (value: boolean) => void;
}

const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "email", label: "Email", minWidth: 100 },
  { id: "createdDate", label: "Created Date", minWidth: 130 },
  { id: "action", label: "Action", minWidth: 150 },
];

export default function Newsletter({setIsGlobalLoading}: NewsletterProps) {
  const [rows, setRows] = useState<Newsletter[]>([]);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<TransactionStats | null>(null);

  const fetchCount = async () => {
    try {
      const res = await axios.get<TransactionStats>(
        ApiRoutes.Payments.getTransactionStats
      );
      setStats(res.data);
    } catch (error) {
      console.error("Error fetching transactions stats", error);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get<Newsletter[]>(ApiRoutes.Newsletter.getNewsletter);
      setRows(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false); // Stop loading whether success or error
    }
  };

  useEffect(() => {
    fetchData();
    fetchCount();
  }, []);

  const handleRefresh = async () => {
    setLoading(true); // 1. Start showing spinner
    try {
      const delay = new Promise((resolve) => setTimeout(resolve, 1000)); // 2. Create a timer that waits 1 second
      const fetch = fetchData(); // 3. Start fetching data
      const fetchStats = fetchCount(); // Fetch stats concurrently
      await Promise.all([delay, fetch, fetchStats]); // 4. Wait until BOTH 1-second delay and data fetch are done
    } catch (error) {
      Swal.fire({
        icon: SWAL.ICON.error,
        title: "Error",
        text: "An error occurred while refreshing data.",
      });
    } finally {
      setLoading(false);
    }
  };

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
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="flex flex-col">
            <div className="flex gap-2 justify-between mb-4 flex-col lg-custom:flex-row w-full">
              <TransactionCards cardName="All" data={stats?.all ?? 0} />
              <TransactionCards
                cardName="Succeeded"
                data={stats?.succeeded ?? 0}
              />
              <TransactionCards
                cardName="Refunded"
                data={stats?.refunded ?? 0}
              />
              <TransactionCards
                cardName="Disputed"
                data={stats?.disputed ?? 0}
              />
              <TransactionCards cardName="Failed" data={stats?.failed ?? 0} />
              <TransactionCards
                cardName="Uncaptured"
                data={stats?.uncaptured ?? 0}
              />
            </div>
          </div>
          <Paper sx={{ width: "100%", overflow: "hidden", p: 4 }}>
            <div className="flex items-center py-3 justify-between">
              <h2 className="font-semibold text-xl">Newsletter</h2>
              <div className="flex items-center gap-2">
                <ActionButton
                  sx="bg-disabled text-gray-800 text-sm"
                  Icon="pi pi-refresh"
                  onClick={handleRefresh}
                >
                  Refresh
                </ActionButton>
                <ActionButton
                  onClick={() => setIsOpen(true)}
                  Icon="pi pi-plus-circle"
                  sx="p-2 text-white bg-success text-sm"
                >
                  Send Newsletter
                </ActionButton>
              </div>
            </div>
            <div className="flex items-center justify-between gap-4">
              <Box mb={2} sx={{ flex: 1 }}>
                <TextField
                  sx={{ width: "100%", fontSize: "15px" }}
                  size="small"
                  variant="outlined"
                  label="Search"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </Box>
            </div>
            <TableContainer sx={{ maxHeight: 600 }} className="main-scroll">
              <Table stickyHeader size="small">
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
                          fontSize: "13px",
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
                        <TableCell>
                          <div>
                            <strong style={{ fontSize: "13px" }}>
                              {row.name}
                            </strong>
                          </div>
                        </TableCell>
                        <TableCell style={{ fontSize: "13px" }}>
                          {row.email}
                        </TableCell>
                        <TableCell style={{ fontSize: "13px" }}>
                          {row.createdDate}
                        </TableCell>
                        <TableCell style={{ fontSize: "12px" }}>
                          <ActionButton
                            sx="bg-disabled cursor-not-allowed text-gray-500"
                            disabled={true}
                          >
                            Unavailable
                          </ActionButton>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              sx={{ fontSize: "13px" }}
              rowsPerPageOptions={[5, 10, 15, 25]}
              component="div"
              count={filteredRows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </>
      )}
      <CustomModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ProductsContent handleRefresh={handleRefresh} setIsOpen={setIsOpen} />
      </CustomModal>
    </>
  );
}
