import cn from 'classnames';
import { FC } from 'react';

import styles from './index.module.css';

interface IProps {
  error?: boolean;
  children: React.ReactNode;
}

export const HelperText: FC<IProps> = ({ children, error = false }) => {
  return (
    <span
      className={cn(styles['helper-text'], {
        [styles['helper-text-error']]: error,
      })}
    >
      {children}
    </span>
  );
};
