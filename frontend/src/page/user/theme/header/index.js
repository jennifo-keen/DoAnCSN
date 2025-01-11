import {memo} from "react";
import "./style.scss";

const Header = () => {
    return (
        <>
        <div class="header">
        <div class="connect">
            <a href="vitri.com" class="local">
                <img src="https://www.tierra.vn/wp-content/uploads/2024/04/location.png" alt="Local"/>
            </a>
            <a href="zalo.com" class="zalo">
                <img src="https://www.tierra.vn/wp-content/uploads/2024/04/zalo-ic.png" alt="Zalo"/>
            </a>
            <a href="phone.com" class="phone">
                <img src="https://www.tierra.vn/wp-content/uploads/2024/04/phone-ic.png" alt="Phone_number"/>
            </a>
        </div>
        <div class="logo">
            <a href="http://localhost:3000">
                <img src="./Logo.png" alt="logo" width="100px" height="60px"/>
            </a>
        </div> 
        <div class="account" >
            <a href="trang-ca-nhan.com" >
                <img src="https://www.tierra.vn/wp-content/uploads/2024/04/icon-account.png" alt="Phone_number"/>
            </a>
            <p class="user_name"></p>
            <a  href="Dang-nhap">Đăng nhập</a>
        </div>
        </div>
        </>
    );
};
export default memo(Header);