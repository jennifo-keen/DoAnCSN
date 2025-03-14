import React, { useState, useEffect } from "react";
import "./Dashboard.scss";
import AdminEditProduct from "../component/EditProduct/AdminEditProduct";

const AdminProductList = () => {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 4;

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Lỗi khi lấy sản phẩm:", err));
  }, []);

  const totalPages = Math.ceil(products.length / perPage);
  const start = (currentPage - 1) * perPage;
  const displayedProducts = products.slice(start, start + perPage);

  const handleDeleteProduct = (productId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      fetch(`http://localhost:5000/api/products/${productId}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then(() => {
          setProducts((prevProducts) =>
            prevProducts.filter((product) => product.id !== productId)
          );
        })
        .catch((err) => console.error("Lỗi khi xóa sản phẩm:", err));
    }
  };

  const handleEditProduct = (product) => {
    setEditProduct(product);
  };

  return (
    <div className="admincontainer">
      <div className="admin-menu">
        <h2>Nhân Viên</h2>
        <a href="/admin">👤 Admin</a>
        <a href="/logout">❕ Đăng xuất</a>

        <h2>Tổng Quan</h2>
        <a href="/admin/oderlist">🛒 Thống kê đơn hàng</a>

        <h2>Chức Năng</h2>
        <a href="/admin/add">➕ Thêm sản phẩm mới</a>
        <a href="/admin/products">🛍️ Danh sách sản phẩm</a>
      </div>

      <div className="admin-content">
        <h2>Danh Sách Sản Phẩm</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên</th>
              <th>Giá</th>
              <th>Kiểu</th>
              <th>Ảnh</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {displayedProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.price.toLocaleString()} VND</td>
                <td>{product.product_type}</td>
                <td>
                  <img src={product.image_url} alt={product.name} />
                </td>
                <td>
                  <button onClick={() => handleEditProduct(product)}>Sửa</button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={currentPage === i + 1 ? "active" : ""}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      {editProduct && (
        <AdminEditProduct
          product={editProduct}
          onClose={() => setEditProduct(null)}
          onSave={(updatedProduct) => {
            // Gửi yêu cầu cập nhật sản phẩm
            fetch(`http://localhost:5000/api/products/${updatedProduct.id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(updatedProduct),
            })
              .then((res) => res.json())
              .then((updated) => {
                // Cập nhật lại danh sách sản phẩm với sản phẩm đã sửa
                setProducts((prevProducts) =>
                  prevProducts.map((product) =>
                    product.id === updated.id ? updated : product
                  )
                );
                setEditProduct(null);
              })
              .catch((err) => console.error("Lỗi khi cập nhật sản phẩm:", err));
          }}
        />
      )}
    </div>
  );
};

export default AdminProductList;
