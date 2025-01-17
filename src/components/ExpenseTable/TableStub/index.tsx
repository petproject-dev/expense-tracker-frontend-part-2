import cn from 'classnames';

import { Icon } from '../../Icon';
import { TableCell, TableRow } from '../../Table';
import cellStyles from '../index.module.css';
import styles from './index.module.css';

export const TableStub = () => {
  const stubs = Array(10).fill(0);
  return (
    <>
      {stubs.map((_, idx) => (
        <TableRow key={idx} classname={styles.row}>
          <TableCell
            valign="middle"
            classname={cn(cellStyles.cell1, styles.cell1)}
          >
            <div className={styles['stub-head-container']}>
              <div className={styles['stub-square']} />
              <div className={styles['stub-line']} />
            </div>
          </TableCell>
          <TableCell classname={cn(cellStyles.cell2, styles.cell2)}>
            <div className={styles['stub-line']} />
          </TableCell>
          <TableCell classname={cn(cellStyles.cell3, styles.cell3)}>
            <div className={styles['stub-line']} />
          </TableCell>
          <TableCell classname={cn(cellStyles.cell4, styles.cell4)}>
            <div className={styles['stub-line']} />
          </TableCell>
          <TableCell classname={cn(cellStyles.cell5, styles.cell5)}>
            <Icon icon="menu" />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};
