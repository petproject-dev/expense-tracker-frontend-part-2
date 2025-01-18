import { FC, SelectHTMLAttributes, useState } from 'react';

import { Input, IProps as InputProps } from '../Input';
import styles from './index.module.css';

interface IDropdownProps extends SelectHTMLAttributes<HTMLSelectElement> {}

interface IProps extends InputProps {
  selectProps?: IDropdownProps;
}

const Dropdown: FC<IDropdownProps> = ({ defaultValue, onChange, ...props }) => {
  const [value, setValue] = useState(defaultValue);

  const handleChangeCurrency = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <select
      className={styles.select}
      value={value}
      onChange={handleChangeCurrency}
      {...props}
    >
      <option>USD</option>
      <option>EUR</option>
    </select>
  );
};

export const InputWithCurrency: FC<IProps> = ({ selectProps, ...props }) => {
  return (
    <div className={styles.container}>
      <Input
        {...props}
        type="number"
        dropdownComponent={<Dropdown {...selectProps} />}
      />
    </div>
  );
};
