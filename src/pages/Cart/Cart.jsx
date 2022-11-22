import React from 'react';

import { client } from '../../GraphQL/client/client';
import { GET_CURRENT_CART } from '../../GraphQL/Queries';
import { Query } from '@apollo/client/react/components';

class Cart extends React.Component {
  render() {
    return (
      <Query query={GET_CURRENT_CART}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading…</p>;
          if (error) return <p>Error :(</p>;
          console.log(data);
        }}
      </Query>
    );
  }
}

export default Cart;
