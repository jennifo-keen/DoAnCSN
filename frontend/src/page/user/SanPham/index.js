import React, { memo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Menu from "../../../componet/menu/menu";
import "./style.scss";

const SanPham = () => {
  const { productId } = useParams(); // Lấy ID sản phẩm từ URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Gọi API để lấy thông tin chi tiết sản phẩm
    fetch(`http://localhost:5000/api/products/${productId}`)
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) => console.error("Lỗi khi lấy chi tiết sản phẩm:", error));
  }, [productId]);

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
          <ul>
            <li>
              <strong>Mã sản phẩm:</strong> {product.product_id}
            </li>
            <li>
              <strong>Kích cỡ:</strong> {product.size}
            </li>
            <li>
              <strong>Màu Kim Loại:</strong> {product.metal_color}
            </li>
            <li>
              <strong>Chất liệu:</strong> {product.material}
            </li>
          </ul>
          <button className="consult-button">Thêm vô giỏ hàng</button>
          <button className="muangay">Mua ngay</button>
          <div className="thong-tin">
            <p className="note">
              (*) Quý khác vui lòng đọc kĩ hướng dẫn sử dụng trước khi sử dụng
              kim cương hột xoàn nhé !!!
            </p>
            <p className="hotline">📞 gọi điện liền để mua hàng nào</p>
          </div>
        </div>
      </div>
      <div className="chutich">
        <p>{product.description}</p>
      </div>
      <div className="home">
        <a href="/">
          <h2>Về trang chủ</h2>
        </a>
      </div>
    </>
  );
};

export default memo(SanPham);
