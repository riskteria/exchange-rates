import currencies from './currencies';

export const getCurrencyNameByCurrencyCode = (currencyCode: string) => {
  const currency = currencies[currencyCode];
  return currency || 'Currency is not existed';
};
