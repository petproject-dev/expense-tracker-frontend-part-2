import cn from 'classnames';
import { FC } from 'react';

import styles from './index.module.css';

interface IProps {
  children: React.ReactNode;
  classname?: string;
}

export const Sidebar: FC<IProps> = ({ children, classname = '' }) => {
  return <aside className={cn(styles.sidebar, classname)}>{children}</aside>;
};
