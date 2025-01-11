import {memo} from "react"
import Menu from "../../../componet/menu/menu";
import "./style.scss";

const SanPham = () => {
    return (
    <>
        <Menu/>
  <div class="product-container">
    <div class="image-gallery">
      <div class="main-image">
        <img src="https://www.tierra.vn/wp-content/uploads/2024/07/NCH1402-R_04.webp" alt="Nhẫn cầu hôn Gentle Touch"/>
      </div>
    </div>
    <div class="product-details">
      <h1>Nhẫn cầu hôn Gentle Touch NCH1402</h1>
      <p class="price">11.088.000 đ</p>
      <ul>
        <li><strong>Mã sản phẩm:</strong> NCH1402</li>
        <li><strong>Kích cỡ:</strong> 11</li>
        <li><strong>Màu Kim Loại:</strong> màu vàng </li>
        <li><strong>Chất liệu:</strong> Bạc</li>
      </ul>
      <button class="consult-button">Thêm vô giỏ hàng</button>
      <button class="muangay">Thêm vô giỏ hàng</button>
      <div className="thong-tin">
      <p class="note">
        (*) Quý khác vui lòng đọc kĩ hướng dẫn sử dụng trước khi sử dụng kim cương hột xoàn nhé !!!
      </p>
      <p class="hotline">📞 gọi điện liền để mua hàng nào</p>
      </div>
    </div>
    </div>
    <div className="chutich">
        <p>
            Nhẫn cầu hôn NCH1402 có thiết kế Trellis đơn giản với viên kim cương chủ dáng tròn, được đính trên 4 chấu được uốn cong đầy cuốn hút. Như những ngón tay ôm trọn yêu thương vào lòng, với thiết kế tinh giản, mang giá trị vượt thời gian, đây là dáng nhẫn hứa hẹn sẽ khiến những cô nàng thanh lịch phải xiêu lòng.
        </p>
    </div>
    <div className="home">
        <a href="http://localhost:3000/">
        <h2>Về trang chủ</h2>
        </a>
    </div>
    </>
    );
};
export default memo(SanPham);