import React, { PureComponent } from 'react';
import { getCurrencyName, getCurrencyFormat } from '../../currency';
import { AppContext } from '../../context';
import './RateCard.css';

type Props = {
  currencyId: number,
  currencyRate: string,
  currencyValue: number,
  baseRate: string,
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

  calculateCurrencyAmountConversion = (amount: number, currencyValue: number) => {
    return getCurrencyFormat(parseFloat(amount) * parseFloat(currencyValue));
  }

  render() {
    const {
      currencyRate,
      currencyValue,
      baseRate,
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
              {this.calculateCurrencyAmountConversion(amount, currencyValue)}
            </div>
          </div>
          <div className="card-content">
            <div className="card-content_currency-name">
              {`${currencyRate} - ${getCurrencyName(currencyRate)}`}
            </div>
            <div className="card-content_currency-value">
              <span>{`1 ${baseRate}`}</span>
              <span> = </span>
              <span>{`${currencyRate} ${getCurrencyFormat(currencyValue)}`}</span>
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
