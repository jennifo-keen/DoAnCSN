import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.scss";
import AdminEditProduct from "../component/EditProduct/AdminEditProduct";

const AdminProductList = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddForm, setShowAddForm] = useState(false);
  const perPage = 6;

  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock_quantity: "",
    category_id: "",
    image_url: "",
  });
  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      // Điều hướng đến API tìm kiếm dành cho admin
      navigate(`/search/admin?keyword=${encodeURIComponent(keyword)}`);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Lỗi khi lấy sản phẩm:", err));
  };

  const totalPages = Math.ceil(products.length / perPage);
  const start = (currentPage - 1) * perPage;
  const displayedProducts = products.slice(start, start + perPage);

  const handleDeleteProduct = async (productId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      try {
        const res = await fetch(`http://localhost:5000/api/products/${productId}`, {
          method: "DELETE",
        });
        const data = await res.json();
        alert(data.message);
        fetchProducts();
      } catch (error) {
        console.error("Lỗi khi xóa sản phẩm:", error);
      }
    }
  };

  const handleEditProduct = (product) => {
    setEditProduct(product);
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });
      const data = await res.json();
      alert(data.message);
      fetchProducts();
      setNewProduct({ name: "", description: "", price: "", stock_quantity: "", category_id: "", image_url: "" });
      setShowAddForm(false);
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm:", error);
    }
  };

  return (
    <div className="apl-container">
      <div className="apl-menu">
        <div className="apl-logo">Admin Dashboard</div>
        <a href="/admin" className="apl-menu-item apl-active">
          <span className="apl-icon">📦</span> Danh sách sản phẩm
        </a>
        <a href="/admin/orderlist" className="apl-menu-item">
          <span className="apl-icon">🛒</span> Thống kê đơn hàng
        </a>
        <a href="/doimk" className="apl-menu-item apl-logout">
          <span className="apl-icon">✏️</span> Đổi mật khẩu
        </a>
      </div>

      <div className="apl-content">
        <div className="apl-header">
          <h2>Danh Sách Sản Phẩm</h2>
        </div>

        <div className="apl-search-bar">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Tìm kiếm sản phẩm..."
            />
            <button className="apl-filter-btn">🔍 Bộ lọc</button>
          </form>
        </div>

        <div className="apl-stats">
          <span>Chúng tôi tìm thấy {products.length} sản phẩm</span>
        </div>

        <button className="apl-add-product-btn" onClick={() => setShowAddForm(true)}>
          + Thêm Sản Phẩm Mới
        </button>

        {showAddForm && (
          <div className="apl-modal-overlay">
            <div className="apl-add-product-form">
              <h3>Thêm Sản Phẩm Mới</h3>
              <form onSubmit={handleAddProduct}>
                <input
                  type="text"
                  placeholder="Tên sản phẩm"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  required
                />
                <input
                  type="text"
                  placeholder="Mô tả"
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                />
                <input
                  type="number"
                  placeholder="Giá"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  required
                />
                <input
                  type="number"
                  placeholder="Số lượng"
                  value={newProduct.stock_quantity}
                  onChange={(e) => setNewProduct({ ...newProduct, stock_quantity: e.target.value })}
                  required
                />
                <input
                  type="number"
                  placeholder="ID danh mục"
                  value={newProduct.category_id}
                  onChange={(e) => setNewProduct({ ...newProduct, category_id: e.target.value })}
                  required
                />
                <input
                  type="text"
                  placeholder="URL hình ảnh"
                  value={newProduct.image_url}
                  onChange={(e) => setNewProduct({ ...newProduct, image_url: e.target.value })}
                />
                <div className="apl-form-buttons">
                  <button type="submit">Thêm sản phẩm</button>
                  <button type="button" className="apl-cancel-btn" onClick={() => setShowAddForm(false)}>
                    Hủy
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="apl-product-list">
          {displayedProducts.map((product) => (
            <div className="apl-product-card" key={product.product_id}>
              <div className="apl-product-image">
                <img src={product.image_url} alt={product.name} />
              </div>
              <div className="apl-product-info">
                <h4>{product.name}</h4>
                <p className="apl-description">{product.description || "Không có mô tả"}</p>
                <p className="apl-price">{product.price.toLocaleString()} VND</p>
                <div className="apl-tags">
                  <span className="apl-tag">Màu sắc: {product.color}</span>
                  <span className="apl-tag">Số lượng: {product.stock_quantity}</span>
                </div>
                <div className="apl-tags">
                  <span className="apl-tag">Chất liệu: {product.material}</span>
                </div>
                
              </div>
              <div className="apl-product-actions">
                <button onClick={() => handleEditProduct(product)}>Sửa</button>
                <button className="apl-delete-btn" onClick={() => handleDeleteProduct(product.product_id)}>Xóa</button>
              </div>
            </div>
          ))}
        </div>

        <div className="apl-pagination">
          {Array.from({ length: totalPages }, (_, i) => (
            <button key={i} className={currentPage === i + 1 ? "apl-active" : ""} onClick={() => setCurrentPage(i + 1)}>
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      {editProduct && (
        <AdminEditProduct
          product={editProduct}
          onClose={() => setEditProduct(null)}
          onSave={async (updatedProduct) => {
            try {
              const res = await fetch(`http://localhost:5000/api/products/${updatedProduct.product_id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedProduct),
              });
              const data = await res.json();
              alert(data.message);
              fetchProducts();
              setEditProduct(null);
            } catch (error) {
              console.error("Lỗi khi cập nhật sản phẩm:", error);
            }
          }}
        />
      )}
    </div>
  );
};

export default AdminProductList;