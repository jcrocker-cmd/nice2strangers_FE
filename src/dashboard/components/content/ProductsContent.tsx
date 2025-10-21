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
import ProductsContent from "../modal_content/products/ProductsContent";
import ProductsContentEdit from "../modal_content/products/ProductsContentEdit";
import ProductsContentView from "../modal_content/products/ProductsContentView";
import type { ProductCounts } from "../../types/productCount";
import type { Products } from "../../types/product";

interface ProductsProps {
  setIsGlobalLoading: (value: boolean) => void;
}

const columns = [
  { id: "productName", label: "Product Name", minWidth: 130 },
  { id: "category", label: "Category", minWidth: 100 },
  { id: "description", label: "Description", minWidth: 400 },
  { id: "stocks", label: "Stocks", minWidth: 80 },
  { id: "status", label: "Status", minWidth: 120 },
  { id: "priceInCents", label: "Price", minWidth: 100 },
  { id: "images", label: "Image", minWidth: 100 },
  { id: "createdDate", label: "Created Date", minWidth: 170 },
  { id: "action", label: "Action", minWidth: 150 },
];

export default function CustomTable({}: ProductsProps) {
  const [rows, setRows] = useState<Products[]>([]);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit" | "view">("add");
  const [selectedProduct, setSelectedProduct] = useState<Products | null>(null);
  const [productCount, setProductCount] = useState<ProductCounts | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get<Products[]>(ApiRoutes.Product.getProducts);
      setRows(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false); // Stop loading whether success or error
    }
  };

  const fetchProductsCount = async () => {
    try {
      const res = await axios.get<ProductCounts>(
        ApiRoutes.Product.countActiveProducts
      );
      setProductCount(res.data);
    } catch (error) {
      console.error("Error fetching Products", error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchProductsCount();
  }, []);

  const handleRefresh = async () => {
    setLoading(true); // 1. Start showing spinner
    try {
      const delay = new Promise((resolve) => setTimeout(resolve, 1000)); // 2. Create a timer that waits 1 second
      const fetch = fetchData(); // 3. Start fetching data
      const productCount = fetchProductsCount(); // 3. Start fetching data
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
        await axios.put(`${ApiRoutes.Product.softDelete}/${id}`);
        Swal.fire("Deleted!", "Product has been soft deleted.", "success");
        handleRefresh();
      } catch (error) {
        Swal.fire("Error!", "Failed to delete product.", "error");
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
        await axios.put(`${ApiRoutes.Product.recoverProduct}/${id}`);
        Swal.fire("Recovered!", "Product has been restored.", "success");
        handleRefresh();
      } catch (error) {
        Swal.fire("Error!", "Failed to recover product.", "error");
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
              <TransactionCards
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
              <h2 className="font-semibold text-xl">Products</h2>
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
                    setSelectedProduct(null);
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
                              {row.productName}
                            </strong>
                          </div>
                        </TableCell>
                        <TableCell style={{ fontSize: "13px" }}>
                          {row.category}
                        </TableCell>
                        <TableCell style={{ fontSize: "13px" }}>
                          <div className="text-justify">{row.description}</div>
                        </TableCell>
                        <TableCell style={{ fontSize: "13px" }}>
                          {row.stocks}
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
                          ${" "}
                          {(row.priceInCents / 100).toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </TableCell>
                        <TableCell style={{ fontSize: "13px" }}>
                          <img
                            src={`${ApiRoutes.baseUrl}${row.image}`}
                            alt={row.productName}
                            className="object-cover w-20 rounded-lg h-25"
                          />
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
        {modalMode === "view" && selectedProduct && (
          <ProductsContentView
            product={selectedProduct}
            setIsOpen={setModalOpen}
          />
        )}
      </CustomModal>
    </>
  );
}
