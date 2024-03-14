import React, { useState } from "react";
import { Box, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { mockDataBeneficiaries } from "../../data/mockData";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

const ActivitiesMonitoring = () => {
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
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
      field: "date_monitored",
      headerName: "Date Monitored",
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
          <IconButton color="info" onClick={() => handleView(params.row.id)}>
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

  const handleDelete = (id) => {
    console.log(`Delete row with ID: ${id}`);
  };

  return (
    <Box m="20px">
      <DataGrid rows={mockDataBeneficiaries} columns={columns} />
    </Box>
  );
};

export default ActivitiesMonitoring;
