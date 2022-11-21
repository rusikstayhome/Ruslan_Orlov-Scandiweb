import React from 'react';

import Card from '../../components/Card/Card';

import { getAllProducts } from '../../GraphQL/Queries';
import { Link } from 'react-router-dom';
import { Query } from '@apollo/client/react/components';
import './Home.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      tabValue: 'all',
    };
  }

  setTabValueAll = () => {
    this.setState({
      tabValue: 'all',
    });
  };
  setTabValueClothes = () => {
    this.setState({
      tabValue: 'clothes',
    });
  };
  setTabValueTech = () => {
    this.setState({
      tabValue: 'tech',
    });
  };

  render() {
    let category = this.state.tabValue;
    return (
      <div className="container">
        <div className="tabs-container">
          <div
            className={`tabs ${this.state.tabValue === 'all' ? 'tab-active' : ''}`}
            onClick={this.setTabValueAll}>
            All
          </div>
          <div
            className={`tabs ${this.state.tabValue === 'clothes' ? 'tab-active' : ''}`}
            onClick={this.setTabValueClothes}>
            Clothes
          </div>
          <div
            className={`tabs ${this.state.tabValue === 'tech' ? 'tab-active' : ''}`}
            onClick={this.setTabValueTech}>
            Tech
          </div>
        </div>
        <div className="cards-container">
          <Query query={getAllProducts}>
            {({ loading, error, data }) => {
              if (loading) return <p>Loading…</p>;
              if (error) return <p>Error :(</p>;
              return data.category.products
                .filter((obj) => (category === 'all' ? obj : obj.category === category))
                .map(({ name, prices, inStock, gallery, id }) => (
                  <Link to={inStock ? `/product/${id}` : '/'}>
                    <Card name={name} prices={prices} inStock={inStock} gallery={gallery} />
                  </Link>
                ));
            }}
          </Query>
        </div>
      </div>
    );
  }
}

export default App;
