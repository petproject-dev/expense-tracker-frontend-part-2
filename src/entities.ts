import { Category, Currency } from './types';

export const categoryList: Category[] = [
  'mobile',
  'credits',
  'other_payments',
  'hobby',
  'subscriptions',
  'transport',
  'restaurants',
  'utility',
  'online_shopping',
  'debts',
];

export const currencyList: Currency[] = ['USD', 'EUR'];

export const categoriesMap: Record<Category, string> = {
  mobile: 'Mobile',
  credits: 'Credits',
  other_payments: 'Other Payments',
  hobby: 'Hobby',
  subscriptions: 'Subscriptions',
  transport: 'Transport',
  restaurants: 'Restaurants',
  utility: 'Utility',
  online_shopping: 'Online Shopping',
  debts: 'Debts',
};

export const currencyMap: Record<Currency, string> = {
  USD: '$',
  EUR: '€',
};
