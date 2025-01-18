import { FC, memo, useState } from 'react';

import { IProps as IInputProps } from '../Input';
import styles from './index.module.css';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import { DatePicker } from '../DatePicker';
import { Icon } from '../Icon';

interface IProps extends Omit<IInputProps, 'onChange'> {
  from: string;
  to: string;
  onChange: (from: string, to: string) => void;
}

export const DatePickerRange: FC<IProps> = memo(({ from, to, onChange }) => {
  const [openFrom, setOpenFrom] = useState(false);
  const [openTo, setOpenTo] = useState(false);

  const [valueFrom, setValueFrom] = useState(from);
  const [valueTo, setValueTo] = useState(to);

  const ref = useOutsideClick(() => {
    setOpenFrom(false);
    setOpenTo(false);
  });

  const handleChangeFrom = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFrom = e.target.value;
    setValueFrom(newFrom);
    setOpenFrom(false);
    onChange(newFrom, valueTo);
  };

  const handleChangeTo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTo = e.target.value;
    setValueTo(newTo);
    setOpenTo(false);
    onChange(valueFrom, newTo);
  };

  return (
    <div ref={ref} className={styles.container}>
      <span className={styles.dates}>
        <span className={styles.icon}>
          <Icon icon="calendar" color="white" size={30} />
        </span>
        <span
          className={styles.date}
          onClick={() => setOpenFrom((prev) => !prev)}
        >
          {valueFrom}
        </span>
        {'\u00A0'}-{'\u00A0'}
        <span
          className={styles.date}
          onClick={() => setOpenTo((prev) => !prev)}
        >
          {valueTo}
        </span>
      </span>
      {valueFrom > valueTo && (
        <div className={styles.error}>
          The start date cannot be later than the end date
        </div>
      )}
      {(openFrom || openTo) && (
        <div className={styles['date-picker']}>
          {openFrom && (
            <DatePicker
              value={valueFrom}
              name="fromDate"
              onChange={handleChangeFrom}
            />
          )}
          {openTo && (
            <DatePicker
              value={valueTo}
              name="toDate"
              onChange={handleChangeTo}
            />
          )}
        </div>
      )}
    </div>
  );
});
