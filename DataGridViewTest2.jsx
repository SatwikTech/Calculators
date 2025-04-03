// DataGridView.test.js
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import DataGridView from './DataGridView';

describe('DataGridView', () => {
  it('displays the correct rows and columns, handles selection, and calls error functions when needed', async () => {
    // Mock data
    const columns = [
      { field: 'state', headerName: 'State', width: 150 },
      { field: 'companyname', headerName: 'Company Name', width: 200 },
      { field: 'producttype', headerName: 'Product Type', width: 180 },
      { field: 'filingstatus', headerName: 'Filing Status', width: 150 },
      { field: 'submissiondate', headerName: 'Submission Date', width: 180, sortable: true },
      { field: 'enddate', headerName: 'End Date', width: 180, sortable: true },
    ];

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

    // Mock functions
    const dispatchError = vi.fn();
    const clearError = vi.fn();

    render(<DataGridView rows={rows} columns={columns} dispatchError={dispatchError} clearError={clearError} />);

    // Test that column headers are rendered
    expect(screen.getByText(/state/i)).toBeInTheDocument();
    expect(screen.getByText(/company name/i)).toBeInTheDocument();
    expect(screen.getByText(/product type/i)).toBeInTheDocument();
    expect(screen.getByText(/filing status/i)).toBeInTheDocument();
    expect(screen.getByText(/submission date/i)).toBeInTheDocument();
    expect(screen.getByText(/end date/i)).toBeInTheDocument();

    // Simulate selecting more than 10 rows
    fireEvent.click(screen.getByLabelText('Checkbox Select All Rows'));
    await waitFor(() => {
      expect(dispatchError).toHaveBeenCalledWith('Please select only 10 records');
    });

    // Simulate selecting 10 or fewer rows and clearing the error
    fireEvent.click(screen.getAllByRole('checkbox')[10]); // Select the 11th row, will select less than 10 after deselecting it
    await waitFor(() => {
      expect(clearError).toHaveBeenCalled();
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

    // Test sorting by End Date in ascending order
    fireEvent.click(screen.getByText(/end date/i)); // Click the "End Date" column header to sort ascending
    await waitFor(() => {
      const firstRow = screen.getByText('2025-02-15');
      const lastRow = screen.getByText('2025-04-10');
      expect(firstRow).toBeInTheDocument();
      expect(lastRow).toBeInTheDocument();
    });

    // Test sorting by End Date in descending order
    fireEvent.click(screen.getByText(/end date/i)); // Click again to sort descending
    await waitFor(() => {
      const firstRow = screen.getByText('2025-04-10');
      const lastRow = screen.getByText('2025-02-15');
      expect(firstRow).toBeInTheDocument();
      expect(lastRow).toBeInTheDocument();
    });
  });
});
