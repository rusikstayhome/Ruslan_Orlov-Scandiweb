import React from 'react'

import CartItem from '../CartItem/CartItem';
import CartSummary from '../CartItem/CartSummary/CartSummary';

import { GET_CURRENT_CART, GET_CURRENT_CURRENCY } from '../../GraphQL/Queries';
import { Query } from '@apollo/client/react/components';
import { cartItemsVar } from '../../GraphQL/client/cache';

import './CartOverlay.css'

class CartOverlay extends React.Component {
  render() {
    return (
      <div className='cart-overlay'>
        <div className="cart-overlay__content"
          onMouseLeave={this.props.onMouseLeave}
        >
          <Query query={GET_CURRENT_CART}>
            {({ loading, error, data }) => {
              if (loading) return <p>Loading…</p>;
              if (error) return <p>Error :(</p>;
              const { cartItems } = data;
              const quantity = cartItemsVar().map((obj) => obj.quantity);
              const totalQuantity = quantity.length > 0 && quantity.reduce((sum, el) => sum + el);
              return (
                <div>
                  {data && cartItems.length === 0 ? (
                    <p>There are no items in your cart!</p>
                  ) : (
                    <>
                      <span><strong>My Bag</strong>, {totalQuantity} items</span>
                      <ul>
                        {data &&
                          cartItems.map((item, i) => (

                            <CartItem
                              key={i}
                              id={item.productId}
                              quantity={item.quantity}
                              attributes={item.attributes}
                              index={i}
                              overlay={true}
                            />

                          ))}
                      </ul>
                    </>
                  )}
                  <CartSummary overlay={true} />
                </div>
              );
            }}
          </Query>
        </div>
      </div>
    )
  }

}

export default CartOverlay