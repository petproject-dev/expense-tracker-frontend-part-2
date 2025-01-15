import cn from 'classnames';
import { FC, ForwardedRef, forwardRef, TableHTMLAttributes } from 'react';

interface IProps extends TableHTMLAttributes<HTMLTableRowElement> {
  children?: React.ReactNode;
  classname?: string;
  ref?: ForwardedRef<HTMLTableRowElement>;
}

export const TableRow: FC<IProps> = forwardRef(({ children, classname, ...props }, ref) => {
  return (
    <tr ref={ref} className={cn('row', classname)} {...props}>
      {children}
    </tr>
  );
});
