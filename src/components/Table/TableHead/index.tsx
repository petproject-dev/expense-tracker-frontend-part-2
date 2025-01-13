import cn from 'classnames';
import { FC, TableHTMLAttributes } from 'react';

import styles from './index.module.css';

interface IProps extends TableHTMLAttributes<HTMLTableSectionElement> {
  children?: React.ReactNode;
  classname?: string;
}

export const TableHead: FC<IProps> = ({ children, classname, ...props }) => {
  return (
    <thead className={cn(styles.head, classname)} {...props}>
      {children}
    </thead>
  );
};
