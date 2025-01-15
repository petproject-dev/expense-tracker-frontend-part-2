import { FC } from 'react';

import styles from './index.module.css';
import { Icon as IconType } from '../../../types';
import { Icon } from '../../Icon';

interface IProps {
  category: IconType;
}

export const IconCategory: FC<IProps> = ({ category }) => {
  return (
    <div className={styles.container}>
      <Icon icon={category} size={20} color="white" />
    </div>
  );
};
