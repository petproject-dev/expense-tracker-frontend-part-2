import cn from 'classnames';
import { format } from 'date-fns';
import { FC, ForwardedRef, forwardRef } from 'react';

import { useStore } from '../../../store/storeContext';
import { Menu, MenuItem } from '../../Menu';
import { TableCell, TableRow } from '../../Table';
import { IconCategory } from '../IconCategory';
import cellStyles from '../index.module.css';
import { TotalAmount } from '../TotalAmount';
import styles from './index.module.css';
import { Expense } from '../../../types';

interface IProps {
  data: Expense;
  ref: ForwardedRef<HTMLTableRowElement>;
}

export const ExpenseTableRow: FC<IProps> = forwardRef(({ data }, ref) => {
  const { deleteExpense, setCurrentExpense } = useStore();

  const handleEdit = (expenseDate: Expense) => {
    setCurrentExpense(expenseDate);
  };
  const handleDelete = (id: number) => {
    deleteExpense(id);
  };

  return (
    <TableRow classname={styles.row} ref={ref}>
      <TableCell classname={cn(cellStyles.cell1, styles.cell1)}>
        <div className={styles['mobile-cell1-container']}>
          <div className={styles['category-icon']}>
            <IconCategory category={data.category} />
          </div>
          <div className={styles['mobile-name-container']}>
            {data.name}
            <div className={styles['mobile-category']}>{data.category}</div>
          </div>
        </div>
      </TableCell>
      <TableCell classname={cn(cellStyles.cell2, styles.cell2)}>{data.category}</TableCell>
      <TableCell classname={cn(cellStyles.cell3, styles.cell3)}>
        {format(data.date, 'yyyy-MM-dd')}
      </TableCell>
      <TableCell classname={cn(cellStyles.cell4, styles.cell4)}>
        <TotalAmount amount={data.amount} currency={data.currency} />
        <div className={styles['mobile-date']}>{format(data.date, 'yyyy-MM-dd')}</div>
      </TableCell>
      <TableCell classname={cn(cellStyles.cell5, styles.cell5)}>
        <Menu>
          {({ onClose }) => (
            <>
              <MenuItem onClose={onClose} onClick={() => handleEdit(data)}>
                Edit
              </MenuItem>
              <MenuItem onClose={onClose} onClick={() => handleDelete(data.id)}>
                Delete
              </MenuItem>
            </>
          )}
        </Menu>
      </TableCell>
    </TableRow>
  );
});
