import { useCallback, useState } from 'react';

import { useStore } from '../../store/storeContext';
import { DatePickerRange } from '../DatePickerRange';
import { ExpenseTable } from '../ExpenseTable';
import { Layout } from '../Layout';
import { ConfirmModal } from '../modals/ConfirmModal';
import { MobileMenuModal } from '../modals/MobileMenuModal';

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
  const [mobileExpenseId, setMobileExpenseId] = useState<number | null>(null);

  const closeModal = () => setDeleteExpenseId(null);

  const confirmDelete = () => {
    deleteExpense(deleteExpenseId as number);
    closeModal();
  };

  const onMobileClick = (id: number) => {
    const MOBILE_WIDTH = 768;

    if (window.outerWidth <= MOBILE_WIDTH) {
      setMobileExpenseId(id);
    }
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
        onMobileClick={onMobileClick}
      />

      <ConfirmModal
        onClose={closeModal}
        onConfirm={confirmDelete}
        open={deleteExpenseId !== null}
      >
        Are you sure you want to delete this expense?
      </ConfirmModal>

      <MobileMenuModal
        onEdit={() => editExpense(mobileExpenseId as number)}
        onDelete={() => setDeleteExpenseId(mobileExpenseId)}
        onClose={() => setMobileExpenseId(null)}
        open={mobileExpenseId !== null}
      />
    </Layout>
  );
}

export default App;
