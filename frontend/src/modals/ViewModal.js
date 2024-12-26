// import React, { useState, useEffect } from "react";
// import {
//   Paper,
//   Modal,
//   Box,
//   Typography,
//   Button,
//   Grid,
//   IconButton,
//   TableContainer,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
// } from "@mui/material";
// import PropTypes from "prop-types"; // Import PropTypes
// import CloseIcon from "@mui/icons-material/Close";
// import axios from "axios";
// import VisibilityIcon from "@mui/icons-material/Visibility";

// const modalStyle = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: "100%",
//   maxWidth: 1000,
//   bgcolor: "background.paper",
//   boxShadow: 24,
//   p: 4,
//   borderRadius: "8px",
// };

// function ViewModal({ order, invoice }) {
//   const [open, setOpen] = useState(false);
//   const [invoices, setInvoices] = useState([]);
//   const [selectedRequest, setSelectedRequest] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");

//   useEffect(() => {
//     const fetchInvoices = async () => {
//       try {
//         const response = await axios.get("http://localhost:8080/invoices");
//         setInvoices(response.data);
//       } catch (error) {
//         console.error("Error fetching invoices:", error);
//       }
//     };
//     fetchInvoices();
//   }, []);
//   const handleOpen = () => {
//     setOpen(true);
//   };
//   const handleClose = () => setOpen(false);
//   const filteredOrders = invoices.filter((invoice) => {
//     if (selectedRequest === "all requests") {
//       return invoice.orderId.toString().includes(searchQuery);
//     } else {
//       return invoice.orderId.toString().includes(searchQuery) && invoice.userId === "your_user_id"; // Replace 'your_user_id' with the actual user ID
//     }
//   });

//   return (
//     <div>
//       <Button
//         color="primary"
//         onClick={handleOpen}
//         // style={{
//         //   background: "linear-gradient(to right, #6a11cb, #2575fc)",
//         //   color: "white",
//         // }}
//       >
//         <VisibilityIcon fontSize="large" />
//       </Button>
//       <Modal open={open} onClose={handleClose}>
//         <Box sx={modalStyle}>
//           <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//             <Typography variant="h6" component="h2">
//               Order Details
//             </Typography>
//             <IconButton onClick={handleClose}>
//               <CloseIcon />
//             </IconButton>
//           </Box>

//           <Grid container spacing={2}>
//             <Grid item xs={4}>
//               <Typography variant="body1">
//                 <strong>Order ID:</strong> {order.id}
//               </Typography>
//             </Grid>
//             <Grid item xs={4}>
//               <Typography variant="body1">
//                 <strong>Customer Name:</strong> {order.name}
//               </Typography>
//             </Grid>
//             <Grid item xs={4}>
//               <Typography variant="body1">
//                 <strong>Quotation Number:</strong> {order.quotationNumber}
//               </Typography>
//             </Grid>
//             <Grid item xs={4}>
//               <Typography variant="body1">
//                 <strong>Email:</strong> {order.email}
//               </Typography>
//             </Grid>
//             <Grid item xs={4}>
//               <Typography variant="body1">
//                 <strong>Phone Number:</strong> {order.phoneNumber}
//               </Typography>
//             </Grid>
//           </Grid>
//           <Box mt={3}>
//             <Typography variant="h6" gutterBottom>
//               Invoice Details
//             </Typography>
//             <TableContainer component={Paper} style={{ borderRadius: "8px" }}>
//               <Table style={{ tableLayout: "fixed", width: "100%" }}>
//                 <TableHead>
//                   <TableRow
//                     style={{
//                       background: "linear-gradient(to right, #6a11cb, #2575fc)",

//                       color: "#333",
//                       borderRadius: "8px",
//                       display: "flex",
//                     }}
//                   >
//                     <TableCell
//                       style={{
//                         padding: "12px 16px",
//                         flexGrow: 1,
//                         textAlign: "center",
//                         color: "white",
//                       }}
//                     >
//                       OrderID
//                     </TableCell>
//                     <TableCell
//                       style={{
//                         padding: "12px 16px",
//                         flexGrow: 1,
//                         textAlign: "center",
//                         color: "white",
//                       }}
//                     >
//                       InvoiceID
//                     </TableCell>
//                     <TableCell
//                       style={{
//                         padding: "12px 16px",
//                         flexGrow: 1,
//                         color: "white",
//                         textAlign: "center",
//                       }}
//                     >
//                       Invoice Number
//                     </TableCell>
//                     <TableCell
//                       style={{
//                         padding: "12px 16px",
//                         flexGrow: 1,
//                         textAlign: "center",
//                         color: "white",
//                       }}
//                     >
//                       Invoice Date
//                     </TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {invoices &&
//                     filteredOrders.map((invoice, index) => (
//                       <TableRow
//                         key={index}
//                         style={{
//                           borderBottom: "1px solid #e0e0e0",
//                           display: "flex",
//                         }}
//                       >
//                         <TableCell
//                           style={{
//                             padding: "12px 16px",
//                             flexGrow: 1,
//                             textAlign: "center",
//                           }}
//                         >
//                           {invoice.orderId}
//                         </TableCell>
//                         <TableCell
//                           style={{
//                             padding: "12px 16px",
//                             flexGrow: 1,
//                             textAlign: "center",
//                           }}
//                         >
//                           {invoice.invoiceId || "N/A"}
//                         </TableCell>
//                         <TableCell
//                           style={{
//                             padding: "12px 16px",
//                             flexGrow: 1,
//                             textAlign: "center",
//                           }}
//                         >
//                           {invoice.invoiceNumber || "N/A"}
//                         </TableCell>
//                         <TableCell
//                           style={{
//                             padding: "12px 16px",
//                             flexGrow: 1,
//                             textAlign: "center",
//                           }}
//                         >
//                           {new Date(invoice.invoiceDate).toLocaleDateString() || "N/A"}
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </Box>

//           <Box mt={3} display="flex" justifyContent="flex-end">
//             <Button
//               variant="contained"
//               onClick={handleClose}
//               style={{ background: "#6a11cb", color: "white" }}
//             >
//               Close
//             </Button>
//           </Box>
//         </Box>
//       </Modal>
//     </div>
//   );
// }

// // Add PropTypes to validate the `order` and `invoice` props
// ViewModal.propTypes = {
//   order: PropTypes.shape({
//     id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
//     name: PropTypes.string.isRequired,
//     quotationNumber: PropTypes.string.isRequired,
//     email: PropTypes.string.isRequired,
//     phoneNumber: PropTypes.string.isRequired,
//   }).isRequired,
//   invoice: PropTypes.arrayOf(
//     PropTypes.shape({
//       orderId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
//       invoiceId: PropTypes.string,
//       invoiceNumber: PropTypes.string,
//       invoiceDate: PropTypes.string,
//     })
//   ),
// };

// export default ViewModal;

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
  width: "100%",
  maxWidth: 1000,
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

  const filteredOrders = invoices.filter((invoice) =>
    invoice.orderId.toString().includes(searchQuery)
  );

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
          <Grid container spacing={2}>
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
                    <TableCell style={{ textAlign: "center", color: "white" }}>Order ID</TableCell>
                    <TableCell style={{ textAlign: "center", color: "white" }}>
                      Invoice ID
                    </TableCell>
                    <TableCell style={{ textAlign: "center", color: "white" }}>
                      Invoice Number
                    </TableCell>
                    <TableCell style={{ textAlign: "center", color: "white" }}>
                      Invoice Date
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
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
                </TableBody>
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
