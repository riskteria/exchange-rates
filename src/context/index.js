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
    rates: {},
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
          setRates: this.setRates,
        }}
      >
        {children}
      </AppContext.Provider>
    )
  }
}
