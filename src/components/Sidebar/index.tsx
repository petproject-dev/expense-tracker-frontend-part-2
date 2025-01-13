import { FC } from 'react';

import styles from './index.module.css';

interface IProps {
  children: React.ReactNode;
}

export const Sidebar: FC<IProps> = ({ children }) => {
  return <aside className={styles.sidebar}>{children}</aside>;
};
