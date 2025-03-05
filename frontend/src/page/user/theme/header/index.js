import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../../contexts/login-registerContext";
import "./style.scss";

const Menu = () => {
  const { user, logout } = useContext(AuthContext); // Lấy user từ context

  return (
    <div className="menu">
      <div className="header">
        <div className="connect">
          <a href="vitri.com" className="local">
            <img src="https://www.tierra.vn/wp-content/uploads/2024/04/location.png" alt="Local" />
          </a>
          <a href="zalo.com" className="zalo">
            <img src="https://www.tierra.vn/wp-content/uploads/2024/04/zalo-ic.png" alt="Zalo" />
          </a>
          <a href="phone.com" className="phone">
            <img src="https://www.tierra.vn/wp-content/uploads/2024/04/phone-ic.png" alt="Phone_number" />
          </a>
        </div>
      </div>
      <div className="logo">
          <a href="/">
            <img src="./Logo.png" alt="logo" width="100px" height="60px" />
          </a>
      </div>
      <div className="user">
        <Link to="/cart">🛒 Giỏ hàng</Link>
        {user ? (
          <div className="user-info">
            <span>👤 {user.name}</span>
            <button onClick={logout}>Đăng xuất</button>
          </div>
        ) : (
          <Link to="/login">Đăng nhập</Link>
        )}
      </div>
    </div>
  );
};

export default Menu;
