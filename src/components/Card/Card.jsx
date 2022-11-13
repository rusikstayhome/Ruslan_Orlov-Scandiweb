import React from 'react';

import cartImg from './cart-img.svg';

import './Card.css';

class Card extends React.Component {
  constructor() {
    super();
    this.state = {
      showCartImg: false,
    };
  }

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

  render() {
    return (
      <div
        className={`card ${this.props.inStock ? 'out-of-stock' : ''}`}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}>
        <div className="card-img">
          <img src={this.props.gallery[0]} alt={this.props.name} />
        </div>
        <div className={`cart-img ${!this.state.showCartImg ? 'hide' : ''}`}>
          {!this.props.inStock ? <img src={cartImg} alt="cart-button" /> : ''}
        </div>
        <p>{this.props.name}</p>
        <p>
          <span>{`${this.props.prices[0].currency.symbol}${this.props.prices[0].amount}`}</span>
        </p>
      </div>
    );
  }
}

export default Card;
