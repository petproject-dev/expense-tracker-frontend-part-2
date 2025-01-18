import { yupResolver } from '@hookform/resolvers/yup';
import { formatISO, startOfDay } from 'date-fns';
import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { categoryList, currencyList } from '../../entities';
import { Expense } from '../../types';
import { Button } from '../Button';
import { CategoryGroup } from '../CategoryGroup';
import { DatePicker } from '../DatePicker';
import { Icon } from '../Icon';
import { IconButton } from '../IconButton';
import { Input } from '../Input';
import { InputLabel } from '../InputLabel';
import { InputWithCurrency } from '../InputWithCurrency';
import styles from './index.module.css';
import { useClickEscape } from '../../hooks/useClickEscape';

interface Inputs extends Omit<Expense, 'id'> {}

const schema = yup
  .object({
    name: yup.string().required(),
    amount: yup.number().positive().integer().required(),
    category: yup.string().oneOf(categoryList).required(),
    currency: yup.string().oneOf(currencyList).required(),
    date: yup.string().required(),
  })
  .required();

interface IProps {
  defaultValues?: Inputs;
  onClose: () => void;
  onSubmit: (data: Inputs) => void;
}

const emptyData = {
  name: undefined,
  amount: undefined,
  category: undefined,
  currency: undefined,
  date: undefined,
};

export const ExpenseForm: FC<IProps> = ({
  onClose,
  onSubmit,
  defaultValues = emptyData,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues,
    resolver: yupResolver(schema),
  });

  useClickEscape(onClose);

  const handleOnSubmit: SubmitHandler<Inputs> = (data) => {
    onSubmit({ ...data, date: formatISO(startOfDay(new Date(data.date))) });
    reset();
    onClose();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(handleOnSubmit)}>
      <div className={styles.fields}>
        <div className={styles.field}>
          <InputLabel htmlFor="name">Name</InputLabel>
          <Input
            id="name"
            {...register('name')}
            error={!!errors.name}
            helperText={errors?.name?.message}
            autoFocus
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
            selectProps={register('currency')}
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
          <InputLabel htmlFor="date">Select date</InputLabel>
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
        <Button type="submit">Create</Button>
      </div>
    </form>
  );
};
