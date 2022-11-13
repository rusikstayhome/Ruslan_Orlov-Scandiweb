import React from 'react';

import { GET_ONE_PRODUCT } from '../../GraphQL/Queries';
import { Query } from '@apollo/client/react/components';

class Product extends React.Component {
  render() {
    const id = window.location.href.split('/')[4];
    console.log(id);
    return (
      <Query variables={{ id: id }} query={GET_ONE_PRODUCT}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading…</p>;
          if (error) return <p>Error :(</p>;
          console.log(data);
          return <h1>lol</h1>;
        }}
      </Query>
      //   <div>{id}</div>
    );
  }
}

export default Product;
