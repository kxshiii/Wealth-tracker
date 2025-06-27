
import { useState, useEffect } from 'react';
import { supabase } from '../intergrations/client';
import { useAuth } from '../contexts/AuthContext';

export interface Expense {
  id: string;
  user_id: string;
  title: string;
  amount: number;
  category: string;
  description?: string;
  date: string;
  created_at: string;
  updated_at: string;
}

export const useExpenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchExpenses = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('expenses')
        .select('*')
        .order('date', { ascending: false });

      if (error) throw error;
      setExpenses(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addExpense = async (expense: Omit<Expense, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    if (!user) return { error: 'User not authenticated' };

    try {
      const { data, error } = await supabase
        .from('expenses')
        .insert([{ ...expense, user_id: user.id }])
        .select()
        .single();

      if (error) throw error;
      
      setExpenses(prev => [data, ...prev]);
      return { data, error: null };
    } catch (err: any) {
      return { data: null, error: err.message };
    }
  };

  const deleteExpense = async (id: string) => {
    try {
      const { error } = await supabase
        .from('expenses')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setExpenses(prev => prev.filter(expense => expense.id !== id));
      return { error: null };
    } catch (err: any) {
      return { error: err.message };
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, [user]);

  return {
    expenses,
    loading,
    error,
    addExpense,
    deleteExpense,
    refetch: fetchExpenses
  };
};