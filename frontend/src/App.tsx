import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate  } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductCatalogPage from './pages/ProductCatalog'; 
import CartPage from './pages/CartPage'; 
import Dashboard from './pages/Dashboard'; 
import LandPage from './pages/LandPage'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/land-page" replace />} />
        <Route path="/land-page" element={<LandPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/product-page" element={<ProductCatalogPage />} />
        <Route path="/cart-page" element={<CartPage />} />
      </Routes>
    </Router>
  );
}

export default App;
