import { FC } from 'react';

import styles from './index.module.css';
import { Icon } from '../../Icon';
import { IconType } from '../../Icon/index.types';

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
