import React, { Component } from 'react';
import { AppContextConsumer, Rate } from '../../context';
import './ConversionForm';

type ConversionFormProps = {}

type ConversionFormState = {
  amount: number
}

class ConversionForm extends Component<ConversionFormProps, ConversionFormState> {
  state = {
    amount: 10,
  }

  onInputAmountChanged = (event: SyntheticInputEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;

    this.setState({ [name]: value });
  }

  renderRateOptions = (rates: Rate) => (
    Object.keys(rates).map((rate: Rate) => (
      <option key={rate}>{rate}</option>
    ))
  )

  render() {
    return (
      <section className="conversion-form">
        <form className="form">
          <div className="">
            USD - United States Dollars
          </div>
          <div className="field is-horizontal">
            <span className="select">
              <select name="rate">
                <AppContextConsumer>
                  {
                    (context) => this.renderRateOptions(context.rates)
                  }
                </AppContextConsumer>
              </select>
            </span>
            <div className="field">
              <div className="control">
                <input
                  onChange={this.onInputAmountChanged}
                  name="amount"
                  className="input"
                  type="text"
                  placeholder="Amount"
                />
              </div>
            </div>
          </div>
        </form>
      </section>
    );
  }
}

export default ConversionForm;
