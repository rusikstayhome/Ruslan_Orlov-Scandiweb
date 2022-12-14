import React from 'react';

import CartImgSection from './CartImg/CartImgSection';
import Price from '../Price/Price';
import Attributes from '../Attributes/Attributes';

import { Query } from '@apollo/client/react/components';
import { GET_ONE_PRODUCT } from '../../GraphQL/Queries';
import { cartItemsVar } from '../../GraphQL/client/cache';

import './CartItem.css';

class CartItem extends React.Component {
  constructor() {
    super();
    this.state = {
      mainPicture: 0,
      quantity: 1,
      attributes: {
        activeAttribute: {},
        color: null,
      },
    };
  }

  componentDidMount() {
    this.setState({
      attributes: this.props.attributes,
      quantity: this.props.quantity,
    });
  }

  setColor = (value) => {
    this.setState((prevState) => ({
      attributes: {
        color: value,
        activeAttribute: prevState.attributes.activeAttribute,
      },
    }));
  };

  setActiveAttribute = (key, value) => {
    this.setState((prevState) => ({
      attributes: {
        color: prevState.attributes.color,
        activeAttribute: {
          ...prevState.attributes.activeAttribute,
          [key]: value,
        },
      },
    }));
  };

  setImg = (imgs, side) => {
    if (side === 'left') {
      if (this.state.mainPicture <= 0) {
        this.setState({
          mainPicture: imgs.length - 1,
        });
        return;
      }
      this.setState({
        mainPicture: this.state.mainPicture - 1,
      });
    } else {
      if (this.state.mainPicture >= imgs.length - 1) {
        this.setState({
          mainPicture: 0,
        });
        return;
      }
      this.setState({
        mainPicture: this.state.mainPicture + 1,
      });
    }
  };

  setQuantity = (sign) => {
    if (sign === 'plus') {
      this.setState({
        quantity: this.state.quantity + 1,
      });
      const quantity = this.state.quantity;
      let newCartItem = { ...cartItemsVar()[this.props.index] };
      newCartItem.quantity = quantity + 1;
      const cartItems = cartItemsVar();
      cartItems.splice(this.props.index, 1, newCartItem);
      cartItemsVar([...cartItems]);
    } else {
      if (this.state.quantity <= 1) {
        const cartItems = cartItemsVar();
        cartItems.splice(this.props.index, 1);
        cartItemsVar([...cartItems]);
        return;
      }
      this.setState({
        quantity: this.state.quantity - 1,
      });
      const quantity = this.state.quantity;
      let newCartItem = { ...cartItemsVar()[this.props.index] };
      newCartItem.quantity = quantity - 1;
      const cartItems = cartItemsVar();
      cartItems.splice(this.props.index, 1, newCartItem);
      cartItemsVar([...cartItems]);
      console.log(cartItemsVar());
    }
  };

  render() {
    const { quantity } = this.state;
    const { overlay } = this.props;

    return (
      <Query variables={{ id: this.props.id }} query={GET_ONE_PRODUCT}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading???</p>;
          if (error) return <p>Error :(</p>;
          const price = data.product.prices;
          return (
            <>
              <article className={`cart-item ${overlay ? 'cart-item__overlay' : ''}`}>
                <section>
                  <div className="desc-header">
                    <h3>{data.product.brand}</h3>
                    <h2>{data.product.name}</h2>
                  </div>
                  <div className="product-price">
                    <h2>
                      <Price price={price} quantity={quantity} />
                    </h2>
                  </div>
                  <div className="product-attributes">
                    <Attributes
                      obj={data.product.attributes}
                      setColor={this.setColor}
                      setActiveAttribute={this.setActiveAttribute}
                      attributes={this.state.attributes}
                    />
                  </div>
                </section>
                <section className="main-cart-img__section">
                  <CartImgSection
                    data={data}
                    mainPicture={this.state.mainPicture}
                    quantity={this.state.quantity}
                    setImg={this.setImg}
                    setQuantity={this.setQuantity}
                  />
                </section>
              </article>
            </>
          );
        }}
      </Query>
    );
  }
}

export default CartItem;
