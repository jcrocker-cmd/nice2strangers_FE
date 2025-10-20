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
// import CustomModal from "../common/CustomModal";
import Swal from "sweetalert2";
// import StatusBadge from "../common/StatusBadge";
import ActionButton from "../common/ActionButton";
import { ApiRoutes, SWAL } from "../../../../constants/constants";
import { Spinner } from "../common/ProgressSpinner";
// import TransactionCards from "../common/TransactionCards";
import "../../../../index.css";
// import ProductsContent from "../modal_content/products/ProductsContent";
// import ProductsContentEdit from "../modal_content/products/ProductsContentEdit";
// import ProductsContentView from "../modal_content/products/ProductsContentView";
// import type { ProductCounts } from "../../types/productCount";
import { getUser } from "../../../../constants/user";

const userId = getUser()?.userId || "";

interface OrderHistory {
  id: string;
  userId: string;
  productId: string;
  productName: string;
  totalAmount: number;
  quantity: number;
  purchaseDate: string;
}

interface OrderHistoryProps {
  setIsGlobalLoading: (value: boolean) => void;
}

const columns = [
  { id: "productName", label: "Product Name", minWidth: 300 },
  { id: "quantity", label: "Quantity", minWidth: 100 },
  { id: "totalAmount", label: "Total Amount", minWidth: 200 },
  { id: "purchaseDate", label: "Purchase Date", minWidth: 300 },
];

export default function CustomTable({}: OrderHistoryProps) {
  const [rows, setRows] = useState<OrderHistory[]>([]);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  // const [modalOpen, setModalOpen] = useState(false);
  // const [modalMode, setModalMode] = useState<"add" | "edit" | "view">("add");
  // const [selectedProduct, setSelectedProduct] = useState<OrderHistory | null>(
  //   null
  // );

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get<OrderHistory[]>(
        ApiRoutes.Orders.getOrdersByUser(userId)
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
  }, []);

  const handleRefresh = async () => {
    setLoading(true); // 1. Start showing spinner
    try {
      const delay = new Promise((resolve) => setTimeout(resolve, 1000)); // 2. Create a timer that waits 1 second
      const fetch = fetchData(); // 3. Start fetching data
      await Promise.all([delay, fetch]); // 4. Wait until BOTH 1-second delay and data fetch are done
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
              {/* <TransactionCards
                cardName="All"
                data={productCount?.total ?? 0}
              />
              <TransactionCards
                cardName="Active"
                data={productCount?.active ?? 0}
              />
              <TransactionCards
                cardName="Deleted"
                data={productCount?.inactive ?? 0}
              /> */}
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
              <h2 className="font-semibold text-xl">Order History</h2>
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
                        <TableCell>
                          <div>
                            <strong style={{ fontSize: "13px" }}>
                              {row.productName}
                            </strong>
                          </div>
                        </TableCell>
                        <TableCell style={{ fontSize: "13px" }}>
                          {row.quantity}
                        </TableCell>
                        <TableCell style={{ fontSize: "13px" }}>
                          ${" "}
                          {(row.totalAmount / 100).toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </TableCell>
                        <TableCell style={{ fontSize: "13px" }}>
                          {new Date(row.purchaseDate).toLocaleString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "numeric",
                            minute: "2-digit",
                            hour12: true,
                          })}
                        </TableCell>

                        {/* <TableCell style={{ fontSize: "12px" }}>
                          <Box display="flex" alignItems="center" gap={1}>
                            <ActionButton
                              Icon="pi pi-eye"
                              sx="bg-primary text-white cursor-pointer"
                              onClick={() => {
                                setSelectedProduct(row);
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
                                setSelectedProduct(row);
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
                        </TableCell> */}
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
      {/* <CustomModal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        {modalMode === "add" && (
          <ProductsContent
            handleRefresh={handleRefresh}
            setIsOpen={setModalOpen}
          />
        )}
        {modalMode === "edit" && selectedProduct && (
          <ProductsContentEdit
            handleRefresh={handleRefresh}
            setIsOpen={setModalOpen}
            product={selectedProduct}
          />
        )}
      </CustomModal> */}
    </>
  );
}
