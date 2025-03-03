import React, { memo, useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Menu from "../../../componet/menu/menu";
import "./style.scss";
import Design from "../../../componet/desgin/desgin";
import { CartContext } from "../../../utils/CartContext";
import { AuthContext } from "../../../utils/AuthContext";
const SanPham = () => {
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext); // Lấy thông tin user
  const navigate = useNavigate();
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${productId}`)
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) => console.error("Lỗi khi lấy chi tiết sản phẩm:", error));
  }, [productId]);

  const handleAddToCart = () => {
    if (!user) {
      navigate("/login"); // Chưa đăng nhập thì chuyển hướng
      return;
    }

    addToCart(product);
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
  };

  const handleBuyNow = () => {
    if (!user) {
      navigate("/login"); // Chưa đăng nhập thì chuyển hướng
      return;
    }

    alert("Chuyển sang trang thanh toán...");
  };

  if (!product) {
    return <p>Đang tải dữ liệu sản phẩm...</p>;
  }

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
          <p className="price">{product.price} đ</p>
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
                <strong>Số lượng còn lại:</strong> {product.stock_quantity	}
              </div>
          </div>
          <button className="consult-button" onClick={handleAddToCart}>Thêm vào giỏ hàng</button>
          <button className="muangay" onClick={handleBuyNow}>Mua ngay</button>
        </div>
      </div>

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
