export type Rate = {
  [countryID: string]: string
}

export type Currency = {
  currencyId: string,
  currencyRate: string,
  currencyValue: number
}
