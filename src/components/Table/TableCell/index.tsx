import cn from 'classnames';
import { FC, TdHTMLAttributes } from 'react';

import styles from './index.module.css';

interface IProps extends TdHTMLAttributes<HTMLTableCellElement> {
  children?: React.ReactNode;
  classname?: string;
}

export const TableCell: FC<IProps> = ({ children, classname, ...props }) => {
  return (
    <td className={cn('cell', styles.cell, classname)} {...props}>
      {children}
    </td>
  );
};
