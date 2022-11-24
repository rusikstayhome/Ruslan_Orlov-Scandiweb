import React from 'react';

import Price from '../../Product/Price/Price';
import Attributes from '../../Product/Attributes/Attributes';

import { Query } from '@apollo/client/react/components';
import { GET_ONE_PRODUCT } from '../../../GraphQL/Queries';

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
    } else {
      if (this.state.quantity < 1) {
        this.setState({
          quantity: 1,
        });
      }
      this.setState({
        quantity: this.state.quantity - 1,
      });
    }
  };
  render() {
    return (
      <Query variables={{ id: this.props.id }} query={GET_ONE_PRODUCT}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading…</p>;
          if (error) return <p>Error :(</p>;

          const price = data.product.prices;
          return (
            <>
              <article className="cart-item">
                <section>
                  <div className="desc-header">
                    <h3>{data.product.brand}</h3>
                    <h2>{data.product.name}</h2>
                  </div>
                  <div className="product-price">
                    <h2>
                      <Price price={price} />
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
                  <img src={data.product.gallery[this.state.mainPicture]} alt="main-cart-img" />
                  <div className="cart-img__arrows">
                    <span
                      className="left-arrow"
                      onClick={() => this.setImg(data.product.gallery, 'left')}>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <rect width="24" height="24" fill="black" fillOpacity="0.73" />
                        <path
                          d="M14.25 6.06857L8.625 11.6876L14.25 17.3066"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span onClick={() => this.setImg(data.product.gallery, 'right')}>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <rect
                          width="24"
                          height="24"
                          transform="matrix(-1 0 0 1 24 0)"
                          fill="black"
                          fillOpacity="0.73"
                        />
                        <path
                          d="M9.75 6.06808L15.375 11.6871L9.75 17.3062"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                  <div className="cart-img__quantity">
                    <div
                      className="cart-img__quantity-plus"
                      onClick={() => this.setQuantity('plus')}>
                      <svg
                        width="45"
                        height="45"
                        viewBox="0 0 45 45"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_1_1007)">
                          <path
                            d="M22.5 14.9999V29.9999"
                            stroke="#1D1F22"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M14.9999 22.5H29.9999"
                            stroke="#1D1F22"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <rect x="0.5" y="0.5" width="44" height="44" stroke="#1D1F22" />
                        </g>
                        <defs>
                          <clipPath id="clip0_1_1007">
                            <rect width="45" height="45" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <div
                      className="cart-img__quantity-down"
                      onClick={() => this.setQuantity('minus')}>
                      <svg
                        width="45"
                        height="45"
                        viewBox="0 0 45 45"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M14.9999 22.5H29.9999"
                          stroke="black"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <rect x="0.5" y="0.5" width="44" height="44" stroke="#1D1F22" />
                      </svg>
                    </div>
                    <span>{this.state.quantity}</span>
                  </div>
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
