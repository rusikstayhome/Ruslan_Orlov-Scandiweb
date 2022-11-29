import React from 'react';

class CartImg extends React.Component {
  render() {
    const data = this.props.data;
    return (
      <>
        <img src={data.product.gallery[this.props.mainPicture]} alt="main-cart-img" />
        <div className="cart-img__arrows">
          <span
            className="left-arrow"
            onClick={() => this.props.setImg(data.product.gallery, 'left')}>
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
          <span onClick={() => this.props.setImg(data.product.gallery, 'right')}>
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
          <div className="cart-img__quantity-plus" onClick={() => this.props.setQuantity('plus')}>
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
          <div className="cart-img__quantity-down" onClick={() => this.props.setQuantity('minus')}>
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
          <span>{this.props.quantity}</span>
        </div>
      </>
    );
  }
}

export default CartImg;
