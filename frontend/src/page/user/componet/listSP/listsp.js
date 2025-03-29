import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./listsp.scss";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  // Hàm để format giá với dấu phân cách
  const formatPrice = (price) => {
    return price.toLocaleString('vi-VN'); // Định dạng theo kiểu tiền tệ Việt Nam
  };

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Lỗi khi lấy sản phẩm:", error));
  }, []);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);

  const getVisiblePages = () => {
    const visiblePages = [];
    if (currentPage > 1) visiblePages.push(currentPage - 1);
    visiblePages.push(currentPage);
    if (currentPage < totalPages) visiblePages.push(currentPage + 1);
    return visiblePages;
  };

  return (
    <div>
      <div className="products">
        {currentProducts.length > 0 ? (
          <>
            {currentProducts.map((product) => (
              <div key={product.product_id} className="product-card">
                <Link to={`/product/${product.product_id}`}>
                  <img src={product.image_url} alt={product.name} />
                  <h3>{product.name}</h3>
                  <p>Giá: {formatPrice(product.price)} VND</p> {/* Hiển thị giá với dấu phân cách */}
                </Link>
              </div>
            ))}
          </>
        ) : (
          <p>Không có sản phẩm nào để hiển thị</p>
        )}
      </div>
      <div className="Pagination">
        {currentPage > 1 && (
          <button
            className="page-button"
            onClick={() => setCurrentPage(1)}
          >
            Trang đầu
          </button>
        )}
        {getVisiblePages().map((number) => (
          <button
            key={number}
            className={`page-button ${number === currentPage ? "active" : ""}`}
            onClick={() => setCurrentPage(number)}
          >
            {number}
          </button>
        ))}
        {currentPage < totalPages && (
          <button
            className="page-button"
            onClick={() => setCurrentPage(totalPages)}
          >
            Trang cuối
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductList;
