import { FC, useEffect, useState } from 'react';

import { useStore } from '../../store/storeContext';
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
  const { currentExpense, setCurrentExpense } = useStore();

  useEffect(() => {
    if (currentExpense) {
      setOpenSidebar(true);
    }
  }, [currentExpense, setOpenSidebar]);

  useEffect(() => {
    if (!openSidebar) {
      setCurrentExpense();
    }
  }, [openSidebar, setCurrentExpense]);

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
      {openSidebar && (
        <div onClick={() => setOpenSidebar(false)} className={styles['layout-background']} />
      )}
      <main className={styles.content}>
        {children}

        {openSidebar && (
          <Sidebar classname={styles['sidebar-container']}>
            <ExpenseForm defaultValues={currentExpense} onClose={() => setOpenSidebar(false)} />
          </Sidebar>
        )}
      </main>

      <IconButton size="md" className={styles.button} onClick={() => setOpenSidebar(true)}>
        <Icon icon="plus" size={30} color="white" />
      </IconButton>
    </div>
  );
};
