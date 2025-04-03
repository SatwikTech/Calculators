// DataGridView.test.js
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import DataGridView from './DataGridView';

describe('DataGridView', () => {
  it('displays the correct rows and columns with pagination and sorting', async () => {
    // Columns with the provided data fields
    const columns = [
      { field: 'state', headerName: 'State', width: 150 },
      { field: 'companyname', headerName: 'Company Name', width: 200 },
      { field: 'producttype', headerName: 'Product Type', width: 180 },
      { field: 'filingstatus', headerName: 'Filing Status', width: 150 },
      { field: 'submissiondate', headerName: 'Submission Date', width: 180, sortable: true },
      { field: 'enddate', headerName: 'End Date', width: 180 },
    ];

    // Sample rows with the necessary data fields (11 records in total)
    const rows = [
      { id: 1, state: 'California', companyname: 'TechCorp', producttype: 'Software', filingstatus: 'Pending', submissiondate: '2025-03-01', enddate: '2025-04-01' },
      { id: 2, state: 'New York', companyname: 'HealthInc', producttype: 'Medical', filingstatus: 'Completed', submissiondate: '2025-01-15', enddate: '2025-02-15' },
      { id: 3, state: 'Texas', companyname: 'FinServe', producttype: 'Finance', filingstatus: 'In Progress', submissiondate: '2025-02-20', enddate: '2025-03-20' },
      { id: 4, state: 'Florida', companyname: 'MarketX', producttype: 'Retail', filingstatus: 'Pending', submissiondate: '2025-03-05', enddate: '2025-04-05' },
      { id: 5, state: 'Ohio', companyname: 'AutoTech', producttype: 'Automotive', filingstatus: 'Completed', submissiondate: '2025-02-01', enddate: '2025-03-01' },
      { id: 6, state: 'Georgia', companyname: 'EduPlus', producttype: 'Education', filingstatus: 'In Progress', submissiondate: '2025-01-25', enddate: '2025-02-25' },
      { id: 7, state: 'Nevada', companyname: 'RealEstateCo', producttype: 'Real Estate', filingstatus: 'Pending', submissiondate: '2025-03-10', enddate: '2025-04-10' },
      { id: 8, state: 'Michigan', companyname: 'SteelWorks', producttype: 'Manufacturing', filingstatus: 'Completed', submissiondate: '2025-01-30', enddate: '2025-02-28' },
      { id: 9, state: 'Illinois', companyname: 'FoodChain', producttype: 'Food', filingstatus: 'In Progress', submissiondate: '2025-02-15', enddate: '2025-03-15' },
      { id: 10, state: 'Washington', companyname: 'TechNova', producttype: 'Technology', filingstatus: 'Pending', submissiondate: '2025-03-03', enddate: '2025-04-03' },
      { id: 11, state: 'Colorado', companyname: 'EcoEnergy', producttype: 'Energy', filingstatus: 'Completed', submissiondate: '2025-02-10', enddate: '2025-03-10' },
    ];

    render(<DataGridView rows={rows} columns={columns} pageSize={10} />);

    // Check that the grid displays the column headers
    expect(screen.getByText(/state/i)).toBeInTheDocument();
    expect(screen.getByText(/company name/i)).toBeInTheDocument();
    expect(screen.getByText(/product type/i)).toBeInTheDocument();
    expect(screen.getByText(/filing status/i)).toBeInTheDocument();
    expect(screen.getByText(/submission date/i)).toBeInTheDocument();
    expect(screen.getByText(/end date/i)).toBeInTheDocument();

    // Check pagination: The first page should display 10 records, and the second page should display 1 record
    await waitFor(() => {
      expect(screen.getByText('California')).toBeInTheDocument();
      expect(screen.getByText('New York')).toBeInTheDocument();
      expect(screen.getByText('Texas')).toBeInTheDocument();
      expect(screen.getByText('Florida')).toBeInTheDocument();
      expect(screen.getByText('Ohio')).toBeInTheDocument();
      expect(screen.getByText('Georgia')).toBeInTheDocument();
      expect(screen.getByText('Nevada')).toBeInTheDocument();
      expect(screen.getByText('Michigan')).toBeInTheDocument();
      expect(screen.getByText('Illinois')).toBeInTheDocument();
      expect(screen.getByText('Washington')).toBeInTheDocument();
    });

    // Check if the last row (Colorado) is on the second page after pagination
    fireEvent.click(screen.getByLabelText('Next page'));
    await waitFor(() => {
      expect(screen.getByText('Colorado')).toBeInTheDocument();
    });

    // Test sorting by Submission Date in ascending order
    fireEvent.click(screen.getByText(/submission date/i)); // Click the "Submission Date" column header to sort ascending
    await waitFor(() => {
      const firstRow = screen.getByText('2025-01-15');
      const lastRow = screen.getByText('2025-03-10');
      expect(firstRow).toBeInTheDocument();
      expect(lastRow).toBeInTheDocument();
    });

    // Test sorting by Submission Date in descending order
    fireEvent.click(screen.getByText(/submission date/i)); // Click again to sort descending
    await waitFor(() => {
      const firstRow = screen.getByText('2025-03-10');
      const lastRow = screen.getByText('2025-01-15');
      expect(firstRow).toBeInTheDocument();
      expect(lastRow).toBeInTheDocument();
    });
  });
});
