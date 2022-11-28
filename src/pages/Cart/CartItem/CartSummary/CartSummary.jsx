import React from 'react';

import Price from '../../../Product/Price/TotalPrice';

import { Query } from '@apollo/client/react/components';
import { cartItemsVar } from '../../../../GraphQL/client/cache';
import { GET_CURRENT_CURRENCY } from '../../../../GraphQL/Queries';

import './CartSummary.css';

class CartSummary extends React.Component {
  render() {
    const localStorageCurrency = window.localStorage.getItem('currency');
    // console.log();
    return (
      <Query query={GET_CURRENT_CURRENCY}>
        {({ loading, error, data }) => {
          if (loading) return;
          if (error) return;
          //   const totalPrice = data.cartItems.map((obj) => obj.price).filter((price) => price);
          //   console.log(data);
          //   console.log(
          //     cartItemsVar().map((obj) =>
          //       obj.price
          //         .filter(
          //           (price) =>
          //             price.currency.label === data.currency ||
          //             price.currency.label === localStorageCurrency,
          //         )
          //         .map((item) => item.amount * obj.quantity),
          //     ),
          //   );
          return (
            <section className="cart-summary">
              <h2>{/* <Price /> */}228</h2>
            </section>
          );
        }}
      </Query>
    );
  }
}

export default CartSummary;
