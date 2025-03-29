import React from 'react';
import ReactDOM from 'react-dom/client';  
import { BrowserRouter } from 'react-router-dom';
import RouterCustom from './router';
import { CartProvider } from './page/user/contexts/CartContext';
import { AuthProvider } from './page/user/contexts/login-registerContext';
import './style/style.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <AuthProvider> {/* Đặt AuthProvider bên ngoài */}
    <CartProvider> {/* CartProvider bên trong để lấy dữ liệu từ AuthContext */}
      <BrowserRouter>
        <RouterCustom />
      </BrowserRouter>
    </CartProvider>
  </AuthProvider>
);
