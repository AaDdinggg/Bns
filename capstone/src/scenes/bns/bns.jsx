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
import { mockDataBns } from "../../data/mockData";
import Header from "../../components/Header";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import BnsForm from "./bnsForm";

const Bns = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [viewDialogOpen, setViewDialogOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [selectedRowId, setSelectedRowId] = useState(null);
    const [openBnsForm, setOpenBnsForm] = useState(false);
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
            field: "barangay",
            headerName: "Barangay",
            flex: 1,
        },
        {
            field: "birthdate",
            headerName: "Birthdate",
            flex: 1,
        },
        {
            field: "sex",
            headerName: "Sex",
            flex: 1,
        },
        {
            field: "purok",
            headerName: "Purok",
            flex: 1,
        },
        {
            field: "username",
            headerName: "Username",
            flex: 1,
        },
        {
            field: "password",
            headerName: "Password",
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
                    <IconButton color="error" onClick={() => handleDelete(params.row.id)}>
                        <DeleteIcon />
                    </IconButton>
                </Box>
            ),
        },
    ];

    const handleUpdate = (id) => {
        const selectedRow = mockDataBns.find((row) => row.id === id);
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
        setOpenBnsForm(true);
    };

    const handleCloseAddForm = () => {
        setOpenBnsForm(false);
    };

    const handleAddBns = (formData) => {
        console.log("Adding new bns:", formData);
        setOpenBnsForm(false);
    };

    const handleCloseEditForm = () => {
        setEditDialogOpen(false);
    };

    const handleEditBns = (formData) => {
        console.log("Editing bns with ID:", editFormData.id, "Data:", formData);
        const updatedData = mockDataBns.map((row) =>
            row.id === editFormData.id ? { ...row, ...formData } : row
        );

        setEditDialogOpen(false);
    };

    return (
        <>
            <Box m="20px">
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Header
                        title="Barangay Nutrition Scholar"
                        subtitle="List of Barangay Nutrition Scholar"
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleOpenAddForm}
                    >
                        Add BNS
                    </Button>
                </Box>
            </Box>
            <Box m="20px" style={{ height: "400px", overflowY: "auto" }}>
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    paddingRight={2}
                >
                    <Box m="20px" style={{ width: "100%" }}>
                        <DataGrid rows={mockDataBns} columns={columns}/>
                    </Box>
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
                                    <strong>First Name:</strong>{" "}
                                    {mockDataBns[selectedRowId - 1].first_name}
                                </Typography>
                                <Typography sx={{ fontSize: "18px" }}>
                                    <strong>Last Name:</strong>{" "}
                                    {mockDataBns[selectedRowId - 1].last_name}
                                </Typography>
                                <Typography sx={{ fontSize: "18px" }}>
                                    <strong>Barangay:</strong>{" "}
                                    {mockDataBns[selectedRowId - 1].barangay}
                                </Typography>
                                <Typography sx={{ fontSize: "18px" }}>
                                    <strong>Birth Date:</strong>{" "}
                                    {mockDataBns[selectedRowId - 1].birthdate}
                                </Typography>
                                <Typography sx={{ fontSize: "18px" }}>
                                    <strong>Sex:</strong> {mockDataBns[selectedRowId - 1].sex}
                                </Typography>
                                <Typography sx={{ fontSize: "18px" }}>
                                    <strong>Purok:</strong> {mockDataBns[selectedRowId - 1].purok}
                                </Typography>
                                <Typography sx={{ fontSize: "18px" }}>
                                    <strong>Username:</strong>{" "}
                                    {mockDataBns[selectedRowId - 1].username}
                                </Typography>
                                <Typography sx={{ fontSize: "18px" }}>
                                    <strong>Password:</strong>{" "}
                                    {mockDataBns[selectedRowId - 1].password}
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
                    <DialogTitle>Edit Barangay Nutrition Scholar</DialogTitle>
                    <DialogContent>
                        {editFormData && (
                            <BnsForm
                                initialData={editFormData}
                                onClose={handleCloseEditForm}
                                onEditBns={handleEditBns}
                            />
                        )}
                    </DialogContent>
                </Dialog>

                {openBnsForm && (
                    <BnsForm onClose={handleCloseAddForm} onAddBns={handleAddBns} />
                )}
            </Box >
        </>
    );
};

export default Bns;
