/* eslint-disable react/prop-types */
import React, { useState } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
  Autocomplete,
} from "@mui/material";
import "./globalstyling/modal.css";

const AddBulkProductModal = ({ open, onClose }) => {
  const [image, setImage] = useState(null);
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    selectCategory: "",
    addProductCode: "",
    addProductName: "",
    addProductDesc: "",
  });
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleBackdropClick = (event) => {
    event.stopPropagation(); // Prevent closing the modal when clicking outside
  };

  return (
    <div>
      <Modal open={open} onClose={handleBackdropClick}>
        <Box className="modal-style" onClick={handleBackdropClick}>
          <Typography variant="h6" gutterBottom>
            Bulk Product Form
          </Typography>
          {/*<TextField
                  labelId="demo-multiple-name-label"
                  id="demo-multiple-name"
                  // displayEmpty
                  label="Select Category"
                  name="selectCategory"
                  value={formData.projectHead}
                  // onChange={handleInputChange}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                      "& .MuiOutlinedInput-notchedOutline": {},
                      height: "40px !important",
                      display: "flex",
                      alignItems: "center",
                    },
                    "& .MuiSelect-select": {
                      padding: "0 10px",
                      height: "40px !important",
                      display: "flex",
                      alignItems: "center",
                    },
                  }}
                  select
                  fullWidth
                >
                  <MenuItem value="Category 1">Category 1</MenuItem>
                  <MenuItem value="Category 2">Category 2</MenuItem>
                </TextField> */}
          <Grid item xs={12} md={4} className="flex-align-center">
            <Autocomplete
              options={products} // Use customer objects
              getOptionLabel={(option) => option.contactName} // Get customer name
              // value={selectedCustomer}
              // onChange={handleCustomerChange}
              renderInput={(params) => (
                <TextField
                  select
                  label="Add Product"
                  labelId="demo-multiple-name-label"
                  id="demo-multiple-name"
                  // displayEmpty
                  value={formData.projectHead}
                  // onChange={handleInputChange}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                      "& .MuiOutlinedInput-notchedOutline": {},
                      height: "40px !important",
                      display: "flex",
                      alignItems: "center",
                    },
                    "& .MuiSelect-select": {
                      padding: "0 10px",
                      height: "40px !important",
                      display: "grid",
                      alignItems: "center",
                    },
                  }}
                  fullWidth
                >
                  <MenuItem value="5%">Category 1</MenuItem>
                  <MenuItem value="12%">Category 2</MenuItem>
                  <MenuItem value="18%">Category 3</MenuItem>
                </TextField>
              )}
              style={{ flexGrow: 1 }}
            />
            <Button
              sx={{ color: "white" }}
              variant="contained"
              className="button"
              // onClick={handleModalOpen}
            >
              Add Bulk Product
              {/* <ToastContainer /> */}
            </Button>
            {/* <CustomerModal open={modalOpen} onClose={handleModalClose} /> */}
          </Grid>
          <TextField
            label="Add Code"
            type="url" // Ensures it accepts URLs
            fullWidth
            margin="normal"
            variant="outlined"
            placeholder="https://example.com"
          />
          <TextField label="Add Product Name" fullWidth margin="normal" variant="outlined" />
          <TextField
            label="Add Product Description"
            fullWidth
            margin="normal"
            variant="outlined"
            multiline
            rows={3}
          />
          {/* <TextField label="Add Product Description" fullWidth margin="normal" variant="outlined" /> */}
          <TextField
            select
            label="Add Stock"
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            // displayEmpty
            value={formData.projectHead}
            // onChange={handleInputChange}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                "& .MuiOutlinedInput-notchedOutline": {},
                height: "40px !important",
                display: "flex",
                alignItems: "center",
              },
              "& .MuiSelect-select": {
                padding: "0 10px",
                height: "40px !important",
                display: "flex",
                alignItems: "center",
              },
            }}
            fullWidth
          >
            <MenuItem value="5%">5%</MenuItem>
            <MenuItem value="12%">12%</MenuItem>
            <MenuItem value="18%">18%</MenuItem>
          </TextField>
          <Grid container spacing={2} marginTop={1}>
            <Grid item xs={6}>
              <TextField label="Tax Slab" fullWidth variant="outlined" />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="HSN Code"
                fullWidth
                variant="outlined"
                placeholder="https://example.com"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Price" fullWidth variant="outlined" />
            </Grid>
          </Grid>
          <Typography variant="h6" mt={2} gutterBottom>
            Upload
          </Typography>
          <input
            accept="image/*"
            type="file"
            onChange={handleImageUpload}
            style={{ marginBottom: "8px" }}
          />
          <Typography variant="body2" color="textSecondary">
            Maximum size 2Mb
          </Typography>
          {image && (
            <Box className="box-style">
              <img
                src={image}
                alt="Uploaded Preview"
                style={{ maxWidth: "100%", maxHeight: "100%" }}
              />
            </Box>
          )}
          <Box textAlign="center" marginTop={3}>
            <Button variant="contained" className="custom-button" onClick={onClose}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default AddBulkProductModal;
