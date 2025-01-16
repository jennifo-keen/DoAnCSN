import React, { memo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Menu from "../../../componet/menu/menu";
import "./style.scss";
import Design from "../../../componet/desgin/desgin";

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
            <img src={product.image_url} alt= {product.name} />
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
          <hr/>
          <button className="consult-button">Thêm vô giỏ hàng</button>
          <button className="muangay">Mua ngay</button>
          <div className="thong-tin">
            <p className="note">
              {product.description}
            </p>
            <hr/>
            <p className="hotline">Quý khách vui lòng đọc kỹ hướng dẫn sử dụng trước khi sử dụng nhẫn </p>
            <p className="hotline">Liên hệ đến số điện thoại xxxxxxx để được tư vấn</p>
          </div>
        </div>
      </div>
      <div className="home">
        <a href="/">
          <h2>Về trang chủ</h2>
        </a>
      </div>
      <Design/>
    </>
  );
};

export default memo(SanPham);
