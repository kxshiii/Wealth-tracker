
import React from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Typography,
  Chip,
  Box,
  CircularProgress
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { useExpenses, Expense } from '../hooks/useExpenses';

const ExpensesList: React.FC = () => {
  const { expenses, loading, deleteExpense } = useExpenses();

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      await deleteExpense(id);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info'> = {
      'Food & Dining': 'warning',
      'Transportation': 'info',
      'Shopping': 'secondary',
      'Entertainment': 'primary',
      'Bills & Utilities': 'error',
      'Healthcare': 'success',
      'Travel': 'info',
      'Education': 'primary',
      'Other': 'default' as any
    };
    return colors[category] || 'default' as any;
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={3}>
        <CircularProgress />
      </Box>
    );
  }

  if (expenses.length === 0) {
    return (
      <Paper sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary">
          No expenses yet
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Add your first expense to get started tracking your spending.
        </Typography>
      </Paper>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {expenses.map((expense: Expense) => (
            <TableRow key={expense.id}>
              <TableCell>
                <Typography variant="body2" fontWeight="medium">
                  {expense.title}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" fontWeight="bold">
                  {formatAmount(expense.amount)}
                </Typography>
              </TableCell>
              <TableCell>
                <Chip 
                  label={expense.category} 
                  size="small" 
                  color={getCategoryColor(expense.category)}
                />
              </TableCell>
              <TableCell>
                {formatDate(expense.date)}
              </TableCell>
              <TableCell>
                <Typography variant="body2" color="text.secondary">
                  {expense.description || '-'}
                </Typography>
              </TableCell>
              <TableCell>
                <IconButton 
                  onClick={() => handleDelete(expense.id)}
                  color="error"
                  size="small"
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ExpensesList;
