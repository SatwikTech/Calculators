// src/components/InsuranceForm.js

import React, { useState, useEffect } from "react";
import { MenuItem, Select, FormControl, InputLabel, TextField, Button, Grid } from "@mui/material";
import { insuranceData } from "../data"; // Import the data

const InsuranceForm = () => {
  // State variables to track selected values
  const [selectedState, setSelectedState] = useState("");
  const [companies, setCompanies] = useState([]);
  const [productTypes, setProductTypes] = useState([]);
  const [filingStatuses, setFilingStatuses] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedProductType, setSelectedProductType] = useState("");
  const [selectedFilingStatus, setSelectedFilingStatus] = useState("");
  const [submissionDate, setSubmissionDate] = useState("");
  const [dispositionDate, setDispositionDate] = useState("");

const stateNames= ["Texas", "California", "Florida", "New York", "Illinois"];
  // Handle state change
  const handleStateChange = (event) => {
    const selectedState = event.target.value;
    setSelectedState(selectedState);

    // Filter the data based on selected state
    const filteredData = insuranceData.filter(
      (item) => item.state === selectedState
    );

    // Populate company, product type, and filing status dropdowns
    const companies = [...new Set(filteredData.map((item) => item.company))];
    const productTypes = [
      ...new Set(filteredData.map((item) => item.productType)),
    ];
    const filingStatuses = [
      ...new Set(filteredData.flatMap((item) => item.filingStatuses)),
    ];

    setCompanies(companies);
    setProductTypes(productTypes);
    setFilingStatuses(filingStatuses);

    // Reset other fields on state change
    setSelectedCompany("");
    setSelectedProductType("");
    setSelectedFilingStatus("");
    setSubmissionDate("");
    setDispositionDate("");
  };

  // Handle company change
  const handleCompanyChange = (event) => {
    const selectedCompany = event.target.value;
    setSelectedCompany(selectedCompany);

    const filteredData = insuranceData.filter(
      (item) => item.company === selectedCompany && item.state === selectedState
    );

    const productTypes = [
      ...new Set(filteredData.map((item) => item.productType)),
    ];
    const filingStatuses = [
      ...new Set(filteredData.flatMap((item) => item.filingStatuses)),
    ];

    setProductTypes(productTypes);
    setFilingStatuses(filingStatuses);

    setSelectedProductType("");
    setSelectedFilingStatus("");
    setSubmissionDate("");
    setDispositionDate("");
  };

  // Handle product type change
  const handleProductTypeChange = (event) => {
    const selectedProductType = event.target.value;
    setSelectedProductType(selectedProductType);

    const filteredData = insuranceData.filter(
      (item) =>
        item.productType === selectedProductType &&
        item.company === selectedCompany &&
        item.state === selectedState
    );

    const filingStatuses = [
      ...new Set(filteredData.flatMap((item) => item.filingStatuses)),
    ];

    setFilingStatuses(filingStatuses);

    setSelectedFilingStatus("");
    setSubmissionDate("");
    setDispositionDate("");
  };

  // Handle filing status change
  const handleFilingStatusChange = (event) => {
    const selectedFilingStatus = event.target.value;
    setSelectedFilingStatus(selectedFilingStatus);

    const filteredData = insuranceData.filter(
      (item) =>
        item.filingStatuses.includes(selectedFilingStatus) &&
        item.productType === selectedProductType &&
        item.company === selectedCompany &&
        item.state === selectedState
    );

    if (filteredData.length > 0) {
      setSubmissionDate(filteredData[0].submissionDate);
      setDispositionDate(filteredData[0].dispositionDate);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={3}>
        <FormControl fullWidth>
          <InputLabel>State</InputLabel>
          <Select
            value={selectedState}
            onChange={handleStateChange}
            label="State"
          >
            {stateNames.map(
              (state) => (
                <MenuItem key={state} value={state}>
                  {state}
                </MenuItem>
              )
            )}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} md={3}>
        <FormControl fullWidth>
          <InputLabel>Company</InputLabel>
          <Select
            value={selectedCompany}
            onChange={handleCompanyChange}
            label="Company"
            disabled={!selectedState}
          >
            {companies.map((company) => (
              <MenuItem key={company} value={company}>
                {company}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} md={3}>
        <FormControl fullWidth>
          <InputLabel>Product Type</InputLabel>
          <Select
            value={selectedProductType}
            onChange={handleProductTypeChange}
            label="Product Type"
            disabled={!selectedCompany}
          >
            {productTypes.map((productType) => (
              <MenuItem key={productType} value={productType}>
                {productType}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} md={3}>
        <FormControl fullWidth>
          <InputLabel>Filing Status</InputLabel>
          <Select
            value={selectedFilingStatus}
            onChange={handleFilingStatusChange}
            label="Filing Status"
            disabled={!selectedProductType}
          >
            {filingStatuses.map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      {submissionDate && (
        <Grid item xs={12} md={6}>
          <TextField
            label="Submission Date"
            value={submissionDate}
            fullWidth
            InputProps={{ readOnly: true }}
          />
        </Grid>
      )}

      {dispositionDate && (
        <Grid item xs={12} md={6}>
          <TextField
            label="Disposition Date"
            value={dispositionDate}
            fullWidth
            InputProps={{ readOnly: true }}
          />
        </Grid>
      )}

      <Grid item xs={12}>
        <Button variant="contained" color="primary" disabled>
          Submit
        </Button>
      </Grid>
    </Grid>
  );
};

export default InsuranceForm;
