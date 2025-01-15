import { useCallback, useRef } from 'react';

import styles from './index.module.css';
import { Table, TableBody, TableCell, TableHead, TableRow } from '../Table';
import { EmptyTable } from './EmptyTable';
import { ExpenseTableRow } from './ExpenseTableRow';
import { TableStub } from './TableStub';
import { useStore } from '../../store/storeContext';
import { Loader } from '../Loader';

export const ExpenseTable = () => {
  const { expenses: data, isLoading, setPage, hasMoreExpenses } = useStore();
  const observer = useRef<IntersectionObserver | null>(null);

  const lastExpenseElementRef = useCallback(
    (node: HTMLTableRowElement | null) => {
      if (isLoading || !hasMoreExpenses) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMoreExpenses) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMoreExpenses, setPage],
  );

  const renderBody = () => {
    if (isLoading && data.length === 0) {
      return <TableStub />;
    }

    if (data.length === 0) {
      return <EmptyTable />;
    }

    return data.map((row, index) => {
      return (
        <ExpenseTableRow
          key={row.id}
          data={row}
          ref={data.length === index + 1 ? lastExpenseElementRef : null}
        />
      );
    });
  };

  return (
    <Table>
      <TableHead classname={styles.head}>
        <TableRow>
          <TableCell classname={styles.cell1}>Name</TableCell>
          <TableCell classname={styles.cell2}>Category</TableCell>
          <TableCell classname={styles.cell3}>Date</TableCell>
          <TableCell classname={styles.cell4}>Total</TableCell>
          <TableCell classname={styles.cell5} />
        </TableRow>
      </TableHead>
      <TableBody classname={styles.body}>
        {renderBody()}
        {isLoading && data.length !== 0 && (
          <TableRow>
            <TableCell align="center" colSpan={5} valign="middle">
              <Loader />
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
