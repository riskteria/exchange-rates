import React, { Component } from 'react';
import { AppContextConsumer, Rate, AppContext } from '../../context';
import { getCurrencyName, getCurrencyFormat } from '../../currency';
import './ConversionForm';

type ConversionFormProps = {}

type ConversionFormState = {}

class ConversionForm extends Component<ConversionFormProps, ConversionFormState> {
  static contextType = AppContext;

  onInputAmountChanged = (event: SyntheticInputEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;

    // check value match input patter requirements
    if (event.currentTarget.validity.valid) {
      this.context.setAmount(value);
    }
  }

  onBaseRateChanged = (event: SyntheticInputEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    this.context.setBaseRate(value);
  }

  renderRateOptions = (rates: Rate) => (
    Object.keys(rates).map((rate: Rate) => (
      <option key={rate} value={rate}>{`${rate} - ${getCurrencyName(rate)}`}</option>
    ))
  )

  render() {

    return (
      <section className="conversion-form">
        <AppContextConsumer>
          {
            (context) => (
              <form className="form">
                <div className="">
                  {`Convert ${getCurrencyFormat(context.amount)} ${getCurrencyName(context.baseRate)}`}
                </div>
                <div className="field is-horizontal">
                  <span className="select">
                    <select
                      name="baseRate"
                      value={context.baseRate}
                      onChange={this.onBaseRateChanged}
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
