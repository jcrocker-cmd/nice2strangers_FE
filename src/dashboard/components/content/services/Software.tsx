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
import CustomModal from "../../common/CustomModal";
import Swal from "sweetalert2";
import ActionButton from "../../common/ActionButton";
import { ApiRoutes, SWAL } from "../../../../constants/constants";
import { Spinner } from "../../common/ProgressSpinner";
import TransactionCards from "../../common/TransactionCards";
import "../../../../index.css";
import SoftwareReply from "../../modal_content/services/software/SoftwareReply";
import SoftwareView from "../../modal_content/services/software/SoftwareView";
import type { Software } from "../../../types/services/services";

interface TransactionStats {
  all: number;
  succeeded: number;
  refunded: number;
  disputed: number;
  failed: number;
  uncaptured: number;
}

interface SMCreationProps {
  setIsGlobalLoading: (value: boolean) => void;
}

const columns = [
  { id: "subject", label: "Subject", minWidth: 180 },
  { id: "customerInfo", label: "Customer Info", minWidth: 200 },
  { id: "projectType", label: "Project Type", minWidth: 100 },
  { id: "platform", label: "Platform", minWidth: 100 },
  { id: "budget", label: "Budget", minWidth: 100 },
  { id: "timeline", label: "Timeline", minWidth: 100 },
  { id: "message", label: "Message", minWidth: 400 },
  { id: "createdDate", label: "Created Date", minWidth: 120 },
  { id: "action", label: "Action", minWidth: 120 },
];

export default function VideoEditing({}: SMCreationProps) {
  const [rows, setRows] = useState<Software[]>([]);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<TransactionStats | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"send" | "edit" | "view">("send");
  const [selectedItem, setSelectedItem] = useState<Software | null>(null);

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
      const res = await axios.get<Software[]>(
        ApiRoutes.Services.getSSServiceData
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
              <h2 className="font-semibold text-xl">
                Social Media Content Creation
              </h2>
              <div className="flex items-center gap-2">
                <ActionButton
                  sx="bg-disabled text-gray-800 text-sm"
                  Icon="pi pi-refresh"
                  onClick={handleRefresh}
                >
                  Refresh
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
                          {row.subject}
                        </TableCell>
                        <TableCell>
                          <div>
                            <strong style={{ fontSize: "13px" }}>
                              {row.name}
                            </strong>
                            <br />
                            <span
                              style={{ color: "#6b7280", fontSize: "12px" }}
                            >
                              {row.email}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell style={{ fontSize: "13px" }}>
                          {row.projectType}
                        </TableCell>
                        <TableCell style={{ fontSize: "13px" }}>
                          {row.platform}
                        </TableCell>
                        <TableCell style={{ fontSize: "13px" }}>
                          {row.budget}
                        </TableCell>
                        <TableCell style={{ fontSize: "13px" }}>
                          {row.timeline}
                        </TableCell>
                        <TableCell style={{ fontSize: "13px" }}>
                          {row.message}
                        </TableCell>
                        <TableCell style={{ fontSize: "13px" }}>
                          {row.createdDate}
                        </TableCell>
                        <TableCell style={{ fontSize: "12px" }}>
                          <Box display="flex" alignItems="center" gap={1}>
                            <ActionButton
                              Icon="pi pi-eye"
                              sx="bg-primary text-white cursor-pointer"
                              onClick={() => {
                                setSelectedItem(row);
                                setModalMode("view");
                                setModalOpen(true);
                              }}
                            >
                              View
                            </ActionButton>
                            {/* {row.isReplied ? (
                              <ActionButton
                                sx="bg-secondary cursor-not-allowed text-white"
                                Icon="pi pi-check"
                                disabled={true}
                              >
                                Replied
                              </ActionButton>
                            ) : (
                              <ActionButton
                                Icon="pi pi-pencil"
                                sx="bg-success text-white cursor-pointer"
                                onClick={() => {
                                  setModalMode("send");
                                  setSelectedItem(row);
                                  setModalOpen(true);
                                }}
                              >
                                Reply
                              </ActionButton>
                            )} */}
                            <ActionButton
                              Icon="pi pi-pencil"
                              sx="bg-success text-white cursor-pointer"
                              onClick={() => {
                                setModalMode("send");
                                setSelectedItem(row);
                                setModalOpen(true);
                              }}
                            >
                              Reply
                            </ActionButton>
                          </Box>
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
      <CustomModal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        {modalMode === "send" && (
          <SoftwareReply
            handleRefresh={handleRefresh}
            setIsOpen={setModalOpen}
            item={selectedItem!} // force non-null with !
          />
        )}
        {modalMode === "view" && selectedItem && (
          <SoftwareView setIsOpen={setModalOpen} item={selectedItem} />
        )}
      </CustomModal>
    </>
  );
}
