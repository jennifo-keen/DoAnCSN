import {memo} from "react"
import "./style.scss";
const Footer = () => {
    return (
    <>
        <footer>
        <div class="footer_1">
            <div>
                <img  class="footer_logo" src="Logo.png" alt="logo"/>
            </div>
            <div class="footer_conn">
                <h2>Sản phẩm</h2>
                <ul class="links">
                    <li class="li_footer">
                        <a href="link.com">Nhẫn cầu hôn</a>
                    </li>
                    <li class="li_footer">
                        <a href="link.com">Nhẫn cưới</a>
                    </li>
                    <li class="li_footer">
                        <a href="link.com">Trang sức</a>
                    </li>
                </ul>
            </div>
            <div class="footer_conn">
                <h2>Liên Hệ</h2>
                <ul class="links">
                    <li class="li_footer">
                        <a href="link.com">091464XXXX</a>
                    </li>
                    <li class="li_footer">
                        <a href="link.com">nhan@gmail.com</a>
                    </li>
                    <li class="li_footer">
                        <a href="link.com">zalo</a>
                    </li>
                </ul>
            </div>
            <div class="footer_conn">
                <h2>Hỗ trợ</h2>
                <ul class="links">
                    <li class="li_footer">
                        <a href="link.com#">Chính sách mua hàng - thu đổi</a>
                    </li>
                    <li class="li_footer">
                        <a href="link.com">Phương thức thanh toán</a>
                    </li>
                    <li class="li_footer">
                        <a href="link.com">Bảo mật thông tin</a>
                    </li>
                </ul>
            </div>
        </div>
        <hr class="hr"/>
        <div class="footer_2">
            <div class="footer_2_text">
                <p>Công ty Cổ phần Macca_Jewelry - MST: xxxxxxxxxx - Do Sở kế hoạch và đầu tư TPHCM cấp ngày xx/xx/xx</p>
                <p>Trụ sở chính: 104 Đ. Nguyễn Văn Trỗi, Phường 8, Phú Nhuận, Hồ Chí Minh</p>
            </div>
            <div>
                <img class="footer_2_img" src="https://www.tierra.vn/wp-content/uploads/2024/03/logo-bct.png" alt="chứng nhận"/>
            </div>
        </div>
    </footer>
    </>
    );
};
export default memo(Footer);