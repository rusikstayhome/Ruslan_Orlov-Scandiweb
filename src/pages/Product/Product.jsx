import React from 'react';

import Attributes from './Attributes/Attributes';

import { client } from '../../GraphQL/client/client';
import { GET_ONE_PRODUCT, GET_CURRENT_CURRENCY } from '../../GraphQL/Queries';
import { Query } from '@apollo/client/react/components';

import './Product.css';

class Product extends React.Component {
  constructor() {
    super();
    this.state = {
      mainPicture: '',
      currentCurrency: client.cache.data.data.ROOT_QUERY?.currency || 'USD',
    };
  }

  setMainImg = (img) => {
    this.setState({
      mainPicture: img,
    });
  };

  render() {
    // client
    //   .query({
    //     query: GET_CURRENT_CURRENCY,
    //   })
    //   .then((res) =>
    //     this.setState({
    //       currentCurrency: res.data.currency || 'USD',
    //     }),
    //   );
    console.log(client.cache.data.data.ROOT_QUERY?.currency);
    const id = window.location.href.split('/')[4];
    const label = this.state.currentCurrency;
    console.log(label);

    return (
      <Query variables={{ id: id }} query={GET_ONE_PRODUCT}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading…</p>;
          if (error) return <p>Error :(</p>;

          const price = data.product.prices.filter((price) => price.currency.label === label);

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
