import { FC, useState } from 'react';

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

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Header />
      </div>
      <main className={styles.content}>{children}</main>
      {openSidebar && (
        <div onClick={() => setOpenSidebar(false)} className={styles['layout-background']} />
      )}
      <IconButton size="md" className={styles.button} onClick={() => setOpenSidebar(true)}>
        <Icon icon="plus" size={30} color="white" />
      </IconButton>
      {openSidebar && (
        <Sidebar>
          <ExpenseForm onClose={() => setOpenSidebar(false)} />
        </Sidebar>
      )}
    </div>
  );
};
