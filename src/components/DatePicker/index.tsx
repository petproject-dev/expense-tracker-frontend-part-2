import { FC } from 'react';

import { IProps as IInputProps, Input } from '../Input';

interface IProps extends IInputProps {}

export const DatePicker: FC<IProps> = (props) => {
  return <Input type="date" {...props} />;
};
