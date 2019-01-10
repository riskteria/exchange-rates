import React, { PureComponent } from 'react';
import { getCurrencyName } from '../../currency';
import { AppContext } from '../../context';
import './RateCard.css';

type Props = {
  currencyId: number,
  currencyRate: string,
  currencyValue: number,
  amount: number
}

type State = {}

class RateCard extends PureComponent<Props, State> {
  static contextType = AppContext;

  onCurrencyRateRemoved = (event: SyntheticMouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const { removeCurrency } = this.context;
    const { currencyId } = this.props;

    removeCurrency(currencyId);
  }

  render() {
    const {
      currencyRate,
      currencyValue,
      amount,
    } = this.props;

    return (
      <div className="card">
        <div className="card-wrapper">
          <div className="card-header">
            <div className="card-header_currency-code">
              {currencyRate}
            </div>
            <div className="card-header_amount">
              {amount}
            </div>
          </div>
          <div className="card-content">
            <div className="card-content_currency-name">
              {getCurrencyName(currencyRate)}
            </div>
            <div className="card-content_currency-value">
              {currencyValue}
            </div>
          </div>
        </div>
        <button
          type="button"
          className="button is-small"
          onClick={this.onCurrencyRateRemoved}
        >
          -
        </button>
      </div>
    );
  }
}

export default RateCard;
