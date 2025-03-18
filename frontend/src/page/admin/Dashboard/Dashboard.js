import React, { useState, useEffect } from "react";
import "./Dashboard.scss";
import AdminEditProduct from "../component/EditProduct/AdminEditProduct";

const AdminProductList = () => {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 4;

  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
<<<<<<< HEAD
    stock_quantity: "",
=======
    stock: "",
>>>>>>> ad613c645a1e5aa79626dabeeb46f7142289713b
    category_id: "",
    image_url: "",
  });

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
<<<<<<< HEAD
      setNewProduct({ name: "", description: "", price: "", stock_quantity: "", category_id: "", image_url: "" });
=======
      setNewProduct({ name: "", description: "", price: "", stock: "", category_id: "", image_url: "" });
>>>>>>> ad613c645a1e5aa79626dabeeb46f7142289713b
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm:", error);
    }
  };

  return (
    <div className="admincontainer">
      <div className="admin-menu">
        <h2>Nhân Viên</h2>
        <a href="/admin">👤 Admin</a>
        <a href="/logout">❕ Đăng xuất</a>

        <h2>Tổng Quan</h2>
        <a href="/admin/orderlist">🛒 Thống kê đơn hàng</a>

        <h2>Chức Năng</h2>
        <a href="/admin/products">🛍️ Danh sách sản phẩm</a>
      </div>

      <div className="admin-content">
        <h2>Danh Sách Sản Phẩm</h2>

        {/* Form thêm sản phẩm */}
        <div className="add-product-form">
          <h3>Thêm Sản Phẩm Mới</h3>
          <form onSubmit={handleAddProduct}>
            <input type="text" placeholder="Tên sản phẩm" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} required />
            <input type="text" placeholder="Mô tả" value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} />
            <input type="number" placeholder="Giá" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} required />
<<<<<<< HEAD
            <input type="number" placeholder="Số lượng" value={newProduct.stock_quantity} onChange={(e) => setNewProduct({ ...newProduct, stock_quantity: e.target.value })} required />
=======
            <input type="number" placeholder="Số lượng" value={newProduct.stock} onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })} required />
>>>>>>> ad613c645a1e5aa79626dabeeb46f7142289713b
            <input type="number" placeholder="ID danh mục" value={newProduct.category_id} onChange={(e) => setNewProduct({ ...newProduct, category_id: e.target.value })} required />
            <input type="text" placeholder="URL hình ảnh" value={newProduct.image_url} onChange={(e) => setNewProduct({ ...newProduct, image_url: e.target.value })} />
            <button type="submit">Thêm sản phẩm</button>
          </form>
        </div>

        {/* Bảng danh sách sản phẩm */}
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên</th>
              <th>Giá</th>
              <th>Số lượng</th>
              <th>Danh mục</th>
              <th>Ảnh</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {displayedProducts.map((product) => (
              <tr key={product.product_id}>
                <td>{product.product_id}</td>
                <td>{product.name}</td>
                <td>{product.price.toLocaleString()} VND</td>
<<<<<<< HEAD
                <td>{product.stock_quantity}</td>
=======
                <td>{product.stock}</td>
>>>>>>> ad613c645a1e5aa79626dabeeb46f7142289713b
                <td>{product.category_id}</td>
                <td>
                  <img src={product.image_url} alt={product.name} />
                </td>
                <td>
                  <button onClick={() => handleEditProduct(product)}>Sửa</button>
                  <button className="delete-btn" onClick={() => handleDeleteProduct(product.product_id)}>Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Phân trang */}
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => (
            <button key={i} className={currentPage === i + 1 ? "active" : ""} onClick={() => setCurrentPage(i + 1)}>
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Form chỉnh sửa sản phẩm */}
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
