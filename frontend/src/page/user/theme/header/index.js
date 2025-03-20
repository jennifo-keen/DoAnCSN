import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/login-registerContext";
import "./header.scss";

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="header-container">
      <div className="header-connect-wrapper">
        <div className="header-connect">
          <a href="vitri.com" className="header-local">
            <img src="https://www.tierra.vn/wp-content/uploads/2024/04/location.png" alt="Local" />
          </a>
          <a href="zalo.com" className="header-zalo">
            <img src="https://www.tierra.vn/wp-content/uploads/2024/04/zalo-ic.png" alt="Zalo" />
          </a>
          <a href="phone.com" className="header-phone">
            <img src="https://www.tierra.vn/wp-content/uploads/2024/04/phone-ic.png" alt="Phone_number" />
          </a>
        </div>
      </div>
      <div className="header-logo">
        <a href="/">
          <img src="/Logo.png" alt="logo" />
        </a>
      </div>
      <div className="header-user">
        <Link to="/cart">🛒 Giỏ hàng</Link>
        {user ? (
          <div className="header-user-info">
            <a href="/personal">
              <span>👤 {user.name}</span>
            </a>
            <button onClick={logout}>Đăng xuất</button>
          </div>
        ) : (
          <Link to="/login">Đăng nhập</Link>
        )}
      </div>
    </div>
  );
};

export default Header;