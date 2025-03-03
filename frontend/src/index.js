import React from 'react';
import ReactDOM from 'react-dom/client';  
import { BrowserRouter } from 'react-router-dom';
import RouterCustom from './router';
import { CartProvider } from './utils/CartContext';
import { AuthProvider } from './utils/AuthContext'; // Đảm bảo đường dẫn đúng
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
