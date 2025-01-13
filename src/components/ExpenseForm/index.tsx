import { yupResolver } from '@hookform/resolvers/yup';
import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { Button } from '../Button';
import { CategoryGroup } from '../CategoryGroup';
import { DatePicker } from '../DatePicker';
import { Icon } from '../Icon';
import { IconButton } from '../IconButton';
import { Input } from '../Input';
import { InputLabel } from '../InputLabel';
import { InputWithCurrency } from '../InputWithCurrency';
import styles from './index.module.css';

type Inputs = {
  name: string;
  amount: number;
  category: string;
  date: string;
};

const schema = yup
  .object({
    name: yup.string().required(),
    amount: yup.number().positive().integer().required(),
    category: yup.string().required(),
    date: yup.string().required(),
  })
  .required();

interface IProps {
  defaultValues?: Inputs;
  onClose: () => void;
}

const emptyData = {
  name: undefined,
  amount: undefined,
  category: undefined,
  date: undefined,
};

export const ExpenseForm: FC<IProps> = ({ onClose, defaultValues = emptyData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log({ errors, data });

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.fields}>
        <div className={styles.field}>
          <InputLabel htmlFor="name">Name</InputLabel>
          <Input
            id="name"
            {...register('name')}
            error={!!errors.name}
            helperText={errors?.name?.message}
          />
        </div>
        <div className={styles.field}>
          <InputLabel htmlFor="amount">Payment amount</InputLabel>
          <InputWithCurrency
            id="amount"
            {...register('amount')}
            defaultValue={0}
            error={!!errors.amount}
            helperText={errors?.amount?.message}
          />
        </div>
        <div className={styles.field}>
          <InputLabel>Select category</InputLabel>
          <CategoryGroup
            {...register('category')}
            error={!!errors.category}
            helperText={errors?.category?.message}
          />
        </div>
        <div className={styles.field}>
          <InputLabel htmlFor="date">Select category</InputLabel>
          <DatePicker
            id="date"
            {...register('date')}
            error={!!errors.date}
            helperText={errors?.date?.message}
          />
        </div>
      </div>
      <div className={styles.buttons}>
        <div className={styles['button-close']}>
          <IconButton onClick={onClose}>
            <Icon icon="close" color="white" size={12} />
          </IconButton>
        </div>
        <Button>Create</Button>
      </div>
    </form>
  );
};
