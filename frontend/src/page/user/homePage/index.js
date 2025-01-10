import React, { memo } from "react";
import "./style.scss";
import Slideshow from "../../../componet/Slideshow/Slideshow";
import Menu from "../../../componet/menu/menu";


const Homepage = () => {
  return (
    <>
    <div className="Menu">
        <Menu/>
    </div>
    
    <div className="img">
        <Slideshow/>
    </div>

    <div>Khúc này để hiển thị sản phẩm</div>

    <div class="container">
        <img class="background-image" src="https://www.tierra.vn/wp-content/uploads/2024/04/thiet-ke-theo-yeu-cau-P9CAcUADlA.png" alt="design theo yêu cầu" />
        <div class="text-overlay">
            <h2>Thiết kế riêng theo yêu cầu</h2>
            <p>Hiện thực hoá chiếc nhẫn trên những ý tưởng, câu chuyện của riêng bạn.</p>
            <a href="link.com" class="cta-button">Khám phá ngay</a>
        </div>
    </div>


    </>
  );
};

export default memo(Homepage);
