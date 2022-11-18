import React from 'react';

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

    return (
      <Query variables={{ id: id }} query={GET_ONE_PRODUCT}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading…</p>;
          if (error) return <p>Error :(</p>;
          console.log(data.product.attributes);
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
                  {data.product.attributes.map((obj) => (
                    <Attributes obj={obj} />
                  ))}
                </div>
              </section>
            </article>
          );
        }}
      </Query>
    );
  }
}

export default Product;
