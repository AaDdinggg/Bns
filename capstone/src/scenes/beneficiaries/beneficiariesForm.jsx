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
  type: "",
  address: "",
  sex: "male",
  job: "",
  birthdate: "",
};

const BeneficiariesForm = ({ onClose, onAddBeneficiary }) => {
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
    onAddBeneficiary(values);
    // Close the dialog
    setOpenDialog(false);
  };

  return (
    <Dialog open={openDialog} onClose={onClose}>
      <DialogTitle>Add Beneficiary</DialogTitle>
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
                id="type"
                variant="outlined"
                label="Type"
                value={values.type}
                onChange={(e) => handleChange("type", e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="address"
                variant="outlined"
                label="Address"
                value={values.address}
                onChange={(e) => handleChange("address", e.target.value)}
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
                id="job"
                variant="outlined"
                label="Job"
                value={values.job}
                onChange={(e) => handleChange("job", e.target.value)}
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

export default BeneficiariesForm;
