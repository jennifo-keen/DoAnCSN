import React, { useState, useEffect } from 'react';
import "./style.scss";

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Gọi API để lấy danh sách sản phẩm
    fetch('http://localhost:5000/api/products')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Lỗi khi lấy sản phẩm:', error));
  }, []);

  return (
    <div className="products">
      {products.length > 0 ? (
        products.map((product) => (
          <div key={product.product_id} className="product-card">
            <img src={product.image_url} alt={product.name} />
            <h3>{product.name}</h3>
            <p>Giá: {product.price} VND</p>
          </div>
        ))
      ) : (
        <p>Không có sản phẩm nào để hiển thị</p>
      )}
    </div>
  );
}

export default ProductList;
