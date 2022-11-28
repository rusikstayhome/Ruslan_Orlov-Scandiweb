import React from 'react';

import Attributes from './Attributes/Attributes';
import Price from './Price/Price';

import { GET_ONE_PRODUCT } from '../../GraphQL/Queries';
import { cartItemsVar } from '../../GraphQL/client/cache';

import { Query } from '@apollo/client/react/components';

import './Product.css';

class Product extends React.Component {
  constructor() {
    super();
    this.state = {
      mainPicture: '',
      attributes: {
        activeAttribute: {},
        color: null,
      },
    };
  }

  setMainImg = (img) => {
    this.setState({
      mainPicture: img,
    });
  };

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

  addItemToCart = (id, price) => {
    const cart = [{ productId: id, attributes: this.state.attributes, price, quantity: 1 }];
    cartItemsVar([...cartItemsVar(), ...cart]);
  };

  render() {
    const id = window.location.href.split('/')[4];

    return (
      <Query variables={{ id: id }} query={GET_ONE_PRODUCT}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading…</p>;
          if (error) return <p>Error :(</p>;

          const price = data.product.prices;

          return (
            <article className="product-page">
              <section>
                {data.product.gallery.slice(0, 4).map((obj, i) => {
                  return (
                    <div
                      key={i}
                      className={`product-img ${
                        obj === this.state.mainPicture ? 'active-product-img' : ''
                      }`}
                      onClick={() => this.setMainImg(obj)}>
                      <img src={obj} alt="product-img" />
                    </div>
                  );
                })}
              </section>
              <section className="main-product-img">
                <img
                  src={this.state.mainPicture || data.product.gallery[0]}
                  alt="main-product-img"
                />
              </section>
              <section>
                <div className="desc-header">
                  <h3>{data.product.brand}</h3>
                  <h2>{data.product.name}</h2>
                </div>
                <div className="product-attributes">
                  <Attributes
                    obj={data.product.attributes}
                    setColor={this.setColor}
                    setActiveAttribute={this.setActiveAttribute}
                    attributes={this.state.attributes}
                  />
                </div>
                <div className="product-price">
                  <h3>Price:</h3>
                  <h2>
                    <Price price={price} />
                  </h2>
                </div>
                <button
                  className="product-addButton"
                  onClick={() => this.addItemToCart(data.product.id, price)}>
                  ADD TO CART
                </button>
                <div
                  className="product-description"
                  dangerouslySetInnerHTML={{ __html: data.product.description }}
                />
              </section>
            </article>
          );
        }}
      </Query>
    );
  }
}

export default Product;
