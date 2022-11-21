import React from 'react';

import { Route, Routes } from "react-router-dom";

import Header from './components/Header/Header';
import Home from './pages/Home/Home'
import Product from './pages/Product/Product';

import './App.css';


class App extends React.Component {
  render() {
    return (
      <div className="container" >
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<Product />} />
        </Routes>
      </div>
    )
  }
}

export default App;
