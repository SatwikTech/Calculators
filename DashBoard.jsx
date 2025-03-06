// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Paper,
  Tabs,
  Tab,
  CircularProgress,
} from '@mui/material';
import LeftNavigationPanel from '../components/LeftNavigationPanel';
import QnaView from '../components/QnaView';
import AnalyticsView from '../components/AnalyticsView';
import ChatbotView from '../components/ChatbotView';
// import insuranceData  from '../data/InsuranceData';

const DashboardPage = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [selectedCompanies, setSelectedCompanies] = useState({});
  const [selectedProducts, setSelectedProducts] = useState({});
  const [expandedCompanies, setExpandedCompanies] = useState({});
  const [companiesData, setCompaniesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCompaniesData();
  }, []);

  const fetchCompaniesData = async () => {
    try {
      setLoading(true);
      const result = await fetch('/src/data/insuranceData1.json')
      const data = await result.json();
      console.log(data, "repeated");
      setCompaniesData(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch data');
      setLoading(false);
      console.error('Error fetching data:', err);
    }
    finally {
      setLoading(false)
    }
    console.log(companiesData)
    console.log(loading, "check if finally is working or not ")
  };

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleCompanyToggle = (companyId) => {
    setExpandedCompanies(prev => ({
      ...prev,
      [companyId]: !prev[companyId]
    }));
  };

  const handleCompanySelect = (companyId) => {
    setSelectedCompanies(prev => ({
      ...prev,
      [companyId]: !prev[companyId]
    }));
  };

  const handleProductSelect = (productId) => {
    setSelectedProducts(prev => ({
      ...prev,
      [productId]: !prev[productId]
    }));
  };

  if (loading) {
    return (
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        color: 'error.main'
      }}>
        {error}
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Grid container spacing={2} sx={{ p: 2 }}>
        <Grid item xs={12} md={3}>
          <Paper elevation={3} sx={{ height: 'calc(100vh - 32px)', overflow: 'auto' }}>
            <LeftNavigationPanel
              companies={companiesData}
              selectedCompanies={selectedCompanies}
              selectedProducts={selectedProducts}
              expandedCompanies={expandedCompanies}
              onCompanyToggle={handleCompanyToggle}
              onCompanySelect={handleCompanySelect}
              onProductSelect={handleProductSelect}
            />
          </Paper>
        </Grid>

        <Grid item xs={12} md={9}>
          <Paper elevation={3} sx={{ height: 'calc(100vh - 32px)', overflow: 'auto' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={currentTab} onChange={handleTabChange}>
                <Tab label="Q&A" />
                <Tab label="Analytics" />
                <Tab label="Chatbot" />
              </Tabs>
            </Box>
            <Box sx={{ p: 3 }}>
              {currentTab === 0 && (
                <QnaView
                  companiesData={companiesData}
                  selectedProducts={selectedProducts}
                />
              )}
              {currentTab === 1 && (
                <AnalyticsView
                  companiesData={companiesData}
                  selectedCompanies={selectedCompanies}
                  selectedProducts={selectedProducts}
                />
              )}
              {currentTab === 2 && (
                <ChatbotView
                  companiesData={companiesData}
                  selectedCompanies={selectedCompanies}
                  selectedProducts={selectedProducts}
                />
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;
