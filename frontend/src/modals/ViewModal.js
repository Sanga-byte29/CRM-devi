import React, { useState, useEffect } from "react";
import {
  Paper,
  Modal,
  Box,
  Typography,
  Button,
  Grid,
  IconButton,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import PropTypes from "prop-types"; // Import PropTypes
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import VisibilityIcon from "@mui/icons-material/Visibility";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "95%",
  maxWidth: 1350,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
};

function ViewModal({ order, invoice }) {
  const [open, setOpen] = useState(false);
  const [invoices, setInvoices] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axios.get("http://localhost:8080/invoices");
        setInvoices(response.data);
      } catch (error) {
        console.error("Error fetching invoices:", error);
      }
    };
    fetchInvoices();
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  // const filteredOrders = invoices.filter((invoice) =>
  //   invoice.orderId.toString().includes(searchQuery)
  // );

  return (
    <div>
      <Button color="primary" onClick={handleOpen}>
        <VisibilityIcon fontSize="large" />
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6" component="h2">
              Order Details
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Order Details */}
          {/* <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body1">
                <strong>Order ID:</strong> {order.orderId}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">
                <strong>Order Date:</strong> {new Date(order.orderDate).toLocaleDateString()}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">
                <strong>Booked By:</strong> {order.bookedBy}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">
                <strong>Start Date:</strong> {new Date(order.startDate).toLocaleDateString()}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">
                <strong>Completion Date:</strong>{" "}
                {new Date(order.completionDate).toLocaleDateString()}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">
                <strong>Payment Due Date:</strong>{" "}
                {new Date(order.paymentDueDate).toLocaleDateString()}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">
                <strong>Project Head:</strong> {order.projectHead}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">
                <strong>Customer ID:</strong> {order.customer}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">
                <strong>Customer Name:</strong> {order.customerName}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">
                <strong>Address:</strong> {order.address || "N/A"}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">
                <strong>Bill To:</strong> {order.billTo}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">
                <strong>Quotation Number:</strong> {order.quotationNumber}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">
                <strong>Quotation Date:</strong>{" "}
                {new Date(order.quotationDate).toLocaleDateString()}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">
                <strong>PO/PI Number:</strong> {order.poPiNumber}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">
                <strong>PO/PI Date:</strong> {new Date(order.poPiDate).toLocaleDateString()}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">
                <strong>Transportation Cost:</strong> {order.transportationCost}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">
                <strong>Amount with GST:</strong> {order.amountWithGST}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">
                <strong>Total Amount:</strong> {order.totalAmount}
              </Typography>
            </Grid>
          </Grid> */}
          <Grid
            container
            spacing={2}
            sx={{
              border: "1px solid #e0e0e0 !important", // Add border around the grid
              borderRadius: "8px !important", // Rounded corners
              padding: "16px !important", // Padding inside the container
              backgroundColor: "#f9f9f9 !important", // Light background
            }}
          >
            {[
              { label: "Order ID", value: order.orderId },
              { label: "Order Date", value: new Date(order.orderDate).toLocaleDateString() },
              { label: "Booked By", value: order.bookedBy },
              { label: "Start Date", value: new Date(order.startDate).toLocaleDateString() },
              {
                label: "Completion Date",
                value: new Date(order.completionDate).toLocaleDateString(),
              },
              {
                label: "Payment Due Date",
                value: new Date(order.paymentDueDate).toLocaleDateString(),
              },
              { label: "Project Head", value: order.projectHead },
              { label: "Customer ID", value: order.customer },
              { label: "Customer Name", value: order.customerName },
              { label: "Address", value: order.address || "N/A" },
              { label: "Bill To", value: order.billTo },
              { label: "Quotation Number", value: order.quotationNumber },
              {
                label: "Quotation Date",
                value: new Date(order.quotationDate).toLocaleDateString(),
              },
              { label: "PO/PI Number", value: order.poPiNumber },
              { label: "PO/PI Date", value: new Date(order.poPiDate).toLocaleDateString() },
              { label: "Transportation Cost", value: order.transportationCost },
              { label: "Amount with GST", value: order.amountWithGST },
              { label: "Total Amount", value: order.totalAmount },
            ].map((field, index) => (
              <Grid
                item
                xs={4} // Each row will have three items (12/4 = 3)
                key={index}
                sx={{
                  paddingBottom: "8px !important",
                  paddingRight: "8px !important",
                  marginBottom: "8px !important",
                  borderBottom: "1px solid #e0e0e0 !important",
                  borderRight: "1px solid #e0e0e0 !important",
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1) !important", // Shadow for each field
                  borderRadius: "8px !important", // Slightly rounded corners for shadow
                  backgroundColor: "#f2f2f2 !important",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    display: "flex !important",
                    justifyContent: "space-between !important", // Aligns label and value
                    fontFamily: "Roboto, Arial, sans-serif !important", // Thin and clean font
                    fontWeight: "200 !important", // Makes the font lighter
                  }}
                >
                  <span style={{ fontWeight: 400 }}>{field.label}:</span> {field.value}{" "}
                  {/* {field.value} */}
                </Typography>
              </Grid>
            ))}
          </Grid>

          {/* Invoice Details */}
          <Box mt={3}>
            <Typography variant="h6" gutterBottom>
              Invoice Details
            </Typography>
            <TableContainer component={Paper} style={{ borderRadius: "8px" }}>
              <Table style={{ tableLayout: "fixed", width: "100%" }}>
                <TableHead>
                  <TableRow
                    style={{
                      background: "linear-gradient(to right, #6a11cb, #2575fc)",
                      color: "#333",
                    }}
                  >
                    <TableCell style={{ textAlign: "center", color: "white", width: "250px" }}>
                      Order ID
                    </TableCell>
                    <TableCell style={{ textAlign: "center", color: "white", width: "250px" }}>
                      Invoice ID
                    </TableCell>
                    <TableCell style={{ textAlign: "center", color: "white", width: "250px" }}>
                      Invoice Number
                    </TableCell>
                    <TableCell style={{ textAlign: "center", color: "white", width: "250px" }}>
                      Invoice Date
                    </TableCell>
                  </TableRow>
                </TableHead>
                {/* <TableBody>
                  {filteredOrders.map((invoice, index) => (
                    <TableRow key={index}>
                      <TableCell style={{ textAlign: "center" }}>{invoice.orderId}</TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        {invoice.invoiceId || "N/A"}
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        {invoice.invoiceNumber || "N/A"}
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        {new Date(invoice.invoiceDate).toLocaleDateString() || "N/A"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody> */}
              </Table>
            </TableContainer>
          </Box>

          <Box mt={3} display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              onClick={handleClose}
              style={{ background: "#6a11cb", color: "white" }}
            >
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

// Add PropTypes for validation
ViewModal.propTypes = {
  order: PropTypes.shape({
    orderId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    orderDate: PropTypes.string.isRequired,
    bookedBy: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    completionDate: PropTypes.string.isRequired,
    paymentDueDate: PropTypes.string.isRequired,
    projectHead: PropTypes.string.isRequired,
    customer: PropTypes.string.isRequired,
    address: PropTypes.string,
    billTo: PropTypes.string.isRequired,
    quotationNumber: PropTypes.string.isRequired,
    quotationDate: PropTypes.string.isRequired,
    poPiNumber: PropTypes.string.isRequired,
    poPiDate: PropTypes.string.isRequired,
    transportationCost: PropTypes.number.isRequired,
    amountWithGST: PropTypes.number.isRequired,
    totalAmount: PropTypes.number.isRequired,
    customerName: PropTypes.number.isRequired,
  }).isRequired,
  invoice: PropTypes.arrayOf(
    PropTypes.shape({
      orderId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      invoiceId: PropTypes.string,
      invoiceNumber: PropTypes.string,
      invoiceDate: PropTypes.string,
    })
  ),
};

export default ViewModal;
