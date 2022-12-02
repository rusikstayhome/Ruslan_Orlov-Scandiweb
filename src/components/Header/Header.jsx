import React from 'react';

import { Link } from 'react-router-dom';

import CurrenciesOverlay from './CurrenciesOverlay/CurrenciesOverlay';
import CartItemsQuantity from './CartItemsQuantity/CartItemsQuantity';
import CartOverlay from '../CartOverlay/CartOverlay';

import logo from './logo.svg';
import cart from './empty-cart.svg';
import './Header.css';

class Header extends React.Component {
  state = {
    showCurrenciesOverlay: false,
    showCartOverLay: false,
  };

  onClickShowCurrenciesOverlay = () => {
    this.setState({
      showCurrenciesOverlay: !this.state.showCurrenciesOverlay,
    });
  };

  onMouseEnter = () => {
    setTimeout(() => {
      this.setState({
        showCartOverLay: true,
      });
    }, 20);
  };

  onMouseLeave = () => {
    setTimeout(() => {
      this.setState({
        showCartOverLay: false,
      });
    }, 20);
  };

  render() {
    return (
      <>
        <header>
          <nav>
            <ul className="header-nav">
              <li>Women</li>
              <li>Men</li>
              <li>Kids</li>
            </ul>
          </nav>
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>
          <ul className="header-actions">
            <li onClick={this.onClickShowCurrenciesOverlay}>
              $
              {this.state.showCurrenciesOverlay ? (
                <span className="header-actions__upside">
                  <svg
                    width="8"
                    height="4"
                    viewBox="0 0 8 4"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M1 3.5L4 0.5L7 3.5"
                      stroke="black"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              ) : (
                <span className="header-actions__downside">
                  <svg
                    width="8"
                    height="4"
                    viewBox="0 0 8 4"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M1 0.5L4 3.5L7 0.5"
                      stroke="black"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              )}
            </li>
            <li className="cart-quantity__wrapper" onMouseEnter={this.onMouseEnter}>
              <Link to="/cart">
                <img src={cart} alt="cart-iocn" onClick={this.onMouseLeave} />
                <CartItemsQuantity />
              </Link>
            </li>
          </ul>
          <div className="currencies-overlay">
            <CurrenciesOverlay
              show={this.state.showCurrenciesOverlay}
              closeCurrenCiesOverlay={this.onClickShowCurrenciesOverlay}
            />
          </div>
        </header>
        {this.state.showCartOverLay && <CartOverlay onMouseLeave={this.onMouseLeave} />}
      </>
    );
  }
}

export default Header;
