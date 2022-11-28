import React from 'react';

import CartItem from './CartItem/CartItem';
import CartSummary from './CartItem/CartSummary/CartSummary';

import { GET_CURRENT_CART } from '../../GraphQL/Queries';
import { cartItemsVar } from '../../GraphQL/client/cache';
import { Query } from '@apollo/client/react/components';

class Cart extends React.Component {
  render() {
    return (
      <>
        <h1>CART</h1>
        <Query query={GET_CURRENT_CART}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading…</p>;
            if (error) return <p>Error :(</p>;
            const { cartItems } = data;
            return (
              <div>
                {data && cartItems.length === 0 ? (
                  <p>There are no items in your cart!</p>
                ) : (
                  <ul>
                    {data &&
                      cartItems.map((item, i) => (
                        <CartItem
                          key={i}
                          id={item.productId}
                          quantity={item.quantity}
                          attributes={item.attributes}
                          index={i}
                        />
                      ))}
                  </ul>
                )}
                <CartSummary />
              </div>
            );
          }}
        </Query>
      </>
    );
  }
}

export default Cart;
