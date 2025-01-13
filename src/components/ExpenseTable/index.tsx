import { FC } from 'react';

import styles from './index.module.css';
import { Table, TableBody, TableCell, TableHead, TableRow } from '../Table';
import { EmptyTable } from './EmptyTable';
import { ExpenseTableRow } from './ExpenseTableRow';
import { TableStub } from './TableStub';
import { Loader } from '../Loader';

interface IProps {}

export const ExpenseTable: FC<IProps> = () => {
  const isLoading = false;
  const data = [
    { id: 1, name: 'John Doe', category: 'hobby1', date: '2024-12-31', total: '-7.22$' },
    { id: 2, name: 'John Doe2', category: 'mobile', date: '2024-12-31', total: '+7.22$' },
    { id: 3, name: 'John Doe2', category: 'mobile', date: '2024-12-31', total: '+7.22$' },
    { id: 4, name: 'John Doe2', category: 'mobile', date: '2024-12-31', total: '+7.22$' },
    { id: 5, name: 'John Doe2', category: 'mobile', date: '2024-12-31', total: '+7.22$' },
    { id: 6, name: 'John Doe2', category: 'mobile', date: '2024-12-31', total: '+7.22$' },
    { id: 7, name: 'John Doe2', category: 'mobile', date: '2024-12-31', total: '+7.22$' },
    { id: 8, name: 'John Doe2', category: 'mobile', date: '2024-12-31', total: '+7.22$' },
    { id: 9, name: 'John Doe2', category: 'mobile', date: '2024-12-31', total: '+7.22$' },
    { id: 10, name: 'John Doe2', category: 'mobile', date: '2024-12-31', total: '+7.22$' },
    { id: 11, name: 'John Doe2', category: 'mobile', date: '2024-12-31', total: '+7.22$' },
    { id: 12, name: 'John Doe2', category: 'mobile', date: '2024-12-31', total: '+7.22$' },
    { id: 13, name: 'John Doe2', category: 'mobile', date: '2024-12-31', total: '+7.22$' },
    { id: 14, name: 'John Doe2', category: 'mobile', date: '2024-12-31', total: '+7.22$' },
    { id: 15, name: 'John Doe2', category: 'mobile', date: '2024-12-31', total: '+7.22$' },
    { id: 16, name: 'John Doe2', category: 'mobile', date: '2024-12-31', total: '+7.22$' },
    { id: 17, name: 'John Doe2', category: 'mobile', date: '2024-12-31', total: '+7.22$' },
    { id: 18, name: 'John Doe2', category: 'mobile', date: '2024-12-31', total: '+7.22$' },
    { id: 19, name: 'John Doe2', category: 'mobile', date: '2024-12-31', total: '+7.22$' },
  ];

  const renderBody = () => {
    if (isLoading && data.length === 0) {
      return <TableStub />;
    }

    if (data.length === 0) {
      return <EmptyTable />;
    }

    return data.map((row) => {
      return <ExpenseTableRow key={row.id} data={row} />;
    });
  };

  return (
    <Table>
      <TableHead>
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
