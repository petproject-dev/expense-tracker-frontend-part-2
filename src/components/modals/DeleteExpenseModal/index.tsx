import { FC } from 'react';

import styles from './index.module.css';
import { Button } from '../../Button';

interface IProps {
  onClose: () => void;
  onConfirm: () => void;
  open: boolean;
}

export const DeleteExpenseModal: FC<IProps> = ({
  onClose,
  onConfirm,
  open,
}) => {
  if (!open) return;
  return (
    <dialog className={styles.container}>
      <p className={styles.text}>
        Are you sure you want to delete this expense?
      </p>
      <div className={styles.buttons}>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onConfirm}>Yes, confirm</Button>
      </div>
    </dialog>
  );
};
