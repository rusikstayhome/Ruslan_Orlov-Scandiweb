import React from 'react';

import { Query } from '@apollo/client/react/components';

import { GET_CURRENT_CURRENCY } from '../../../GraphQL/Queries';

class Price extends React.Component {
  render() {
    const { price } = this.props;
    const localStorageCurrency = window.localStorage.getItem('currency');

    return (
      <Query query={GET_CURRENT_CURRENCY}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading…</p>;
          if (error) return <p>Error :(</p>;

          const currentPrice = data
            ? price.filter((price) => price.currency.label === data.currency)
            : price.filter((price) => price.currency.label === (localStorageCurrency || 'USD'));

          return <>{`${currentPrice[0].currency.symbol}${currentPrice[0].amount}`}</>;
        }}
      </Query>
    );
  }
}

export default Price;
