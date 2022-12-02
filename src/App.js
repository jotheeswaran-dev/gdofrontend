import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import Profile from './components/Profile/Profile';
import Wishlist from './components/Wishlist/Wishlist';
import Cart from './components/Cart/Cart';
import Orders from './components/Orders/Orders';
import OrderSummary from './components/OrderSummary/OrderSummary';
import Footer from './components/Footer/Footer';

import './App.css';

function App() {

  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<SignUp />}></Route>
        <Route path='/profile' element={<Profile />}></Route>
        <Route path='/wishlist' element={<Wishlist />}></Route>
        <Route path='/cart' element={<Cart />}></Route>
        <Route path='/orders' element={<Orders />}></Route>
        <Route path='/checkout' element={<OrderSummary />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
