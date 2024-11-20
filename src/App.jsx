import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './CartContext';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Home from './Home';
import Admin from './Admin';
import Customer from './Customer';
import AllCustomers from './AllCustomers';
import Cart from './Cart';
import NewOrder from './NewOrder';
import UserAccount from './UserAccount';
import Login from './Login';
import './index.css';

const App = () => {
  const isLoggedIn = !!localStorage.getItem('user');

  return (
    <Router>
      <CartProvider>
        <div className="app-container">
          <Navbar />
          <div className="main-container">
            <Sidebar />
            <div className="content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/admin" element={isLoggedIn ? <Admin /> : <Navigate to="/login" />} />
                <Route path="/customer" element={isLoggedIn ? <Customer /> : <Navigate to="/login" />} />
                <Route path="/all-customers" element={isLoggedIn ? <AllCustomers /> : <Navigate to="/login" />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/new-order" element={isLoggedIn ? <NewOrder /> : <Navigate to="/login" />} />
                <Route path="/account" element={isLoggedIn ? <UserAccount /> : <Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </div>
          </div>
        </div>
      </CartProvider>
    </Router>
  );
};

export default App;