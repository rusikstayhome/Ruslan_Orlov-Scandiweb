import React from 'react';

import { client } from '../../../GraphQL/client/client';
import { GET_CURRENCIES } from '../../../GraphQL/Queries';
import { GET_CURRENT_CURRENCY } from '../../../GraphQL/Queries';
import { Query } from '@apollo/client/react/components';

import './CurrenciesOverlay.css';

class CurrenciesOverlay extends React.Component {
  setCurrency = (label) => {
    client.cache.writeQuery({
      query: GET_CURRENT_CURRENCY,
      data: {
        currency: label,
      },
    });
    window.localStorage.setItem('currency', label);
    this.props.closeCurrenCiesOverlay();
  };

  render() {
    return (
      <>
        {this.props.show ? (
          <ul className="currencies">
            <Query query={GET_CURRENCIES}>
              {({ loading, error, data }) => {
                if (loading) return <p>Loading…</p>;
                if (error) return <p>Error :(</p>;
                return data.currencies.map((obj, i) => {
                  return (
                    <li
                      key={i}
                      onClick={() =>
                        this.setCurrency(obj.label)
                      }>{`${obj.symbol} ${obj.label}`}</li>
                  );
                });
              }}
            </Query>
          </ul>
        ) : (
          ''
        )}
      </>
    );
  }
}

export default CurrenciesOverlay;
