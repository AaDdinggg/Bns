import React, { useState } from "react";
import {
  Grid,
  TextField,
  MenuItem,
  styled,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";


// Styled form container using MUI's styled function
const RootContainer = styled("form")({
  "& .MuiFormControl-root": {
    width: "80%",
    margin: "1em",
  },
});

// Initial form values
const initialFValues = {
  id: 0,
  firstname: "",
  lastname: "",
  barangay: "",
  birthdate: "",
  sex: "male",
  purok: "",
  username: "",
  password: "",
};

const BnsForm = ({ onClose, onAddBns }) => {
  // State to manage form values
  const [values, setValues] = useState(initialFValues);

  // State to manage dialog visibility
  const [openDialog, setOpenDialog] = useState(true);

  // Function to handle changes in form fields
  const handleChange = (field, value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };

  // Function to handle form submission
  const handleSubmit = () => {
    // Handle form submission logic here
    console.log("Form submitted with values:", values);
    // Reset form values
    setValues(initialFValues);
    // Trigger the callback for adding a beneficiary
    onAddBns(values);
    // Close the dialog
    setOpenDialog(false);
  };

  return (
    <Dialog open={openDialog} onClose={onClose}>
      <DialogTitle>Add Barangay Nutrition Scholar</DialogTitle>
      <DialogContent>
        <RootContainer>
          {/* Grid container for form layout */}
          <Grid container spacing={2}>
            {/* Form fields */}
            <Grid item xs={6}>
              <TextField
                id="firstname"
                variant="outlined"
                label="First Name"
                value={values.firstname}
                onChange={(e) => handleChange("firstname", e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="lastname"
                variant="outlined"
                label="Last Name"
                value={values.lastname}
                onChange={(e) => handleChange("lastname", e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="barangay"
                variant="outlined"
                label="Barangay"
                value={values.type}
                onChange={(e) => handleChange("barangay", e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="birthdate" // Make sure to use a meaningful and unique ID
                label="Birthdate"
                type="date"
                variant="outlined"
                value={values.birthdate}
                onChange={(e) => handleChange("birthdate", e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="sex"
                select
                variant="outlined"
                label="Sex"
                value={values.sex}
                onChange={(e) => handleChange("sex", e.target.value)}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="purok"
                variant="outlined"
                label="Purok"
                value={values.job}
                onChange={(e) => handleChange("purok", e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="username"
                variant="outlined"
                label="Username"
                value={values.job}
                onChange={(e) => handleChange("username", e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="password"
                variant="outlined"
                label="Password"
                value={values.job}
                onChange={(e) => handleChange("password", e.target.value)}
              />
            </Grid>
          </Grid>
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

export default BnsForm;
