import React, { Component } from 'react';
import ListView from '../ListView';
import RateCard from '../RateCard';
import { AppContext, AppContextConsumer } from '../../context';
import { getCurrencyNameByCurrencyCode } from '../../currency';

type ContentProps = {}

type ContentState = {
  showCurrency: boolean
}

class Content extends Component<ContentProps, ContentState> {
  static contextType = AppContext;

  state = {
    showCurrency: false
  }

  async componentDidMount() {
    await this.fetchLatestRates();
  }

  toggleShowCurrency = () => {
    this.setState((prevState: State) => ({
      showCurrency: !prevState.showCurrency,
    }));
  }

  onAddCurrencyFormSubmitted = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    this.toggleShowCurrency();
  }

  fetchLatestRates = async () => {
    const url = 'https://api.exchangeratesapi.io/latest?base=USD';
    const response = await fetch(url, { method: 'GET' });
    const responseJson = await response.json();

    const { setRates, setBaseRate } = this.context;

    setRates(responseJson.rates);
    setBaseRate(response.base);
  }

  renderRateOptions = (rates: Rate) => (
    Object.keys(rates).map((rate: Rate) => (
      <option key={rate} value={rate}>{`${rate} - ${getCurrencyNameByCurrencyCode(rate)}`}</option>
    ))
  )

  renderFooter = () => {
    const { showCurrency } = this.state;

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
                      name="rate"
                      onChange={this.onBaseRateChanged}
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
                renderItem={<RateCard />}
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
