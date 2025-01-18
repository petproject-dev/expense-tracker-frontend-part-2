import { FC, useCallback, useEffect, useState } from 'react';

import { useStore } from '../../store/storeContext';
import { Expense } from '../../types';
import { ExpenseForm } from '../ExpenseForm';
import { Header } from '../Header';
import { Icon } from '../Icon';
import { IconButton } from '../IconButton';
import { LayoutBackground } from '../LayoutBackground';
import { Sidebar } from '../Sidebar';
import styles from './index.module.css';

interface IProps {
  children: React.ReactNode;
}

export const Layout: FC<IProps> = ({ children }) => {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const { currentExpense, editExpense, updateExpense, createExpense } =
    useStore();

  const openSidebar = useCallback(() => {
    setIsOpenSidebar(true);
  }, []);

  const closeSidebar = useCallback(() => {
    setIsOpenSidebar(false);
  }, []);

  useEffect(() => {
    if (currentExpense) openSidebar();
  }, [currentExpense, openSidebar]);

  useEffect(() => {
    if (!isOpenSidebar) {
      editExpense();
    }
  }, [isOpenSidebar, editExpense]);

  const onSubmit = currentExpense
    ? (data: Omit<Expense, 'id'>) => updateExpense(currentExpense.id, data)
    : createExpense;

  let headerMobileMessage = 'Last payments';

  if (isOpenSidebar) {
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
        <Sidebar open={isOpenSidebar} classname={styles['sidebar-container']}>
          <ExpenseForm
            defaultValues={currentExpense}
            onClose={closeSidebar}
            onSubmit={onSubmit}
          />
        </Sidebar>
      </div>

      <LayoutBackground open={isOpenSidebar} onClose={closeSidebar} />

      <IconButton size="md" className={styles.button} onClick={openSidebar}>
        <Icon icon="plus" size={30} color="white" />
      </IconButton>
    </div>
  );
};
