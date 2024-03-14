import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  Select,
  MenuItem,
  TextField,
  styled,
  InputLabel,
  FormControl
} from "@mui/material";

const RootContainer = styled("form")({
  display: "flex",
  flexDirection: "row",
});

const FormContainer = styled(Grid)({
  "& .MuiFormControl-root": {
    width: "100%",
    margin: "1em",
  },
});

const BeneficiariesContainer = styled(Grid)({
  borderLeft: "1px solid #ccc",
  padding: "1em",
});

const initialFValues = {
  id: 0,
  activityName: "",
  description: "",
  yearAndDate: "",
};

const ActivitiesForm = ({
  onClose,
  onAddActivity,
  activityId,
  beneficiaries,
}) => {
  const [values, setValues] = useState(initialFValues);
  const [selectedBeneficiaries, setSelectedBeneficiaries] = useState([]);
  const [openDialog, setOpenDialog] = useState(true);

  const handleChange = (field, value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("Form submitted with values:", values);
    console.log("Selected Beneficiaries:", selectedBeneficiaries);
    setValues(initialFValues);
    onAddActivity(values, selectedBeneficiaries, activityId);
    setOpenDialog(false);
  };

  const handleBeneficiarySelect = (beneficiaryId) => {
    setSelectedBeneficiaries((prevSelected) => {
      if (prevSelected.includes(beneficiaryId)) {
        return prevSelected.filter((id) => id !== beneficiaryId);
      } else {
        return [...prevSelected, beneficiaryId];
      }
    });
  };

  const [sortField, setSortField] = useState(""); // State to track the selected sorting field

  const handleSortBeneficiaries = () => {
    // Implement your sorting logic here based on the selected field
    console.log(`Sorting by: ${sortField}`);
  };

  return (
    <Dialog open={openDialog} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ fontSize: "24px" }}>Add Activity</DialogTitle>
      <DialogContent>
        <RootContainer>
          {/* Form for adding activity */}
          <FormContainer container spacing={2} item xs={6} marginBottom="auto">
            <Grid item xs={9}>
              <TextField
                id="activityName"
                variant="outlined"
                label="Activity Name"
                value={values.activityName}
                onChange={(e) => handleChange("activityName", e.target.value)}
              />
            </Grid>
            <Grid item xs={9}>
              <TextField
                id="description"
                variant="outlined"
                label="Description"
                value={values.description}
                onChange={(e) => handleChange("description", e.target.value)}
              />
            </Grid>
            <Grid item xs={9}>
              <TextField
                id="yearAndDate"
                label="Year and Date"
                type="date"
                variant="outlined"
                value={values.yearAndDate}
                onChange={(e) => handleChange("yearAndDate", e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          </FormContainer>

          {/* List of Beneficiaries with sorting options */}
          <BeneficiariesContainer container spacing={2} item xs={6}>
            <Grid item xs={12}>
              <Typography variant="h6">Beneficiaries List</Typography>
              <List>
  <ListItem>
    <FormControl variant="outlined" sx={{ minWidth: "180px", marginRight: "10px" }}>
      <InputLabel sx={{ fontSize: "12px" }}>Sort By</InputLabel>
      <Select
        value={sortField}
        onChange={(e) => setSortField(e.target.value)}
        label="Sort By"
      >
        <MenuItem value="">None</MenuItem>
        <MenuItem value="first_name">First Name</MenuItem>
        <MenuItem value="last_name">Last Name</MenuItem>
        <MenuItem value="type">Type</MenuItem>
        <MenuItem value="address">Address</MenuItem>
        <MenuItem value="sex">Sex</MenuItem>
        <MenuItem value="job">Job</MenuItem>
        <MenuItem value="birthday">Birthday</MenuItem>
      </Select>
    </FormControl>
    <Button
      variant="contained"
      color="primary"
      onClick={handleSortBeneficiaries}
    >
      Sort
    </Button>
  </ListItem>

  {beneficiaries.map((beneficiary) => (
    <ListItem key={beneficiary.id}>
      <ListItemText
        primary={`${beneficiary.first_name} ${beneficiary.last_name}`}
      />
      <Checkbox
        checked={selectedBeneficiaries.includes(beneficiary.id)}
        onChange={() => handleBeneficiarySelect(beneficiary.id)}
      />
    </ListItem>
  ))}
</List>

            </Grid>
          </BeneficiariesContainer>
        </RootContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ActivitiesForm;
