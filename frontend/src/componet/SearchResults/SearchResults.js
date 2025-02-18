import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const SearchResults = () => {
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const keyword = params.get("keyword");

  useEffect(() => {
    fetch(`http://localhost:5000/api/search?keyword=${keyword}`)
      .then((response) => response.json())
      .then((data) => {
          console.log("Dữ liệu API nhận được trên frontend:", data); // Debug dữ liệu API
          setProducts(data);
      })
      .catch((error) => console.error("Lỗi khi tìm kiếm sản phẩm:", error));
}, [keyword]);


  return (
    <div>
      <div className="products">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.product_id} className="product-card">
              <Link to={`/product/${product.product_id}`}>
                <img src={product.image_url} alt={product.name} />
                <h3>{product.name}</h3>
                <p>Giá: {product.price} VND</p>
              </Link>
            </div>
          ))
        ) : (
          <p>Không tìm thấy sản phẩm nào.</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
