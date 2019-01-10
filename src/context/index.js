import React, { Component, createContext } from 'react';

export type Rate = {
  [countryID: string]: string
}

type ContextProps = {
  children: React$Node
}

type ContextState = {
  rates: Rate
}

export const AppContext = createContext();

export const AppContextConsumer = AppContext.Consumer

export class AppContextProvider extends Component<ContextProps, ContextState> {
  state = {
    amount: 10,
    baseRate: 'USD',
    rates: {},
    currencies: [],
  }

  setAmount = (amount: number) => {
    this.setState((prevState: State) => ({
      ...prevState,
      amount,
    }));
  }

  setBaseRate = (baseRate: string) => {
    this.setState((prevState: State) => ({
      ...prevState,
      baseRate,
    }));
  }

  setRates = (rates: Rate) => {
    this.setState((prevState: State) => ({
      ...prevState,
      rates,
    }));
  }

  addCurrency = (currency: Rate) => {
    this.setState((prevState: State) => ({
      ...prevState,
      currencies: prevState.currencies.concat(currency),
    }));
  }

  removeCurrency = (currencyId: string) => {
    this.setState((prevState: State) => ({
      ...prevState,
      currencies: prevState.currencies.filter((currency: Rate) => currency.id !== currencyId),
    }));
  }

  render() {
    const { children } = this.props;

    return (
      <AppContext.Provider
        value={{
          ...this.state,
          setAmount: this.setAmount,
          setBaseRate: this.setBaseRate,
          setRates: this.setRates,
          addCurrency: this.addCurrency,
          removeCurrency: this.removeCurrency,
        }}
      >
        {children}
      </AppContext.Provider>
    )
  }
}
