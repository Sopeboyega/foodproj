import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Footer from './components/Footer/Footer';
import LoginPopup from './components/LoginPopup/LoginPopup';
import Verify from './pages/Verify/Verify';
import MyOrders from './pages/MyOrders/MyOrders';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : null}
      <Router> {/* Wrap everything in HashRouter */}
        <div className='app'>
          <Navbar setShowLogin={setShowLogin} />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/PlaceOrder' element={<PlaceOrder />} />
            <Route path='/verify' element={<Verify />} />
            <Route path='/MyOrders' element={<MyOrders />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </>
  );
};

export default App;
