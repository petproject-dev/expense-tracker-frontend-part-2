export type Currency = 'USD' | 'EUR';

export type Icon =
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

export type Category =
  | 'mobile'
  | 'credits'
  | 'other_payments'
  | 'hobby'
  | 'subscriptions'
  | 'transport'
  | 'restaurants'
  | 'utility'
  | 'online_shopping'
  | 'debts';

export interface Expense {
  id: number;
  name: string;
  amount: number;
  category: Category;
  currency: Currency;
  date: string;
}

export interface IQueryExpenses {
  fromDate?: string;
  toDate?: string;
  limit?: number;
  offset?: number;
}
