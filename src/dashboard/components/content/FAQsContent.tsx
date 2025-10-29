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
import { ApiRoutes, SWAL } from "../../../constants/constants";
import { Spinner } from "../common/ProgressSpinner";
import TransactionCards from "../common/TransactionCards";
import "../../../index.css";
import FAQsContent from "../modal_content/faqs/FAQsContent";
import FAQsContentEdit from "../modal_content/faqs/FAQsContentEdit";
import FAQsContentView from "../modal_content/faqs/FAQsView";
import type { ProductCounts } from "../../types/productCount";

interface FAQsProps {
  setIsGlobalLoading: (value: boolean) => void;
}

interface FAQs {
  id: string;
  question: string;
  answer: string;
  createdDate: string;
  isActive: boolean;
}

interface FAQsCounts {
  active: number;
  inactive: number;
  total: number;
}

const columns = [
  { id: "question", label: "Question", minWidth: 250 },
  { id: "answer", label: "Answer", minWidth: 250 },
  { id: "status", label: "Status", minWidth: 120 },
  { id: "createdDate", label: "Created Date", minWidth: 170 },
  { id: "action", label: "Action", minWidth: 150 },
];

export default function CustomTable({}: FAQsProps) {
  const [rows, setRows] = useState<FAQs[]>([]);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit" | "view">("add");
  const [selectedItem, setSelectedItem] = useState<FAQs | null>(null);
  const [FAQsCount, setFAQsCount] = useState<FAQsCounts | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get<FAQs[]>(ApiRoutes.FAQs.getFAQs);
      setRows(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false); // Stop loading whether success or error
    }
  };

  const fetchFAQsCount = async () => {
    try {
      const res = await axios.get<FAQsCounts>(ApiRoutes.FAQs.countFAQs);
      setFAQsCount(res.data);
    } catch (error) {
      console.error("Error fetching FAQs count", error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchFAQsCount();
  }, []);

  const handleRefresh = async () => {
    setLoading(true); // 1. Start showing spinner
    try {
      const delay = new Promise((resolve) => setTimeout(resolve, 1000)); // 2. Create a timer that waits 1 second
      const fetch = fetchData(); // 3. Start fetching data
      const productCount = fetchFAQsCount(); // 3. Start fetching data
      await Promise.all([delay, fetch, productCount]); // 4. Wait until BOTH 1-second delay and data fetch are done
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

  const handleSoftDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You are about to soft delete this product.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        await axios.put(`${ApiRoutes.FAQs.deleteFAQ}/${id}`);
        Swal.fire("Deleted!", "FAQ has been soft deleted.", "success");
        handleRefresh();
      } catch (error) {
        Swal.fire("Error!", "Failed to delete FAQ.", "error");
      }
    }
  };

  const handleRecover = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You are about to recover this product.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, recover it!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        await axios.put(`${ApiRoutes.FAQs.recoverFAQ}/${id}`);
        Swal.fire("Recovered!", "FAQ has been restored.", "success");
        handleRefresh();
      } catch (error) {
        Swal.fire("Error!", "Failed to recover FAQ.", "error");
      }
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
              <TransactionCards cardName="All" data={FAQsCount?.total ?? 0} />
              <TransactionCards
                cardName="Active"
                data={FAQsCount?.active ?? 0}
              />
              <TransactionCards
                cardName="Deleted"
                data={FAQsCount?.inactive ?? 0}
              />
              {/* <TransactionCards
                cardName="Disputed"
                data={stats?.disputed ?? 0}
              />
              <TransactionCards cardName="Failed" data={stats?.failed ?? 0} />
              <TransactionCards
                cardName="Uncaptured"
                data={stats?.uncaptured ?? 0}
              /> */}
            </div>
          </div>
          <Paper sx={{ width: "100%", overflow: "hidden", p: 4 }}>
            <div className="flex items-center py-3 justify-between">
              <h2 className="font-semibold text-xl">FAQs</h2>
              <div className="flex items-center gap-2">
                <ActionButton
                  sx="bg-disabled text-gray-800 text-sm"
                  Icon="pi pi-refresh"
                  onClick={handleRefresh}
                >
                  Refresh
                </ActionButton>
                <ActionButton
                  onClick={() => {
                    setModalMode("add");
                    setSelectedItem(null);
                    setModalOpen(true);
                  }}
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
                        <TableCell>
                          <div>
                            <strong style={{ fontSize: "13px" }}>
                              {row.question}
                            </strong>
                          </div>
                        </TableCell>
                        <TableCell style={{ fontSize: "13px" }}>
                          {row.answer}
                        </TableCell>
                        <TableCell style={{ fontSize: "13px" }}>
                          {row.isActive ? (
                            <StatusBadge
                              sx="border-success text-success"
                              message="Active"
                            />
                          ) : (
                            <StatusBadge
                              sx="border-danger text-danger"
                              message="Deleted"
                            />
                          )}
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
                            <ActionButton
                              Icon="pi pi-pencil"
                              sx="bg-warning text-white cursor-pointer"
                              onClick={() => {
                                setModalMode("edit");
                                setSelectedItem(row);
                                setModalOpen(true);
                              }}
                            >
                              Edit
                            </ActionButton>
                            {row.isActive ? (
                              <ActionButton
                                Icon="pi pi-trash"
                                sx="bg-danger text-white cursor-pointer"
                                onClick={() => handleSoftDelete(row.id)}
                              >
                                Delete
                              </ActionButton>
                            ) : (
                              <ActionButton
                                Icon="pi pi-refresh"
                                sx="bg-success text-white cursor-pointer"
                                onClick={() => handleRecover(row.id)}
                              >
                                Recover
                              </ActionButton>
                            )}
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
        {modalMode === "add" && (
          <FAQsContent handleRefresh={handleRefresh} setIsOpen={setModalOpen} />
        )}
        {modalMode === "edit" && selectedItem && (
          <FAQsContentEdit
            handleRefresh={handleRefresh}
            setIsOpen={setModalOpen}
            item={selectedItem}
          />
        )}
        {modalMode === "view" && selectedItem && (
          <FAQsContentView item={selectedItem} setIsOpen={setModalOpen} />
        )}
      </CustomModal>
    </>
  );
}
