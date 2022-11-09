import React from 'react';

import Header from '../../components/Header/Header';
import Tabs from '../../components/Tabs/Tabs';

import axios from 'axios'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      categories: [],
    }
  }

  componentDidMount() {
    axios.post('http://localhost:4000/', {
      query: `
  query {
    categories {
      name
    }
  }
  `
    }).then(res => {
      const categories = res.data.data.categories;
      this.setState({ categories })
    })
  }

  render() {
    return (
      <div className="container" >
        <Header />
        <div className='tabs-container'>
          {this.state.categories.map((obj, i) => (
            <Tabs name={obj} key={i} />
          ))}
        </div>
      </div>
    )
  }
}

export default App;
