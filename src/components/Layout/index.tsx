import { FC, useEffect, useState } from 'react';

import { useStore } from '../../store/storeContext';
import { Expense } from '../../types';
import { Header } from '../Header';
import { Icon } from '../Icon';
import { IconButton } from '../IconButton';
import { Sidebar } from '../Sidebar';
import styles from './index.module.css';
import { ExpenseForm } from '../ExpenseForm';

interface IProps {
  children: React.ReactNode;
}

export const Layout: FC<IProps> = ({ children }) => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const { currentExpense, editExpense, updateExpense, createExpense } =
    useStore();

  useEffect(() => {
    if (currentExpense) {
      setOpenSidebar(true);
    }
  }, [currentExpense, setOpenSidebar]);

  useEffect(() => {
    if (!openSidebar) {
      editExpense();
    }
  }, [openSidebar, editExpense]);

  const onSubmit = currentExpense
    ? (data: Omit<Expense, 'id'>) => updateExpense(currentExpense.id, data)
    : createExpense;

  let headerMobileMessage = 'Last payments';

  if (openSidebar) {
    if (currentExpense) {
      headerMobileMessage = 'Update payment';
    } else {
      headerMobileMessage = 'Add payment';
    }
  }

  return (
    <div className={styles.container}>
      <Header classname={styles.header}>{headerMobileMessage}</Header>

      <div className={styles.content}>
        <main>{children}</main>
        {openSidebar && (
          <Sidebar classname={styles['sidebar-container']}>
            <ExpenseForm
              defaultValues={currentExpense}
              onClose={() => setOpenSidebar(false)}
              onSubmit={onSubmit}
            />
          </Sidebar>
        )}
      </div>

      {openSidebar && (
        <div
          onClick={() => setOpenSidebar(false)}
          className={styles['layout-background']}
        />
      )}

      <IconButton
        size="md"
        className={styles.button}
        onClick={() => setOpenSidebar(true)}
      >
        <Icon icon="plus" size={30} color="white" />
      </IconButton>
    </div>
  );
};
