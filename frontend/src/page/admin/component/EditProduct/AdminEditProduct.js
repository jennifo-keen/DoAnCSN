import React, { useState, useEffect } from "react";
import "./AdminEditProduct.scss";

const AdminEditProduct = ({ product, onClose, onSave }) => {
  // Khởi tạo state từ product prop
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [productType, setProductType] = useState(product.product_type);
  const [imageUrl, setImageUrl] = useState(product.imageUrl || ""); // Giả sử product có trường imageUrl
  const [stock_quantity, setStockQuantity] = useState(product.stock_quantity || 0); // Giả sử product có trường stock_quantity
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Khi sản phẩm thay đổi, cập nhật lại state để hiển thị thông tin mới
    setName(product.name);
    setPrice(product.price);
    setProductType(product.product_type);
    setImageUrl(product.imageUrl || "");
    setStockQuantity(product.stock_quantity || 0);
  }, [product]); // Chạy lại khi product thay đổi

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const updatedProduct = {
      product_id: product.product_id,
      name,
      price,
      category_id: productType,
      image_url: imageUrl, // Thêm URL ảnh ở đây
      stock_quantity, // Thêm stock_quantity ở đây
    };

    try {
      const response = await fetch(`http://localhost:5000/api/products/${product.product_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct),
      });

      const result = await response.json();
      setLoading(false);

      if (result.success) {
        alert("Cập nhật sản phẩm thành công!");
        onSave(updatedProduct);
        onClose();
      } else {
        alert("Lỗi cập nhật: " + result.message);
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật sản phẩm:", error);
      alert("Có lỗi xảy ra khi cập nhật sản phẩm.");
      setLoading(false);
    }
  };

  return (
    <div className="edit-product-container">
      <form onSubmit={handleSubmit}>
        <h2>Sửa sản phẩm</h2>

        <div className="input-container">
          <input
            type="text"
            placeholder="Tên sản phẩm"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="input-container">
          <input
            type="number"
            placeholder="Giá"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="input-container">
          <input
            type="text"
            placeholder="Loại sản phẩm"
            value={productType}
            onChange={(e) => setProductType(e.target.value)}
            required
          />
        </div>
        <div className="input-container">
          <input
            type="number"
            placeholder="Số lượng sản phẩm"
            value={stock_quantity}
            onChange={(e) => setStockQuantity(e.target.value)}
            required
          />
        </div>
        <div className="input-container">
          <input
            type="text"
            placeholder="URL ảnh sản phẩm"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Đang cập nhật..." : "Cập nhật"}
        </button>
        <button type="button" className="close-btn" onClick={onClose}>
          Đóng
        </button>
      </form>
    </div>
  );
};

export default AdminEditProduct;
