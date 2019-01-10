import React, { Component } from 'react';
import uuid from 'uuid/v4';
import ListView from '../ListView';
import RateCard from '../RateCard';
import { AppContext, AppContextConsumer } from '../../context';
import { getCurrencyName } from '../../currency';

type ContentProps = {}

type ContentState = {
  showCurrency: boolean
}

class Content extends Component<ContentProps, ContentState> {
  static contextType = AppContext;

  state = {
    currencyRate: null,
    showCurrency: false
  }

  constructor(props, context) {
    super(props);

    this.state = {
      currencyRate: context.baseRate,
      showCurrency: false,
    };
  }

  async componentDidMount() {
    await this.fetchLatestRates();
  }

  toggleShowCurrency = () => {
    this.setState((prevState: State) => ({
      showCurrency: !prevState.showCurrency,
    }));
  }

  onCurrencyRateChanged = (event: SyntheticInputEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget

    this.setState((prevState: State) => ({
      ...prevState,
      currencyRate: value,
    }));
  }

  onAddCurrencyFormSubmitted = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { addCurrency, rates } = this.context;
    const { currencyRate } = this.state;

    const currencyValue = rates[currencyRate];
    const currencyId = uuid();

    const currency = { currencyId, currencyRate, currencyValue };

    addCurrency(currency);

    this.toggleShowCurrency();
  }

  fetchLatestRates = async () => {
    const url = 'https://api.exchangeratesapi.io/latest?base=USD';
    const response = await fetch(url, { method: 'GET' });
    const responseJson = await response.json();

    const { setRates, setBaseRate } = this.context;

    setRates(responseJson.rates);
    setBaseRate(responseJson.base);
  }

  renderRateOptions = (rates: Rate) => (
    Object.keys(rates).map((rate: Rate) => (
      <option key={rate} value={rate}>{`${rate} - ${getCurrencyName(rate)}`}</option>
    ))
  )

  renderFooter = () => {
    const { showCurrency, currencyRate } = this.state;

    if (false === showCurrency) {
      return (
        <button
          type="button"
          className="button"
          onClick={this.toggleShowCurrency}
        >
          Add more currency
        </button>
      );
    }

    return (
      <AppContextConsumer>
        {
          (context) => (
            <form className="form" onSubmit={this.onAddCurrencyFormSubmitted}>
              <div className="field has-addons">
                <div className="control is-expanded">
                  <div className="select is-fullwidth">
                    <select
                      name="currencyRate"
                      required={true}
                      value={currencyRate}
                      onChange={this.onCurrencyRateChanged}
                    >
                      {this.renderRateOptions(context.rates)}
                    </select>
                  </div>
                </div>
                <div className="control">
                  <button
                    type="submit"
                    className="button is-primary"
                  >
                    Choose
                  </button>
                </div>
              </div>
            </form>
          )
        }
      </AppContextConsumer>
    );
  }

  render() {
    return (
      <div className="content">
        <AppContextConsumer>
          {
            (context) => (
              <ListView
                data={context.currencies}
                extraData={{
                  amount: context.amount,
                  baseRate: context.baseRate,
                }}
                renderItem={(item: any, index: number) => (<RateCard { ...item } key={index} />)}
                renderFooter={this.renderFooter}
              />
            )
          }
        </AppContextConsumer>
      </div>
    );
  }
}

export default Content;
