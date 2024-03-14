import React, { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Typography,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataBeneficiaries } from "../../data/mockData";
import Header from "../../components/Header";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import BeneficiariesForm from "./beneficiariesForm";


const Beneficiaries = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [openBeneficiaryForm, setOpenBeneficiaryForm] = useState(false);
  const [editFormData, setEditFormData] = useState(null);

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "first_name",
      headerName: "First Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "last_name",
      headerName: "Last Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "type",
      headerName: "Type",
      flex: 1,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
    },
    {
      field: "sex",
      headerName: "Sex",
      flex: 1,
    },
    {
      field: "job",
      headerName: "Job",
      flex: 1,
    },
    {
      field: "birthdate",
      headerName: "Birth date",
      flex: 1,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => (
        <Box>
          <IconButton
            color="primary"
            onClick={() => handleUpdate(params.row.id)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="info"
            onClick={() => handleView(params.row.id)}
          >
            <VisibilityIcon />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => handleDelete(params.row.id)}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  const handleUpdate = (id) => {
    const selectedRow = mockDataBeneficiaries.find((row) => row.id === id);
    setEditFormData(selectedRow);
    setEditDialogOpen(true);
  };

  const handleView = (id) => {
    setSelectedRowId(id);
    setViewDialogOpen(true);
  };

  const handleCloseViewDialog = () => {
    setViewDialogOpen(false);
  };

  const handleDelete = (id) => {
    console.log(`Delete row with ID: ${id}`);
  };

  const handleOpenAddForm = () => {
    setOpenBeneficiaryForm(true);
  };

  const handleCloseAddForm = () => {
    setOpenBeneficiaryForm(false);
  };

  const handleAddBeneficiary = (formData) => {
    console.log("Adding new beneficiary:", formData);
    setOpenBeneficiaryForm(false);
  };

  const handleCloseEditForm = () => {
    setEditDialogOpen(false);
  };

  const handleEditBeneficiary = (formData) => {
    console.log("Editing beneficiary with ID:", editFormData.id, "Data:", formData);
    const updatedData = mockDataBeneficiaries.map((row) =>
      row.id === editFormData.id ? { ...row, ...formData } : row
    );

    setEditDialogOpen(false);
  };

  return (
    <>
      <Box m="20px">
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Header
            title="BENEFICIARIES"
            subtitle="List of Beneficiaries"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenAddForm}
          >
            Add Beneficiary
          </Button>
        </Box>
      </Box>
      <Box m="20px" style={{ height: "400px", overflow: "auto" }} paddingRight={2}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <DataGrid rows={mockDataBeneficiaries} columns={columns} />
        </Box>
        <Dialog open={viewDialogOpen} onClose={handleCloseViewDialog}>
          <DialogTitle sx={{ fontSize: "22px" }}>Details</DialogTitle>
          <DialogContent>
            {selectedRowId && (
              <Box>
                <Typography variant="h6" sx={{ fontSize: "18px" }}>
                  Details for ID: {selectedRowId}
                </Typography>
                <Typography sx={{ fontSize: "18px" }}>
                  <strong>First Name:</strong> {mockDataBeneficiaries[selectedRowId - 1].first_name}
                </Typography>
                <Typography sx={{ fontSize: "18px" }}>
                  <strong>Last Name:</strong> {mockDataBeneficiaries[selectedRowId - 1].last_name}
                </Typography>
                <Typography sx={{ fontSize: "18px" }}>
                  <strong>Type:</strong> {mockDataBeneficiaries[selectedRowId - 1].type}
                </Typography>
                <Typography sx={{ fontSize: "18px" }}>
                  <strong>Address:</strong> {mockDataBeneficiaries[selectedRowId - 1].address}
                </Typography>
                <Typography sx={{ fontSize: "18px" }}>
                  <strong>Sex:</strong> {mockDataBeneficiaries[selectedRowId - 1].sex}
                </Typography>
                <Typography sx={{ fontSize: "18px" }}>
                  <strong>Job:</strong> {mockDataBeneficiaries[selectedRowId - 1].job}
                </Typography>
                <Typography sx={{ fontSize: "18px" }}>
                  <strong>Birth Date:</strong> {mockDataBeneficiaries[selectedRowId - 1].birthdate}
                </Typography>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseViewDialog} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={editDialogOpen} onClose={handleCloseEditForm}>
          <DialogTitle>Edit Beneficiary</DialogTitle>
          <DialogContent>
            {editFormData && (
              <BeneficiariesForm
                initialData={editFormData}
                onClose={handleCloseEditForm}
                onEditBeneficiary={handleEditBeneficiary}
              />
            )}
          </DialogContent>
        </Dialog>

        {openBeneficiaryForm && (
          <BeneficiariesForm
            onClose={handleCloseAddForm}
            onAddBeneficiary={handleAddBeneficiary}
          />
        )}
      </Box>
    </>
  );
};

export default Beneficiaries;
