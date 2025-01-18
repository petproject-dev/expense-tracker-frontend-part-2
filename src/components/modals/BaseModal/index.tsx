import { FC } from 'react';

import styles from './index.module.css';
import { useClickEscape } from '../../../hooks/useClickEscape';
import { LayoutBackground } from '../../LayoutBackground';

interface IProps {
  onClose: () => void;
  open: boolean;
  children: React.ReactNode;
}

export const BaseModal: FC<IProps> = ({ onClose, open, children }) => {
  useClickEscape(onClose);

  if (!open) return;

  return (
    <>
      <LayoutBackground open={open} onClose={onClose} />
      <div className={styles.container}>{children}</div>
    </>
  );
};
