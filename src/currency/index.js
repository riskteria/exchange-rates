import currencies from './currencies';

export const getCurrencyName = (currencyRate: string) => {
  const currency = currencies[currencyRate];
  return currency || 'Currency is not existed';
};

export const getCurrencyFormat = (value: number) => {
  return new Intl.NumberFormat('id-ID').format(value);
};
