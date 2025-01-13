import { FC } from 'react';

import styles from './index.module.css';

interface IProps {
  amount: string;
}

export const TotalAmount: FC<IProps> = ({ amount }) => {
  return <div className={styles.total}>{amount}</div>;
};
