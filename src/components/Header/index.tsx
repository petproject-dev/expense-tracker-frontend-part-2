import cn from 'classnames';
import { FC, memo } from 'react';

import { Logo } from '../Logo';
import styles from './index.module.css';

interface IProps {
  children?: React.ReactNode;
  classname?: string;
}

export const Header: FC<IProps> = memo(({ children, classname = '' }) => {
  return (
    <header className={cn(styles.header, classname)}>
      <a href="/" className={styles.logo}>
        <Logo />
      </a>
      {children && <div className={styles.title}>{children}</div>}
    </header>
  );
});
