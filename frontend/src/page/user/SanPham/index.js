import React, { memo, useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Menu from "../componet/menu/menu";  // Đảm bảo đúng đường dẫn
import "./Sanpham.scss";
import Design from "../componet/desgin/desgin";  // Đảm bảo đúng đường dẫn
import { CartContext } from "../contexts/CartContext";
import { AuthContext } from "../contexts/login-registerContext";

const SanPham = () => {
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext); // Lấy thông tin user
  const navigate = useNavigate();
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  // Lấy thông tin chi tiết sản phẩm từ backend
  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${productId}`)
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) => console.error("Lỗi khi lấy chi tiết sản phẩm:", error));
  }, [productId]);

  // Thêm sản phẩm vào giỏ hàng
  const handleAddToCart = () => {
    if (!user) {
      navigate("/login"); // Nếu chưa đăng nhập thì chuyển hướng đến trang đăng nhập
      return;
    }

    addToCart(product); // Gọi hàm thêm vào giỏ hàng từ context
    setShowPopup(true); // Hiển thị thông báo đã thêm vào giỏ hàng
    setTimeout(() => {
      setShowPopup(false); // Ẩn thông báo sau 2 giây
    }, 2000);
  };

  // Mua ngay
  const handleBuyNow = () => {
    if (!user) {
      navigate("/login"); // Chưa đăng nhập thì chuyển hướng đến trang đăng nhập
      return;
    }

    alert("Chuyển sang trang thanh toán..."); // Bạn có thể thay thế bằng hành động chuyển hướng tới trang thanh toán
  };

  // Nếu chưa có sản phẩm, hiển thị thông báo
  if (!product) {
    return <p>Đang tải dữ liệu sản phẩm...</p>;
  }

  // Hàm để format giá với dấu phân cách
  const formatPrice = (price) => {
    return price.toLocaleString("vi-VN"); // Định dạng giá trị theo kiểu tiền tệ Việt Nam
  };

  return (
    <>
      <Menu />
      <div className="product-container">
        <div className="image-gallery">
          <div className="main-image">
            <img src={product.image_url} alt={product.name} />
          </div>
        </div>
        <div className="product-details">
          <h1>{product.name}</h1>
          <p className="price">{formatPrice(product.price)} đ</p>

          {/* Thông tin sản phẩm */}
          <div className="thongtin">
            <div className="tt">
              <strong>Mã sản phẩm:</strong>
              <p>{product.product_id}</p>
            </div>
            <div className="tt">
              <strong>Kích cỡ:</strong> {product.weight}
            </div>
            <div className="tt">
              <strong>Màu Kim Loại:</strong> {product.color}
            </div>
            <div className="tt">
              <strong>Chất liệu:</strong> {product.material}
            </div>
            <div className="tt">
              <strong>Số lượng còn lại:</strong> {product.stock_quantity}
            </div>
          </div>

          {/* Nút thêm vào giỏ hàng và mua ngay */}
          <button className="consult-button" onClick={handleAddToCart}>
            Thêm vào giỏ hàng
          </button>
          <button className="muangay" onClick={handleBuyNow}>
            Mua ngay
          </button>

          {/* Mô tả sản phẩm */}
          <div className="thong-tin">
            <p className="note">{product.description}</p>
          </div>
        </div>
      </div>

      {/* Popup thông báo đã thêm vào giỏ hàng */}
      {showPopup && (
        <div className="popup">
          <p>✅ Đã thêm vào giỏ hàng</p>
        </div>
      )}

      <div className="home">
        <a href="/">
          <h2>Về trang chủ</h2>
        </a>
      </div>
      <Design />
    </>
  );
};

export default memo(SanPham);
