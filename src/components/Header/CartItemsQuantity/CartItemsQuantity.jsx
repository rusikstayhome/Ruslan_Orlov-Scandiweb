import React from 'react';

import { GET_CURRENT_CART } from '../../../GraphQL/Queries';
import { Query } from '@apollo/client/react/components';

class CartItemsQuantity extends React.Component {
  render() {
    return (
      <Query query={GET_CURRENT_CART}>
        {({ loading, error, data }) => {
          if (loading) return;
          if (error) return;
          const cartItemQuantity =
            data.cartItems.length > 0 &&
            data?.cartItems.map((obj) => obj.quantity).reduce((sum, el) => sum + el);
          if (cartItemQuantity > 0) {
            return <div className="cart-quantity">{cartItemQuantity > 0 && cartItemQuantity}</div>;
          }
        }}
      </Query>
    );
  }
}

export default CartItemsQuantity;
