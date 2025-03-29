import React, { useState, useEffect } from "react";
import "./AdminEditProduct.scss";

const AdminEditProduct = ({ product, onClose, onSave }) => {
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [productType, setProductType] = useState(product.product_type);
  const [imageUrl, setImageUrl] = useState(product.imageUrl || "");
  const [stock_quantity, setStockQuantity] = useState(product.stock_quantity || 0);
  const [description,setdescription]= useState (product.description||0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setName(product.name);
    setPrice(product.price);
    setProductType(product.product_type);
    setImageUrl(product.imageUrl || "");
    setStockQuantity(product.stock_quantity || 0);
    setdescription(product.description||0);
  }, [product]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const updatedProduct = {
      product_id: product.product_id,
      name,
      price,
      category_id: productType,
      image_url: imageUrl,
      stock_quantity,
      description,
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
        alert("Thông báo: " + result.message);
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật sản phẩm:", error);
      alert("Có lỗi xảy ra khi cập nhật sản phẩm.");
      setLoading(false);
    }
  };

  return (
    <div className="aep-modal-overlay">
      <form className="aep-form" onSubmit={handleSubmit}>
        <h2 className="aep-title">Sửa sản phẩm</h2>

        <div className="aep-input-group">
          <input
            type="text"
            placeholder="Tên sản phẩm"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="aep-input-group">
          <input
            type="number"
            placeholder="Giá"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="aep-input-group">
          <input
            type="text"
            placeholder="Loại sản phẩm"
            value={productType}
            onChange={(e) => setProductType(e.target.value)}
            required
          />
        </div>
        <div className="aep-input-group">
          <input
            type="number"
            placeholder="Số lượng sản phẩm"
            value={stock_quantity}
            onChange={(e) => setStockQuantity(e.target.value)}
            required
          />
        </div>
        <div className="aep-input-group">
          <input
            type="text"
            placeholder="Mô tả sản phẩm"
            value={description}
            onChange={(e) => setdescription(e.target.value)}
            required
          />
        </div>
        <div className="aep-input-group">
          <input
            type="text"
            placeholder="URL ảnh sản phẩm"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>

        <div className="aep-button-group">
          <button type="submit" className="aep-submit-btn" disabled={loading}>
            {loading ? "Đang cập nhật..." : "Cập nhật"}
          </button>
          <button type="button" className="aep-cancel-btn" onClick={onClose}>
            Đóng
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminEditProduct;