import cn from 'classnames';
import { FC, TableHTMLAttributes } from 'react';

interface IProps extends TableHTMLAttributes<HTMLTableRowElement> {
  children?: React.ReactNode;
  classname?: string;
}

export const TableRow: FC<IProps> = ({ children, classname, ...props }) => {
  return (
    <tr className={cn('row', classname)} {...props}>
      {children}
    </tr>
  );
};
