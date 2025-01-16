import { memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Để chuyển hướng người dùng
import "./style.scss";

const Header = () => {
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Lấy thông tin người dùng từ localStorage
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      setUserName(parsedUser.name); // Gán tên người dùng vào state
    }
  }, []);

  const handleLogout = () => {
    // Xóa thông tin người dùng khỏi localStorage
    localStorage.removeItem('user');
    setUserName(''); // Reset tên người dùng trong state
    navigate('/login'); // Chuyển hướng đến trang đăng nhập
  };

  return (
    <>
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
        <div className="logo">
          <a href="/">
            <img src="./Logo.png" alt="logo" width="100px" height="60px" />
          </a>
        </div>
        <div className="account">
          <a href="trang-ca-nhan.com">
            <img src="https://www.tierra.vn/wp-content/uploads/2024/04/icon-account.png" alt="Phone_number" />
          </a>
          {userName ? (
            <>
              <p className="user_name">{userName}</p>
              <button onClick={handleLogout}>Đăng xuất</button>
            </>
          ) : (
            <a href="/login">Đăng nhập</a>
          )}
        </div>
      </div>
    </>
  );
};

export default memo(Header);
