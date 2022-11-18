import React from 'react';
import { htmlToText } from 'html-to-text';

import Attributes from './Attributes/Attributes';

import { GET_ONE_PRODUCT } from '../../GraphQL/Queries';
import { Query } from '@apollo/client/react/components';

import './Product.css';

class Product extends React.Component {
  constructor() {
    super();
    this.state = {
      mainPicture: '',
    };
  }

  setMainImg = (img) => {
    this.setState({
      mainPicture: img,
    });
  };

  render() {
    const id = window.location.href.split('/')[4];
    const lable = window.localStorage.getItem('currency');
    console.log(lable);

    return (
      <Query variables={{ id: id }} query={GET_ONE_PRODUCT}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading…</p>;
          if (error) return <p>Error :(</p>;
          const price = data.product.prices.filter((price) => price.currency.label === lable);
          console.log(price[0].amount);
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
                  <Attributes obj={data.product.attributes} />
                </div>
                <div className="product-price">
                  <h3>Price:</h3>
                  <h2>{`${price[0].currency.symbol}${price[0].amount}`}</h2>
                </div>
                <button className="product-addButton">ADD TO CART</button>
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
