import { FC } from 'react';

import styles from './index.module.css';
import { Currency } from '../../../types';

interface IProps {
  amount: number;
  currency: Currency;
}

const currencyMap: Record<Currency, string> = {
  USD: '$',
  EUR: '€',
};

export const TotalAmount: FC<IProps> = ({ amount, currency }) => {
  const currencyChar = currencyMap[currency];

  return (
    <div className={styles.total}>
      {amount}
      {currencyChar}
    </div>
  );
};
