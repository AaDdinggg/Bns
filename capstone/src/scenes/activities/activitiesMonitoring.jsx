import React from "react";
import {
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { mockDataBeneficiaries } from "../../data/mockData";

const ActivitiesMonitoring = ({ openViewDialog, setOpenDialog, activity }) => {
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const columns = [
    { field: "id", headerName: "ID" },
    { field: "first_name", headerName: "First Name", flex: 1 },
    { field: "last_name", headerName: "Last Name", flex: 1 },
    { field: "type", headerName: "Type", flex: 1 },
    { field: "address", headerName: "Address", flex: 1 },
    { field: "date_monitored", headerName: "Date Monitored", flex: 1 },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => (
        <Box>
          <IconButton color="primary">
            <EditIcon />
          </IconButton>
          <IconButton color="error">
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Dialog open={openViewDialog} onClose={handleCloseDialog} fullWidth maxWidth="md">
      <DialogTitle>Beneficiaries</DialogTitle>
      <DialogContent>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid rows={mockDataBeneficiaries} columns={columns} autoHeight />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ActivitiesMonitoring;
