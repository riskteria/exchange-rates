import React, { Component } from 'react';
import { AppContextConsumer, Rate, AppContext } from '../../context';
import { getCurrencyNameByCurrencyCode } from '../../currency';
import './ConversionForm';

type ConversionFormProps = {}

type ConversionFormState = {
  amount: number
}

class ConversionForm extends Component<ConversionFormProps, ConversionFormState> {
  static contextType = AppContext;

  onInputAmountChanged = (event: SyntheticInputEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;

    // check value match input patter requirements
    if (event.currentTarget.validity.valid) {
      this.context.setAmount(value);
    }
  }

  onRateChanged = (event: SyntheticInputEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    this.context.setRate(value);
  }

  renderRateOptions = (rates: Rate) => (
    Object.keys(rates).map((rate: Rate) => (
      <option key={rate} value={rate}>{`${rate} - ${getCurrencyNameByCurrencyCode(rate)}`}</option>
    ))
  )

  render() {
    const toCurrency = (value: number) => {
      return new Intl.NumberFormat('id-ID').format(value);
    }

    return (
      <section className="conversion-form">
        <AppContextConsumer>
          {
            (context) => (
              <form className="form">
                <div className="">
                  {`Convert ${toCurrency(context.amount)} ${getCurrencyNameByCurrencyCode(context.rate)}`}
                </div>
                <div className="field is-horizontal">
                  <span className="select">
                    <select
                      name="rate"
                      value={context.rate}
                      onChange={this.onRateChanged}
                    >
                      {this.renderRateOptions(context.rates)}
                    </select>
                  </span>
                  <div className="field">
                    <div className="control">
                      <input
                        name="amount"
                        className="input"
                        type="number"
                        pattern="\d*"
                        placeholder="Amount"
                        value={context.amount}
                        onChange={this.onInputAmountChanged}
                      />
                    </div>
                  </div>
                </div>
              </form>
            )
          }
        </AppContextConsumer>
      </section>
    );
  }
}

export default ConversionForm;
