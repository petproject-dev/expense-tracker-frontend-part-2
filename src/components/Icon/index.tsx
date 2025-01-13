import cn from 'classnames';
import { FC, HTMLAttributes } from 'react';

import svgSrc from './assets/sprite.svg';
import styles from './index.module.css';

export interface IProps extends HTMLAttributes<HTMLElement> {
  icon:
    | 'mobile'
    | 'credits'
    | 'other_payments'
    | 'hobby'
    | 'subscriptions'
    | 'transport'
    | 'restaurants'
    | 'utility'
    | 'online_shopping'
    | 'debts'
    | 'plus'
    | 'close'
    | 'calendar'
    | 'menu'
    | 'loader';
  size?: number;
  color?: 'grey' | 'white';
}

const colorMapper = {
  grey: '#898989',
  white: '#fff',
};

export const Icon: FC<IProps> = ({ icon, size = 24, className, color = 'grey', ...props }) => {
  const fillColor = colorMapper[color];

  return (
    <span {...props} className={cn(styles['icon-container'], className)}>
      <svg
        height={size}
        width={size}
        fill={fillColor}
        className={styles.icon}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <use xlinkHref={`${svgSrc}#${icon}`} />
      </svg>
    </span>
  );
};
