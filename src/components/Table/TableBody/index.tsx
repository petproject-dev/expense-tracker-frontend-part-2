import cn from 'classnames';
import { FC, TableHTMLAttributes } from 'react';

import styles from './index.module.css';

interface IProps extends TableHTMLAttributes<HTMLTableSectionElement> {
  children?: React.ReactNode;
  classname?: string;
}

export const TableBody: FC<IProps> = ({ children, classname, ...props }) => {
  return (
    <tbody className={cn(styles.body, classname)} {...props}>
      {children}
    </tbody>
  );
};
