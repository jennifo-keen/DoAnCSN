import { memo } from "react";
import "./footer.scss";

const Footer = () => {
  return (
    <>
      <footer className="footer-wrapper">
        <div className="footer-section-1">
          <div>
            <img className="footer-logo" src="/Logo.png" alt="logo" />
          </div>
          <div className="footer-connection">
            <h2>Sản phẩm</h2>
            <ul className="footer-links">
              <li className="footer-item">
                <a href="link.com">Nhẫn cầu hôn</a>
              </li>
              <li className="footer-item">
                <a href="link.com">Nhẫn cưới</a>
              </li>
              <li className="footer-item">
                <a href="link.com">Trang sức</a>
              </li>
            </ul>
          </div>
          <div className="footer-connection">
            <h2>Liên Hệ</h2>
            <ul className="footer-links">
              <li className="footer-item">
                <a href="link.com">091464XXXX</a>
              </li>
              <li className="footer-item">
                <a href="link.com">nhan@gmail.com</a>
              </li>
              <li className="footer-item">
                <a href="link.com">zalo</a>
              </li>
            </ul>
          </div>
          <div className="footer-connection">
            <h2>Hỗ trợ</h2>
            <ul className="footer-links">
              <li className="footer-item">
                <a href="link.com#">Chính sách mua hàng - Thu đổi</a>
              </li>
              <li className="footer-item">
                <a href="link.com">Phương thức thanh toán</a>
              </li>
              <li className="footer-item">
                <a href="link.com">Bảo mật thông tin</a>
              </li>
            </ul>
          </div>
        </div>
        <hr className="footer-divider" />
        <div className="footer-section-2">
          <div className="footer-section-2-text">
            <p>Công ty Cổ phần Macca_Jewelry - MST: xxxxxxxxxxxx - Do Sở kế hoạch và đầu tư TPHCM cấp ngày xx/xx/xx</p>
            <p>Trụ sở chính: 104 Đ. Nguyễn Văn Trỗi, Phường 8, Phú Nhuận, Hồ Chí Minh</p>
          </div>
          <div>
            <img
              className="footer-section-2-img"
              src="https://www.tierra.vn/wp-content/uploads/2024/03/logo-bct.png"
              alt="chứng nhận"
            />
          </div>
        </div>
      </footer>
    </>
  );
};

export default memo(Footer);