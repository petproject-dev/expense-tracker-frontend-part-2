import { FC, useCallback, useRef } from 'react';

import { Table, TableBody, TableCell, TableHead, TableRow } from '../Table';
import { EmptyTable } from './EmptyTable';
import { ExpenseTableRow } from './ExpenseTableRow';
import { TableStub } from './TableStub';
import { Expense } from '../../types';
import { Loader } from '../Loader';
import styles from './index.module.css';

interface IProps<T> {
  data: T[];
  isLoading: boolean;
  hasMore: boolean;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onMobileClick: (id: number) => void;
}

export const ExpenseTable: FC<IProps<Expense>> = ({
  data,
  isLoading,
  setPage,
  hasMore,
  onEdit,
  onDelete,
  onMobileClick,
}) => {
  const observer = useRef<IntersectionObserver | null>(null);

  const lastExpenseElementRef = useCallback(
    (node: HTMLTableRowElement | null) => {
      if (isLoading || !hasMore) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore, setPage],
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
          onDelete={onDelete}
          onEdit={onEdit}
          onMobileClick={onMobileClick}
          ref={data.length === index + 1 ? lastExpenseElementRef : null}
        />
      );
    });
  };

  return (
    <Table>
      <TableHead classname={styles.head}>
        <TableRow>
          <TableCell head classname={styles.cell1}>
            Name
          </TableCell>
          <TableCell head classname={styles.cell2}>
            Category
          </TableCell>
          <TableCell head classname={styles.cell3}>
            Date
          </TableCell>
          <TableCell head classname={styles.cell4}>
            Total
          </TableCell>
          <TableCell head classname={styles.cell5} />
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
