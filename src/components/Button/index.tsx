import { ButtonHTMLAttributes, FC } from 'react';

import styles from './index.module.css';

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button: FC<IProps> = ({ children, ...props }) => {
  return (
    <button className={styles.button} {...props}>
      {children}
    </button>
  );
};
