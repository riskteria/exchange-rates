import React from 'react';
import './RateCard.css';

type Props = {
  currencyCode: string,
  currencyName: string,
  currencyValue: number,
  amount: number
}

const RateCard = (props: Props) => {
  const {
    currencyCode,
    currencyName,
    currencyValue,
    amount,
  } = props;

  return (
    <div className="card">
      <div className="card-wrapper">
        <div className="card-header">
          <div className="card-header_currency-code">
            {currencyCode}
          </div>
          <div className="card-header_amount">
            {amount}
          </div>
        </div>
        <div className="card-content">
          <div className="card-content_currency-name">
            {currencyName}
          </div>
          <div className="card-content_currency-value">
            {currencyValue}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RateCard;
