
import React, { useState, useMemo } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Button, 
  Stack,
  Card, 
  CardContent,
  AppBar,
  Toolbar,
  IconButton,
  Fab,
  Grid
} from '@mui/material';
import { AccountBalance, TrendingUp, Receipt, ExitToApp, Add } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { useExpenses } from '../hooks/useExpenses';
import AddExpenseForm from '../components/AddExpenseForm';
import ExpensesList from '../components/ExpensesList';
import ExpensePieChart from '../components/ExpensePieChart';
import ExpenseBarChart from '../components/ExpenseBarChart';

const Dashboard: React.FC = () => {
  const { user, signOut } = useAuth();
  const { expenses } = useExpenses();
  const [addExpenseOpen, setAddExpenseOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
  };

  // Calculate totals
  const totals = useMemo(() => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    const monthlyExpenses = expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear;
    });

    const totalExpenses = monthlyExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    
    return {
      totalExpenses,
      expenseCount: expenses.length,
      monthlyExpenses: totalExpenses
    };
  }, [expenses]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <AccountBalance sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Wealth Tracker
          </Typography>
          <Typography variant="body1" sx={{ mr: 2 }}>
            Welcome, {user?.email}!
          </Typography>
          <IconButton color="inherit" onClick={handleLogout}>
            <ExitToApp />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        
        <Stack spacing={3}>
          {/* Summary Cards */}
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
            <Card sx={{ flex: 1 }}>
              <CardContent>
                <Box display="flex" alignItems="center">
                  <Receipt color="primary" sx={{ mr: 2 }} />
                  <Box>
                    <Typography color="textSecondary" gutterBottom>
                      Total Expenses
                    </Typography>
                    <Typography variant="h5">
                      {totals.expenseCount}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>

            <Card sx={{ flex: 1 }}>
              <CardContent>
                <Box display="flex" alignItems="center">
                  <TrendingUp color="error" sx={{ mr: 2 }} />
                  <Box>
                    <Typography color="textSecondary" gutterBottom>
                      This Month's Spending
                    </Typography>
                    <Typography variant="h5">
                      ${totals.monthlyExpenses.toFixed(2)}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>

            <Card sx={{ flex: 1 }}>
              <CardContent>
                <Box display="flex" alignItems="center">
                  <AccountBalance color="success" sx={{ mr: 2 }} />
                  <Box>
                    <Typography color="textSecondary" gutterBottom>
                      Average per Expense
                    </Typography>
                    <Typography variant="h5">
                      ${totals.expenseCount > 0 ? (totals.monthlyExpenses / totals.expenseCount).toFixed(2) : '0.00'}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Stack>

          {/* Charts Section */}
          <Box>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <ExpensePieChart />
              </Grid>
              <Grid item xs={12} md={6}>
                <ExpenseBarChart />
              </Grid>
            </Grid>
          </Box>

          {/* Expenses Section */}
          <Paper sx={{ p: 3 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
              <Typography variant="h6">
                Recent Expenses
              </Typography>
              <Button 
                variant="contained" 
                startIcon={<Add />}
                onClick={() => setAddExpenseOpen(true)}
              >
                Add Expense
              </Button>
            </Box>
            
            <ExpensesList />
          </Paper>
        </Stack>
      </Container>

      {/* Floating Action Button */}
      <Fab
        color="primary"
        aria-label="add expense"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        onClick={() => setAddExpenseOpen(true)}
      >
        <Add />
      </Fab>

      {/* Add Expense Dialog */}
      <AddExpenseForm 
        open={addExpenseOpen}
        onClose={() => setAddExpenseOpen(false)}
      />
    </Box>
  );
};

export default Dashboard;