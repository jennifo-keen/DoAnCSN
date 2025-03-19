import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import "./SearchResults.scss"
const SearchResults_admin = () => {
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const keyword = params.get("keyword");

  const formatPrice = (price) => {
    return price.toLocaleString('vi-VN'); // Định dạng theo kiểu tiền tệ Việt Nam
  };
  useEffect(() => {
    fetch(`http://localhost:5000/api/admin/search?keyword=${keyword}`)
      .then((response) => response.json())
      .then((data) => {
          console.log("Dữ liệu API nhận được trên frontend:", data); // Debug dữ liệu API
          setProducts(data);
      })
      .catch((error) => console.error("Lỗi khi tìm kiếm sản phẩm:", error));
}, [keyword]);


  return (
    <>
    <div>
    </div>
    <div>
      <div className="Sanpham">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.product_id} className="product-card">
              <Link to={`/product/${product.product_id}`}>
                <img src={product.image_url} alt={product.name} />
                <h3>{product.name}</h3>
                <p>Giá: {formatPrice(product.price)} VND</p>
              </Link>
            </div>
          ))
        ) : (
          <p>Không tìm thấy sản phẩm nào.</p>
        )}
      </div>
    </div>
    </>
  );
};

export default SearchResults_admin;
