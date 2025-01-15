import { startOfDay, subDays, format } from 'date-fns';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { createExpense, deleteExpense, fetchExpenses, updateExpense } from '../api/expenses';
import { Expense, IQueryExpenses } from '../types';

interface ProviderProps {
  expenses: Expense[];
  fromDate: string;
  toDate: string;
  isLoading: boolean;
  currentExpense?: Expense;
  hasMoreExpenses: boolean;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setCurrentExpense: (data?: Expense) => void;
  createExpense: (data: Omit<Expense, 'id'>) => void;
  fetchExpenses: (queryParams: {
    fromDate: IQueryExpenses['fromDate'];
    toDate: IQueryExpenses['toDate'];
  }) => void;
  updateExpense: (id: number, data: Partial<Expense>) => void;
  deleteExpense: (id: number) => void;
  setFromDate: (date: string) => void;
  setToDate: (date: string) => void;
}

const StoreContext = createContext<ProviderProps>({
  expenses: [],
  fromDate: '',
  toDate: '',
  isLoading: false,
  currentExpense: undefined,
  hasMoreExpenses: false,
  setPage: () => {},
  setCurrentExpense: () => {},
  createExpense: () => {},
  fetchExpenses: () => {},
  updateExpense: () => {},
  deleteExpense: () => {},
  setFromDate: () => {},
  setToDate: () => {},
});

const filterUniqueById = <T extends { id: number }>(list: T[]): T[] => {
  const result = list.reduce((acc, item) => {
    if (item.id in acc) {
      return acc;
    }

    return { ...acc, [item.id]: item };
  }, {});

  return Object.values(result);
};

const LIMIT_EXPENSES = 2;

const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [hasMoreExpenses, setHasMoreExpenses] = useState(true);
  const [page, setPage] = useState(0);
  const [fromDate, setFromDate] = useState(() =>
    format(startOfDay(subDays(new Date(), 10)), 'yyyy-MM-dd'),
  );
  const [toDate, setToDate] = useState(() => format(new Date(), 'yyyy-MM-dd'));
  const [currentExpense, setCurrentExpense] = useState<Expense | undefined>();

  const handleFetchExpenses = useCallback(
    async (queryParams: {
      fromDate: IQueryExpenses['fromDate'];
      toDate: IQueryExpenses['toDate'];
    }) => {
      setIsLoading(true);
      const newExpenses = await fetchExpenses({
        ...queryParams,
        offset: page * LIMIT_EXPENSES,
        limit: LIMIT_EXPENSES,
      });

      if (newExpenses.length === 0) {
        setHasMoreExpenses(false);
      } else {
        setExpenses((prev) => filterUniqueById([...prev, ...newExpenses]));
      }

      setIsLoading(false);
    },
    [page],
  );

  useEffect(() => {
    if (!expenses.length) {
      handleFetchExpenses({ fromDate, toDate });
    }
  }, [handleFetchExpenses, fromDate, toDate, expenses.length]);

  useEffect(() => {
    if (hasMoreExpenses) {
      handleFetchExpenses({ fromDate, toDate });
    }
  }, [handleFetchExpenses, hasMoreExpenses, fromDate, toDate]);

  const handleSetCurrentExpense = useCallback((data?: Expense) => {
    if (!data) {
      return setCurrentExpense(undefined);
    }
    setCurrentExpense({ ...data, date: format(new Date(data?.date), 'yyyy-MM-dd') });
  }, []);

  const handleCreateExpense = useCallback(async (data: Omit<Expense, 'id'>) => {
    const newExpenseRecordId = await createExpense(data);
    setExpenses((prev) => filterUniqueById([...prev, { id: newExpenseRecordId, ...data }]));
  }, []);

  const handleUpdateExpense = useCallback(async (id: number, data: Partial<Expense>) => {
    await updateExpense(id, data);
    setExpenses((prev) => prev.map((x) => (x.id === id ? { ...x, ...data } : x)));
  }, []);

  const handleDeleteExpense = useCallback(async (id: number) => {
    await deleteExpense(id);
    setExpenses((prev) => prev.filter((x) => x.id !== id));
  }, []);

  const handleSetFromDate = useCallback(
    (date: string) => {
      setFromDate(date);
      setExpenses([]);
      handleFetchExpenses({ fromDate: date, toDate });
    },
    [handleFetchExpenses, toDate],
  );

  const handleSetToDate = useCallback(
    (date: string) => {
      setToDate(date);
      setExpenses([]);
      handleFetchExpenses({ fromDate, toDate: date });
    },
    [handleFetchExpenses, fromDate],
  );

  const store = useMemo(() => {
    return {
      expenses,
      isLoading,
      currentExpense,
      hasMoreExpenses,
      setPage,
      setCurrentExpense: handleSetCurrentExpense,
      createExpense: handleCreateExpense,
      fetchExpenses: handleFetchExpenses,
      updateExpense: handleUpdateExpense,
      deleteExpense: handleDeleteExpense,
      fromDate,
      toDate,
      setFromDate: handleSetFromDate,
      setToDate: handleSetToDate,
    };
  }, [
    expenses,
    isLoading,
    currentExpense,
    hasMoreExpenses,
    setPage,
    handleSetCurrentExpense,
    handleCreateExpense,
    handleFetchExpenses,
    handleUpdateExpense,
    handleDeleteExpense,
    fromDate,
    toDate,
    handleSetFromDate,
    handleSetToDate,
  ]);
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};

export default StoreProvider;

export const useStore = () => {
  return useContext(StoreContext);
};
