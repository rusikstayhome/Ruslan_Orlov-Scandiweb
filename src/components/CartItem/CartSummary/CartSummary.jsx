import React from 'react';

import { Query } from '@apollo/client/react/components';
import { cartItemsVar } from '../../../GraphQL/client/cache';
import { GET_CURRENT_CURRENCY } from '../../../GraphQL/Queries';

import './CartSummary.css';

class CartSummary extends React.Component {
  state = {
    summary: null,
  };
  render() {
    const localStorageCurrency = window.localStorage.getItem('currency');
    return (
      <Query query={GET_CURRENT_CURRENCY}>
        {({ loading, error, data }) => {
          if (loading) return;
          if (error) return;
          const totalPrices = cartItemsVar().map((obj) =>
            obj.price
              .filter((price) =>
                data
                  ? price.currency.label === data.currency
                  : price.currency.label === localStorageCurrency,
              )
              .map((item) => item.amount * obj.quantity),
          );

          const symbol = cartItemsVar().map((obj) =>
            obj.price
              .filter((price) =>
                data
                  ? price.currency.label === data.currency
                  : price.currency.label === localStorageCurrency,
              )
              .map((item) => item.currency.symbol),
          );

          const summary =
            totalPrices.length > 0 &&
            totalPrices
              .flat()
              .reduce((sum, el) => sum + el)
              .toFixed(2);

          const quantity = cartItemsVar().map((obj) => obj.quantity);
          const totalQuantity = quantity.length > 0 && quantity.reduce((sum, el) => sum + el);

          return (
            totalPrices.length > 0 &&
            (this.props.overlay ? (
              <section className="cart-summary__overlay">
                <div className="cart-summary__overlay__prop">
                  <h2>Total:</h2>
                  <h2>
                    {symbol[0]}
                    {summary}
                  </h2>
                </div>
                <div className="cart-summary__overlay__buttons">
                  <button>VIEW BAG</button>
                  <button>CHECK OUT</button>
                </div>
              </section>
            ) : (
              <section className="cart-summary">
                <div className="cart-summary__wrapper">
                  <div className="cart-summary__prop">
                    <h2>Tax 21%:</h2>
                    <h2>Quantity:</h2>
                    <h2>Total:</h2>
                  </div>
                  <div>
                    <h2>
                      {symbol[0]}
                      {(summary * 0.21).toFixed(2)}
                    </h2>
                    <h2>{totalQuantity}</h2>
                    <h2>
                      {symbol[0]}
                      {summary}
                    </h2>
                  </div>
                </div>
                <button>ORDER</button>
              </section>
            ))
          );
        }}
      </Query>
    );
  }
}

export default CartSummary;
