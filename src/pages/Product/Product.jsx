import React from 'react';

class Product extends React.Component {
  render() {
    const id = window.location.href.split('/')[4];
    console.log(id);
    return <div>Product</div>;
  }
}

export default Product;
