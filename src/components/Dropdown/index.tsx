import cn from 'classnames';
import { FC, SelectHTMLAttributes, useState } from 'react';

import styles from './index.module.css';

interface IProps extends SelectHTMLAttributes<HTMLSelectElement> {
  classname?: string;
}

export const Dropdown: FC<IProps> = ({
  defaultValue,
  onChange,
  classname,
  ...props
}) => {
  const [value, setValue] = useState(defaultValue);

  const handleChangeCurrency = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <select
      className={cn(styles.select, classname)}
      value={value}
      onChange={handleChangeCurrency}
      {...props}
    >
      <option>USD</option>
      <option>EUR</option>
    </select>
  );
};
