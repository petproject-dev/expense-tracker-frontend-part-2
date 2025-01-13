import { FC, InputHTMLAttributes } from 'react';

import { categoryIcons } from './index.const';
import { Icon } from '../Icon';
import { IconRadio } from '../IconRadio';
import styles from './index.module.css';
import { HelperText } from '../HelperText';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  helperText?: string;
  error?: boolean;
}

export const CategoryGroup: FC<IProps> = ({ helperText = '', error = false, ...props }) => {
  return (
    <>
      <div className={styles.items}>
        {categoryIcons.map((icon) => (
          <IconRadio key={icon} value={icon} {...props}>
            <Icon icon={icon} size={24} />
          </IconRadio>
        ))}
      </div>
      {helperText && <HelperText error={error}>{helperText}</HelperText>}
    </>
  );
};
