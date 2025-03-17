import React, { useState } from "react";
import "./AdminEditProduct.scss";

const AdminEditProduct = ({ product, onClose, onSave }) => {
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [productType, setProductType] = useState(product.product_type);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const updatedProduct = {
      product_id: product.product_id,
      name,
      price,
      category_id : productType,
    };

    try {
      let response;
      if (image) {
        const formData = new FormData();
        formData.append("image", image);
        formData.append("name", name);
        formData.append("price", price);
        formData.append("category_id", productType);

        response = await fetch(`http://localhost:5000/api/products/${product.product_id}`, {
          method: "PUT",
          body: formData,
        });
      } else {
        response = await fetch(`http://localhost:5000/api/products/${product.product_id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedProduct),
        });
      }

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
        <input type="text" placeholder="Tên sản phẩm" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="number" placeholder="Giá" value={price} onChange={(e) => setPrice(e.target.value)} required />
        <input type="text" placeholder="Loại sản phẩm" value={productType} onChange={(e) => setProductType(e.target.value)} required />
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />

        <button type="submit" disabled={loading}>{loading ? "Đang cập nhật..." : "Cập nhật"}</button>
        <button type="button" className="close-btn" onClick={onClose}>
          Đóng
        </button>
      </form>
    </div>
  );
};

export default AdminEditProduct;
