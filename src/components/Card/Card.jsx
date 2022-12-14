import React from 'react';

import { Link } from 'react-router-dom';
import cartImg from './cart-img.svg';
import Price from '../Price/Price';

import { cartItemsVar } from '../../GraphQL/client/cache';

import './Card.css';

class Card extends React.Component {
  state = {
    showCartImg: false,
    attributes: {
      activeAttribute: {},
      color: null,
    },
  };

  onMouseEnter = () => {
    setTimeout(() => {
      this.setState({
        showCartImg: true,
      });
    }, 20);
  };

  onMouseLeave = () => {
    setTimeout(() => {
      this.setState({
        showCartImg: false,
      });
    }, 20);
  };

  addItemToCart = (id) => {
    const price = this.props.prices;
    const cart = [{ productId: id, attributes: this.state.attributes, price, quantity: 1 }];
    cartItemsVar([...cartItemsVar(), ...cart]);
  };

  render() {
    return (
      <>
        <div
          className={`card ${!this.props.inStock ? 'out-of-stock' : ''}`}
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}>
          <Link to={this.props.inStock ? `/product/${this.props.id}` : '/'}>
            <div className="card-img">
              <img src={this.props.gallery[0]} alt={this.props.name} />
            </div>
          </Link>
          <div
            onClick={() => this.addItemToCart(this.props.id)}
            className={`cart-img ${!this.state.showCartImg ? 'hide' : ''}`}>
            {this.props.inStock ? <img src={cartImg} alt="cart-button" /> : ''}
          </div>
          <Link to={this.props.inStock ? `/product/${this.props.id}` : '/'}>
            <p>{this.props.name}</p>
            <p>
              <span>
                <Price price={this.props.prices} />
              </span>
            </p>
          </Link>
        </div>
      </>
    );
  }
}

export default Card;
