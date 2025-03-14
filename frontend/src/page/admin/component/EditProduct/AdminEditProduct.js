import React, { useState } from "react";
import "./AdminEditProduct.scss";

const AdminEditProduct = ({ product, onClose, onSave }) => {
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [productType, setProductType] = useState(product.product_type);
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedProduct = {
      id: product.id,
      name,
      price,
      product_type: productType,
    };

    // Kiểm tra nếu có thay đổi ảnh
    if (image) {
      const formData = new FormData();
      formData.append('image', image);
      formData.append('name', name);
      formData.append('price', price);
      formData.append('product_type', productType);

      try {
        const response = await fetch(`http://localhost:5000/api/products/${product.id}`, {
          method: 'PUT',
          body: formData,
        });
        const result = await response.json();
        if (result.success) {
          onSave(updatedProduct); // Cập nhật sản phẩm sau khi gửi yêu cầu
          onClose();
        }
      } catch (error) {
        console.error("Lỗi khi gửi yêu cầu cập nhật sản phẩm:", error);
      }
    } else {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${product.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedProduct),
        });
        const result = await response.json();
        if (result.success) {
          onSave(updatedProduct); // Cập nhật sản phẩm sau khi gửi yêu cầu
          onClose();
        }
      } catch (error) {
        console.error("Lỗi khi gửi yêu cầu cập nhật sản phẩm:", error);
      }
    }
  };

  return (
    <div className="edit-product-container">
      <form onSubmit={handleSubmit}>
        <h2>Sửa sản phẩm</h2>
        <input
          type="text"
          placeholder="Tên sản phẩm"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Giá"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="text"
          placeholder="Loại sản phẩm"
          value={productType}
          onChange={(e) => setProductType(e.target.value)}
        />
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />

        <button type="submit">Cập nhật</button>
        <button className="close-btn" onClick={onClose}>
          Đóng
        </button>
      </form>
    </div>
  );
};

export default AdminEditProduct;
