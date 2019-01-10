import React, { Component, createContext } from 'react';
import { setItem, getItem } from '../store/localStorage';
import type { Rate, Currency } from '../types';


type ContextProps = {
  children: React$Node
}

type ContextState = {
  amount: number,
  baseRate: stirng,
  rates: Rate,
  currencies: Currency[]
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

  componentDidMount() {
    this.rehydrateState()
  }

  componentDidUpdate() {
    this.persistState();
  }

  rehydrateState = () => {
    const appContext: ?State = JSON.parse(getItem('appContext'));

    if (appContext) {
      this.setState((prevState: State) => ({
        ...prevState,
        ...appContext,
      }));
    }
  }

  persistState = () => {
    setItem('appContext', JSON.stringify(this.state));
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

  addCurrency = (currency: Currency) => {
    this.setState((prevState: State) => ({
      ...prevState,
      currencies: [...prevState.currencies, currency],
    }));
  }

  removeCurrency = (currencyId: string) => {
    this.setState((prevState: State) => ({
      ...prevState,
      currencies: prevState.currencies.filter((currency: Rate) => currency.currencyId !== currencyId),
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
