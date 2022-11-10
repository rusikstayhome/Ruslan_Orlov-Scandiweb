import React from 'react';

import Home from './pages/Home/Home'
import Header from './components/Header/Header';

import './App.css';


class App extends React.Component {
  render() {
    return (
      <div className="container" >
        <Header />
        <Home />
      </div>
    )
  }
}

export default App;
