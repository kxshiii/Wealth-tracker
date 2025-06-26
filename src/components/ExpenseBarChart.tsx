
import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { useExpenses } from '../hooks/useExpenses';

const ExpenseBarChart: React.FC = () => {
  const { expenses } = useExpenses();

  const chartData = useMemo(() => {
    const monthlyData = expenses.reduce((acc, expense) => {
      const date = new Date(expense.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      const monthName = date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
      
      if (!acc[monthKey]) {
        acc[monthKey] = {
          month: monthName,
          total: 0,
          count: 0,
        };
      }
      
      acc[monthKey].total += expense.amount;
      acc[monthKey].count += 1;
      
      return acc;
    }, {} as Record<string, { month: string; total: number; count: number }>);

    return Object.entries(monthlyData)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([, data]) => ({
        month: data.month,
        amount: data.total,
        count: data.count,
      }))
      .slice(-6); // Show last 6 months
  }, [expenses]);

  if (chartData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Monthly Expense Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64 text-muted-foreground">
            No expense data available
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Expense Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => {
                  if (name === 'amount') return [`$${Number(value).toFixed(2)}`, 'Total Amount'];
                  return [value, 'Number of Expenses'];
                }}
              />
              <Legend />
              <Bar dataKey="amount" fill="hsl(210, 100%, 45%)" name="Total Amount" />
              <Bar dataKey="count" fill="hsl(25, 45%, 70%)" name="Number of Expenses" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpenseBarChart;
