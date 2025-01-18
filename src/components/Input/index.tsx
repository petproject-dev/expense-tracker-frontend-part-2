import cn from 'classnames';
import { FC, InputHTMLAttributes, useState } from 'react';

import { HelperText } from '../HelperText';
import styles from './index.module.css';

export interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  helperText?: string;
  className?: string;
}

export const Input: FC<IProps> = ({
  helperText = '',
  error = false,
  defaultValue = '',
  onChange,
  className,
  children,
  ...props
}) => {
  const [value, setValue] = useState(defaultValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div className={styles.container}>
      <span className={styles['input-container']}>
        <input
          {...props}
          onChange={handleChange}
          value={value}
          className={cn(styles.input, className, {
            [styles['input-error']]: error,
            [styles['with-children']]: !!children,
          })}
        />
        {children}
      </span>
      {helperText && <HelperText error={error}>{helperText}</HelperText>}
    </div>
  );
};
