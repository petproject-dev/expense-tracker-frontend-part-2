import { FC } from 'react';

import { IconType } from '../../Icon/index.types';
import { Menu, MenuItem } from '../../Menu';
import { TableCell, TableRow } from '../../Table';
import { IconCategory } from '../IconCategory';
import cellStyles from '../index.module.css';
import { TotalAmount } from '../TotalAmount';
import styles from './index.module.css';

interface IProps {
  data: Record<string, string | number>;
}

export const ExpenseTableRow: FC<IProps> = ({ data }) => {
  const handleEdit = () => {
    console.log('edit');
  };
  const handleDelete = () => {
    console.log('delete');
  };

  return (
    <TableRow>
      <TableCell classname={cellStyles.cell1}>
        <div className={styles['category-icon']}>
          <IconCategory category={data.category as IconType} />
        </div>
        {data.name}
      </TableCell>
      <TableCell classname={cellStyles.cell2}>{data.category}</TableCell>
      <TableCell classname={cellStyles.cell3}>{data.date}</TableCell>
      <TableCell classname={cellStyles.cell4}>
        <TotalAmount amount={data.total as string} />
      </TableCell>
      <TableCell classname={cellStyles.cell5}>
        <Menu>
          {({ onClose }) => (
            <>
              <MenuItem onClose={onClose} onClick={handleEdit}>
                Edit
              </MenuItem>
              <MenuItem onClose={onClose} onClick={handleDelete}>
                Delete
              </MenuItem>
            </>
          )}
        </Menu>
      </TableCell>
    </TableRow>
  );
};
