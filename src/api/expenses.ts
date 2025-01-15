import axios from 'axios';

import { Expense, IQueryExpenses } from '../types';

const request = axios.create({
  baseURL: 'http://localhost:8080/api',
});

export const createExpense = async (data: Omit<Expense, 'id'>) => {
  const res = await request.post<number>(`/expenses`, data);
  return res.data;
};

export const fetchExpenses = async ({ fromDate, toDate, limit, offset }: IQueryExpenses) => {
  const res = await request.get<Expense[]>(`/expenses`, {
    params: {
      fromDate,
      toDate,
      limit,
      offset,
    },
  });
  return res.data;
};

export const fetchExpense = async (id: number) => {
  const res = await request.get<Expense>(`/expenses/${id}`);
  return res.data;
};

export const updateExpense = async (id: number, data: Partial<Expense>) => {
  const res = await request.patch(`/expenses/${id}`, data);
  return res.data;
};

export const deleteExpense = async (id: number) => {
  const res = await request.delete(`/expenses/${id}`);
  return res.data;
};
