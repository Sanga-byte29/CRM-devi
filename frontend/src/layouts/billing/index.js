import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Button,
  IconButton,
  Link,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState, useEffect } from "react";
import axios from "axios";
import AddProductModal from "modals/AddProductModal";
import AddBulkProductModal from "modals/AddBulkProductModal";

//v1
import { useNavigate } from "react-router-dom";

const StyledAddIcon = styled(AddIcon)(({ theme }) => ({
  fontSize: "3rem",
  color: "white",
}));

function ProductManangement() {
  const [products, setProducts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openProductModal, setOpenProductModal] = useState(false);

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);
  const navigate = useNavigate(); // Add this if it's missing in the relevant scope.

  //add bulk product modal

  const handleOpenProductModal = () => setOpenProductModal(true);
  const handleCloseProductModal = () => setOpenProductModal(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/addProduct");
        setProducts(response.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
        alert("Failed to fetch products. Please try again.");
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const searchText = searchQuery.toLowerCase();
    return (
      product.productCode.toLowerCase().includes(searchText) ||
      product.productName.toLowerCase().includes(searchText) ||
      product.productDescription?.toLowerCase().includes(searchText)
    );
  });

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // v1

  const handleEdit = (productId) => {
    // console.log(productId);
    navigate(`/addProduct/${productId}`);
  };

  //v2
  const handleDelete = async (productId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(`http://localhost:8080/addProduct/${productId}`);
      if (response.data.success) {
        alert("Product deleted successfully!");
        setProducts((prevProducts) => prevProducts.filter((product) => product._id !== productId));
      } else {
        alert("Failed to delete the product.");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("An error occurred while deleting the product. Please try again.");
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar absolute isMini />
      <MDBox mt={8} mb={3} style={{ width: "100%", height: "auto" }}>
        <Paper
          elevation={2}
          style={{
            padding: "1.5rem",
            borderRadius: "8px",
            backgroundColor: "white",
          }}
        >
          <Grid container spacing={2} alignItems="center" justifyContent="space-between" mb={3}>
            <Grid item>
              <Typography variant="h5" style={{ fontWeight: "bold" }}>
                Product Management
              </Typography>
            </Grid>
            <Grid item>
              <div style={{ display: "flex", gap: "20px" }}>
                <Button
                  variant="contained"
                  style={{
                    background: "linear-gradient(to right, #6a11cb, #2575fc)",
                    color: "white",
                  }}
                  startIcon={<StyledAddIcon />}
                  onClick={handleModalOpen}
                >
                  Add Product
                </Button>
                <AddProductModal open={modalOpen} onClose={handleModalClose} />
                <Button
                  variant="contained"
                  style={{
                    background: "linear-gradient(to right, #6a11cb, #00c9ff)",
                    color: "white",
                  }}
                  onClick={handleOpenProductModal}
                >
                  Add Bulk Products
                </Button>
                <AddBulkProductModal open={openProductModal} onClose={handleCloseProductModal} />
              </div>
            </Grid>
          </Grid>

          <Grid container spacing={2} justifyContent="space-between" alignItems="center" mb={3}>
            <Grid item>
              <strong>Show </strong>
              <Select
                labelId="rows-per-page-label"
                id="rows-per-page"
                value={rowsPerPage}
                onChange={handleChangeRowsPerPage}
                style={{ width: "70px", height: "40px" }}
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={25}>25</MenuItem>
                <MenuItem value={50}>50</MenuItem>
                <MenuItem value={100}>100</MenuItem>
              </Select>
              <strong> Entries</strong>
            </Grid>
            <Grid item>
              <TextField
                label="Search"
                variant="outlined"
                value={searchQuery}
                onChange={handleSearchChange}
                size="small"
              />
            </Grid>
          </Grid>

          <TableContainer component={Paper} style={{ borderRadius: "8px" }}>
            <Table style={{ tableLayout: "fixed", width: "100%" }}>
              <TableHead>
                <TableRow
                  style={{
                    background: "linear-gradient(to right, #6a11cb, #2575fc)",
                  }}
                >
                  {[
                    "Image",
                    "Product Code",
                    "Product Name",
                    "Description",
                    "Category",
                    "Stock",
                    "Price",
                    "Tax Slab",
                    "HSN Code",
                    "Date Added",
                    "Actions",
                  ].map((header, index) => (
                    <TableCell
                      key={index}
                      style={{
                        color: "white",
                        fontWeight: "bold",
                        textAlign: "center",
                        padding: "12px",
                        // width: "150px",
                      }}
                    >
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product._id}>
                    <TableCell style={{ textAlign: "center" }}>
                      <img
                        src={product.image || "placeholder.png"}
                        alt="Product"
                        style={{ width: "50px", height: "50px" }}
                      />
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      {product.productCode || "N/A"}
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      {product.productName || "N/A"}
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      {product.productDescription || "N/A"}
                    </TableCell>
                    {/* <TableCell style={{ textAlign: "center" }}>
                      {product.categoryID?.name || "N/A"}
                    </TableCell> */}
                    {/* v1 */}
                    <TableCell style={{ textAlign: "center" }}>
                      {product.categoryID?.categoryName || "N/A"}
                    </TableCell>

                    <TableCell style={{ textAlign: "center" }}>{product.stock || "N/A"}</TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      {"₹" + product.price || "N/A"}
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      {product.taxSlab + "%" || "N/A"}
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      {product.hsnCode || "N/A"}
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      {new Date(product.createdAt).toLocaleDateString() || "N/A"}
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      {/* <IconButton>
                        <EditIcon />
                      </IconButton> */}
                      <IconButton onClick={() => handleEdit(product._id)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(product._id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </MDBox>
    </DashboardLayout>
  );
}

export default ProductManangement;
