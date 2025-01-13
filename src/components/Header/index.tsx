import { Logo } from '../Logo';
import styles from './index.module.css';

export const Header = () => {
  return (
    <header className={styles.header}>
      <a href="/" className={styles.logo}>
        <Logo />
      </a>
    </header>
  );
};
