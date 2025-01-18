import { FC, memo } from 'react';

import { IProps as IInputProps, Input } from '../Input';

interface IProps extends IInputProps {}

export const DatePicker: FC<IProps> = memo((props) => {
  return <Input type="date" defaultValue={props.value} {...props} />;
});
