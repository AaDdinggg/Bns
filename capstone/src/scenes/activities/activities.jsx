import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  MenuItem,
  Grid,
} from "@mui/material";
import { mockDataActivities } from "../../data/mockData";
import { mockDataBeneficiaries } from "../../data/mockData";
import Header from "../../components/Header";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ActivitiesForm from "./activitiesForm";
import ActivitiesMonitoring from "./activitiesMonitoring";

const ActivityContainer = ({ children }) => (
  <Box m="20px" sx={{ maxHeight: 'calc(90vh - 160px)', overflowY: 'auto' }}
  paddingRight={3}
  >
    <Grid container spacing={3}>
      {children}
    </Grid>
  </Box>
);

const ActivityBox = ({ activity, onDelete, onView, onEdit }) => (
  <Grid item xs={12}>
    <Box
      key={activity.id}
      border={1}
      borderRadius={2}
      padding={3}
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      height={110}
      sx={{ boxShadow: 3 }}
    >
      <Box>
        <Typography variant="h3" fontWeight="bold" sx={{ m: "10px 0 0 0" }}>
          {activity.list}
        </Typography>
        <Typography variant="h4" sx={{ m: "10px 0 0 0" }}>
          {activity.date}
        </Typography>
      </Box>
      <Box>
        <Button color="primary" onClick={() => onEdit(activity.id)} margin="1">
          <EditIcon />
        </Button>
        <Button color="info" onClick={() => onView(activity)} margin="1">
          <VisibilityIcon />
        </Button>
        <Button color="error" onClick={() => onDelete(activity.id)} margin="1">
          <DeleteIcon />
        </Button>
      </Box>
    </Box>
  </Grid>
);

const Activities = () => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [openActivitiesForm, setOpenActivitiesForm] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [sortedActivities, setSortedActivities] = useState(mockDataActivities);

  const handleView = (activity) => {
    setSelectedRow(activity);
  };

  const handleDelete = (id) => {
    console.log(`Delete row with ID: ${id}`);
  };

  const handleOpenAddForm = () => {
    setOpenActivitiesForm(true);
  };

  const handleCloseAddForm = () => {
    setOpenActivitiesForm(false);
  };

  const handleAddActivity = (formData) => {
    console.log("Adding new activity:", formData);
    setOpenActivitiesForm(false);
  };

  const handleSortByDate = () => {
    const sortedByDate = mockDataActivities
      .filter((activity) => {
        const activityDate = new Date(activity.date);
        return (
          activityDate.getMonth() === parseInt(selectedMonth, 10) - 1 &&
          activityDate.getFullYear() === parseInt(selectedYear, 10)
        );
      })
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    setSortedActivities(sortedByDate);
  };

  const handleEdit = (id) => {
    console.log(`Edit row with ID: ${id}`);
    // Add your edit functionality here, such as redirecting to activitiesEdit
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const years = ["2022", "2023", "2024", "2025"];

  return (
    <>
      <Box m="20px">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Header title="ACTIVITIES" subtitle="List of Activities" />
          </Box>
          <Box display="flex" alignItems="center">
            <Button variant="contained" color="primary" onClick={handleOpenAddForm}>
              Add Activity
            </Button>
            <TextField
              label="Select Month"
              variant="outlined"
              sx={{ width: '25ch', ml: 2 }}
              select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              {months.map((month, index) => (
                <MenuItem key={index} value={(index + 1).toString()}>
                  {month}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Select Year"
              variant="outlined"
              sx={{ width: '25ch', ml: 2 }}
              select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              {years.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </TextField>
            <Button variant="contained" color="primary" onClick={handleSortByDate} sx={{ ml: 2 }}>
              Sort
            </Button>
          </Box>
        </Box>
      </Box>

      <ActivityContainer>
        {sortedActivities.map((activity) => (
          <ActivityBox
            key={activity.id}
            activity={activity}
            onDelete={handleDelete}
            onView={handleView}
            onEdit={handleEdit}
          />
        ))}
      </ActivityContainer>

      {selectedRow && <ActivitiesMonitoring activity={selectedRow} />}
      {openActivitiesForm && (
        <ActivitiesForm
          onClose={handleCloseAddForm}
          onAddActivity={handleAddActivity}
          beneficiaries={mockDataBeneficiaries}
        />
      )}
    </>
  );
};

export default Activities;
