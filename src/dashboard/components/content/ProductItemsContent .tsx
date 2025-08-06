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

interface Transaction {
  id: string;
  amount: number;
  currency: string;
  status: string;
  refunded: string;
  refundedDate: string;
  declineReason: string;
  created: string;
  customerName: string;
  customerEmail: string;
  cardBrand: string;
  last4: string;
}

interface TransactionStats {
  all: number;
  succeeded: number;
  refunded: number;
  disputed: number;
  failed: number;
  uncaptured: number;
}

interface TransactionProps {
  setIsGlobalLoading: (value: boolean) => void;
}

const columns = [
  { id: "id", label: "ID", minWidth: 170 },
  { id: "customerInfo", label: "Customer", minWidth: 200 },
  { id: "amount", label: "Amount", minWidth: 100 },
  { id: "paymentMethod", label: "Payment Method", minWidth: 170 },
  { id: "status", label: "Status", minWidth: 100 },
  { id: "created", label: "Created", minWidth: 170 },
  { id: "refunded", label: "Refunded", minWidth: 100 },
  { id: "refundedDate", label: "Refunded Date", minWidth: 170 },
  { id: "declineReason", label: "Decline Reason", minWidth: 170 },
  { id: "action", label: "Action", minWidth: 170 },
];

export default function CustomTable({ setIsGlobalLoading }: TransactionProps) {
  const [rows, setRows] = useState<Transaction[]>([]);
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
      const res = await axios.get<Transaction[]>(
        ApiRoutes.Payments.getTransactions
      );
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

  const handleRefund = async (chargeId: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You are about to refund this transaction.",
      icon: SWAL.ICON.warning,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, refund it!",
    });

    if (!result.isConfirmed) return;
    setIsGlobalLoading(true);

    try {
      await axios.post(ApiRoutes.Payments.postRefund, {
        chargeId,
      });

      Swal.fire({
        icon: SWAL.ICON.success,
        title: "Refunded!",
        text: "The transaction has been successfully refunded.",
      });
      fetchData();
    } catch (error: any) {
      Swal.fire({
        icon: SWAL.ICON.error,
        title: "Refund failed",
        text: "An error occurred.",
      });
    } finally {
      setIsGlobalLoading(false);
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
              <h2 className="font-semibold text-xl">Transactions</h2>
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
                  Add Record
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
                        <TableCell style={{ fontSize: "13px" }}>
                          {row.id}
                        </TableCell>
                        <TableCell>
                          <div>
                            <strong style={{ fontSize: "13px" }}>
                              {row.customerName}
                            </strong>
                            <br />
                            <span
                              style={{ color: "#6b7280", fontSize: "12px" }}
                            >
                              {row.customerEmail}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell style={{ fontSize: "13px" }}>
                          {row.currency.toUpperCase()}{" "}
                          {(row.amount / 100).toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </TableCell>
                        <TableCell style={{ fontSize: "13px" }}>
                          <div
                            className="flex gap-1 items-center"
                            title={row.cardBrand.toUpperCase()}
                          >
                            {row.cardBrand === CardBrands.VISA ? (
                              <i className="fab fa-cc-visa text-[#00579f] text-xl"></i>
                            ) : row.cardBrand === CardBrands.MASTERCARD ? (
                              <i className="fab fa-cc-mastercard text-danger text-xl"></i>
                            ) : row.cardBrand === CardBrands.AMEX ? (
                              <i className="fa-brands fa-cc-amex text-[#0193ce] text-xl"></i>
                            ) : row.cardBrand === CardBrands.JCB ? (
                              <i className="fa-brands fa-cc-jcb text-secondary text-xl"></i>
                            ) : row.cardBrand === CardBrands.DISCOVER ? (
                              <i className="fa-brands fa-cc-discover text-[#f08008] text-xl"></i>
                            ) : row.cardBrand === CardBrands.DINERS ? (
                              <i className="fa-brands fa-cc-diners-club text-primary text-xl"></i>
                            ) : (
                              <i className="fa-solid fa-credit-card text-xl"></i>
                            )}
                            <span>**** **** **** {row.last4}</span>
                          </div>
                        </TableCell>
                        <TableCell style={{ fontSize: "13px" }}>
                          {row.status === "succeeded" ? (
                            <StatusBadge
                              sx="border-success text-success"
                              message="Succeeded"
                            />
                          ) : row.status === "failed" ? (
                            <StatusBadge
                              sx="border-danger text-danger"
                              message="Failed"
                            />
                          ) : (
                            row.status
                          )}
                        </TableCell>
                        <TableCell style={{ fontSize: "13px" }}>
                          {row.created}
                        </TableCell>
                        <TableCell style={{ fontSize: "13px" }}>
                          {row.refunded}
                        </TableCell>
                        <TableCell style={{ fontSize: "13px" }}>
                          {row.refundedDate ?? "--"}
                        </TableCell>
                        <TableCell style={{ fontSize: "13px" }}>
                          {row.declineReason ?? "--"}
                        </TableCell>
                        <TableCell style={{ fontSize: "12px" }}>
                          {row.refunded === "No" &&
                          row.status === "succeeded" ? (
                            <ActionButton
                              sx="bg-danger cursor-pointer text-white"
                              Icon="pi pi-undo"
                              onClick={() => handleRefund(row.id)}
                            >
                              Refund
                            </ActionButton>
                          ) : row.refunded === "Yes" &&
                            row.status === "succeeded" ? (
                            <ActionButton
                              sx="bg-success cursor-not-allowed text-white"
                              Icon="pi pi-check"
                              disabled={true}
                            >
                              Refunded
                            </ActionButton>
                          ) : (
                            <ActionButton
                              sx="bg-disabled cursor-not-allowed text-gray-500"
                              disabled={true}
                            >
                              Unavailable
                            </ActionButton>
                          )}
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
        <h2>Hello from Modal</h2>
      </CustomModal>
    </>
  );
}
