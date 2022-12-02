import React from 'react';

import { Route, Routes } from "react-router-dom";

import Header from './components/Header/Header';
import Home from './pages/Home/Home'
import Product from './pages/Product/Product';
import Cart from './pages/Cart/Cart';

import './App.css';


class App extends React.Component {
  render() {
    return (
      <div className="container" >
        <Header />
        <div className="content-wrapper">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
      </div>
    )
  }
}

export default App;
