import currencies from './currencies';

export const getCurrencyName = (currencyRate: string) => {
  const currency = currencies[currencyRate];
  return currency || 'Currency is not existed';
};

export const getCurrencyFormat = (value: number) => {
  const formattedNumber = new Intl.NumberFormat('id-ID').format(value);
  return formattedNumber;
};
