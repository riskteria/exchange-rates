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
    rate: 'USD',
    rates: {},
  }

  setAmount = (amount: number) => {
    this.setState((prevState: State) => ({
      ...prevState,
      amount,
    }));
  }

  setRate = (rate: string) => {
    this.setState((prevState: State) => ({
      ...prevState,
      rate,
    }));
  }

  setRates = (rates: Rate) => {
    this.setState((prevState: State) => ({
      ...prevState,
      rates,
    }));
  }

  render() {
    const { children } = this.props;

    return (
      <AppContext.Provider
        value={{
          ...this.state,
          setAmount: this.setAmount,
          setRate: this.setRate,
          setRates: this.setRates,
        }}
      >
        {children}
      </AppContext.Provider>
    )
  }
}
