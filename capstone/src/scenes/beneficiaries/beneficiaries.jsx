import React from 'react';
import { Box } from "@mui/material";
import Header from "../../components/Header";
import BeneficiariesForm from "./beneficiariesForm";
import Paper from '@mui/material/Paper';
import { styled } from "@mui/system";

// Styled form container using MUI's styled function
const RootContainer = styled('form')(({ theme }) => ({
  margin: theme.spacing(2),
  padding: theme.spacing(3),
}));

const Beneficiaries = () => {


  return (
    <>
      {/* Outer Box for margin */}
      <Box m="20px">
        {/* Inner Box for header */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          {/* Header component */}
          <Header title="BENEFICIARIES" subtitle="List of Beneficiaries" />
        </Box>
      </Box>
      {/* Paper component as a container with elevation */}
      <Paper component={RootContainer} elevation={3}>
        {/* Render the BeneficiariesForm component */}
        <BeneficiariesForm />
      </Paper>
    </>
  );
};

export default Beneficiaries;
