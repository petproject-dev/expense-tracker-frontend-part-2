import { useCallback, useState } from 'react';

import { useStore } from '../../store/storeContext';
import { DatePickerRange } from '../DatePickerRange';
import { ExpenseTable } from '../ExpenseTable';
import { Layout } from '../Layout';
import { DeleteExpenseModal } from '../modals/DeleteExpenseModal';

function App() {
  const {
    fromDate,
    toDate,
    setFromDate,
    setToDate,
    expenses,
    isLoading,
    setPage,
    hasMoreExpenses,
    editExpense,
    deleteExpense,
  } = useStore();

  const handlePickerChange = useCallback(
    (from: string, to: string) => {
      setFromDate(from);
      setToDate(to);
    },
    [setFromDate, setToDate],
  );

  const [deleteExpenseId, setDeleteExpenseId] = useState<number | null>(null);

  const closeModal = () => setDeleteExpenseId(null);
  const confirmDelete = () => {
    deleteExpense(deleteExpenseId as number);
    closeModal();
  };

  return (
    <Layout>
      <DatePickerRange
        from={fromDate}
        to={toDate}
        onChange={handlePickerChange}
      />

      <ExpenseTable
        data={expenses}
        isLoading={isLoading}
        setPage={setPage}
        hasMore={hasMoreExpenses}
        onEdit={editExpense}
        onDelete={setDeleteExpenseId}
      />

      <DeleteExpenseModal
        onClose={closeModal}
        onConfirm={confirmDelete}
        open={deleteExpenseId !== null}
      />
    </Layout>
  );
}

export default App;
