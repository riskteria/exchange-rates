import React, { PureComponent } from 'react';
import { AppContextConsumer, Rate, AppContext } from '../../context';
import { getCurrencyName, getCurrencyFormat } from '../../currency';
import './ConversionForm.css';

type ConversionFormProps = {}

type ConversionFormState = {}

class ConversionForm extends PureComponent<ConversionFormProps, ConversionFormState> {
  static contextType = AppContext;

  onInputAmountChanged = (event: SyntheticInputEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;

    // check value match input patter requirements
    if (false === event.currentTarget.validity.valid) return;

    // set amount as value or 1 as default value
    this.context.setAmount(value || 1);
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
                <div className="form-title">
                  {`Convert ${getCurrencyFormat(context.amount)} ${getCurrencyName(context.baseRate)}`}
                </div>
                <div className="field is-horizontal">
                  <div className="field-label">
                    <label className="label">{context.baseRate}</label>
                  </div>
                  <div className="field-body">
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
                          maxLength="number"
                          autoFocus={true}
                        />
                      </div>
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
