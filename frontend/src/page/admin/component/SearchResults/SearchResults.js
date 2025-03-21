import React, { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import "./SearchResults.scss";

const AdminSearchResults = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const keyword = params.get("keyword");

  const formatPrice = (price) => {
    return price.toLocaleString('vi-VN'); // Định dạng theo kiểu tiền tệ Việt Nam
  };

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/api/search/admin?keyword=${keyword}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Dữ liệu API nhận được trên frontend:", data); // Debug dữ liệu API
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Lỗi khi tìm kiếm sản phẩm:", error);
        setLoading(false);
      });
  }, [keyword]);

  const handleDelete = (productId) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?");
    if (confirmDelete) {
      fetch(`http://localhost:5000/api/products/${productId}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            alert("Sản phẩm đã được xóa!");
            setProducts(products.filter((product) => product.product_id !== productId));
          } else {
            alert("Có lỗi khi xóa sản phẩm.");
          }
        })
        .catch((error) => {
          console.error("Lỗi khi xóa sản phẩm:", error);
          alert("Có lỗi xảy ra khi xóa sản phẩm.");
        });
    }
  };

  const handleEditProduct = (productId) => {
    navigate(`/admin/product/edit/${productId}`);
  };

  return (
    <>
      <div>
        {/* Nút quay lại trang chủ của admin */}
        <button className="back-to-home" onClick={() => navigate('/admin/dashboard')}>
          Quay lại Trang Chủ
        </button>
      </div>
      <div>
        <div className="admin-product-list">
          <h2>Kết quả tìm kiếm cho từ khóa "{keyword}"</h2>
          {loading ? (
            <p>Đang tải...</p>
          ) : products.length > 0 ? (
            products.map((product) => (
              <div key={product.product_id} className="product-card">
                <Link to={`/admin/product/edit/${product.product_id}`}>
                  <img src={product.image_url} alt={product.name} />
                  <h3>{product.name}</h3>
                  <p>Giá: {formatPrice(product.price)} VND</p>
                  <p>Trạng thái: {product.status === "in_stock" ? "Còn hàng" : "Hết hàng"}</p>
                </Link>
                <div className="admin-actions">
                  <button onClick={() => handleDelete(product.product_id)}>Xóa</button>
                  <button onClick={() => handleEditProduct(product.product_id)}>Chỉnh sửa</button>
                </div>
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

export default AdminSearchResults;
