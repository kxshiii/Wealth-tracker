
import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { useExpenses } from '../hooks/useExpenses';

const COLORS = [
  'hsl(210, 100%, 45%)', // primary blue
  'hsl(25, 45%, 70%)',   // accent brown
  'hsl(30, 25%, 85%)',   // secondary light brown
  'hsl(0, 84%, 60%)',    // destructive red
  'hsl(120, 50%, 50%)',  // green
  'hsl(280, 50%, 60%)',  // purple
  'hsl(45, 100%, 60%)',  // yellow
  'hsl(190, 50%, 60%)',  // cyan
];

const ExpensePieChart: React.FC = () => {
  const { expenses } = useExpenses();

  const chartData = useMemo(() => {
    const categoryTotals = expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(categoryTotals).map(([category, total]) => ({
      name: category,
      value: total,
    }));
  }, [expenses]);

  if (chartData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Expenses by Category</CardTitle>
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
        <CardTitle>Expenses by Category</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `$${Number(value).toFixed(2)}`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpensePieChart;
