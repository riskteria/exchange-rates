import React, { Component } from 'react';
import { AppContext } from '../../context';

type ContentProps = {}

type ContentState = {}

class Content extends Component<ContentProps, ContentState> {
  static contextType = AppContext;

  async componentDidMount() {
    await this.fetchLatestRates();
  }

  fetchLatestRates = async () => {
    const url = 'https://api.exchangeratesapi.io/latest';
    const response = await fetch(url, { method: 'GET' });
    const responseJson = await response.json();

    const { setRates } = this.context;

    setRates(responseJson.rates);
  }

  render() {
    return (
      <div className="content" />
    );
  }
}

export default Content;
