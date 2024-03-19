import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';

export default function ActivitiesEdit({ openEditDialog, onClose, handleSubmit, initialValues }) {
  const [values, setValues] = useState({
    activityName: '',
    description: '',
    yearAndDate: '',
  });

  // Use useEffect to set initial form values when initialValues prop changes
  useEffect(() => {
    if (initialValues) {
      setValues(initialValues);
    }
  }, [initialValues]);

  const handleChange = (field, value) => {
    setValues({ ...values, [field]: value });
  };

  const handleClose = () => {
    setValues({
      activityName: '',
      description: '',
      yearAndDate: '',
    });
    onClose(); // Triggering the onClose function passed from parent
  };

  const handleSave = () => {
    handleSubmit(values); // Pass the form values to the handleSubmit function
    handleClose(); // Close the dialog after handling submit
  };

  return (
    <Dialog open={openEditDialog} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ fontSize: '24px' }}>Edit Activity</DialogTitle>
      <DialogContent>
        <TextField
          id="activityName"
          variant="outlined"
          label="Activity Name"
          value={values.activityName}
          onChange={(e) => handleChange('activityName', e.target.value)}
          fullWidth
          sx={{ marginBottom: 3 }}
        />
        <TextField
          id="description"
          variant="outlined"
          label="Description"
          value={values.description}
          onChange={(e) => handleChange('description', e.target.value)}
          fullWidth
          sx={{ marginBottom: 3 }}
        />
        <TextField
          id="yearAndDate"
          label="Year and Date"
          type="date"
          variant="outlined"
          value={values.yearAndDate}
          onChange={(e) => handleChange('yearAndDate', e.target.value)}
          InputLabelProps={{ shrink: true }}
          fullWidth
          sx={{ marginBottom: 3 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}