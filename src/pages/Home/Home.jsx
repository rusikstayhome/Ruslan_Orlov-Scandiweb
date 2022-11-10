import React from 'react';

import Card from '../../components/Card/Card';

import {getAllProducts} from '../../GraphQL/Queries'
import { Query } from '@apollo/client/react/components';
import './Home.css'


class App extends React.Component {
  constructor() {
    super()
    this.state = {
      categories: [],
    }
  }

  render() {
    return (
      <div className="container" >
        <div className='tabs-container'>
         <div className='tabs'>All</div>
         <div className='tabs'>Clothes</div>
         <div className='tabs'>Tech</div>
        </div>
        <Query query={getAllProducts} >
          {({ loading, error, data }) => {
            console.log(data)
          if (loading) return <p>Loading…</p>;
          if (error) return <p>Error :(</p>;
          return data.category.products?.map(({ name, prices, inStock, gallery }) => (
            <Card 
            name={name}
            prices={prices}
            inStock={inStock}
            gallery={gallery}
            />

            // <div key={name}>
            //   <p>{`${name}`}</p>
            // </div>
            ));  
          }}
        </Query>
      </div>
      
    )
  }
}

export default App;
