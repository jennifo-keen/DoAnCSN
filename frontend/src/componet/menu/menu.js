import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.scss";

const Menu = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
        navigate(`/search?keyword=${encodeURIComponent(keyword)}`);
    }
};
    return (
        <div className="menu">
        <div className="list">

        <div class="dropdown">
            <button class="dropbtn">Nhẫn cầu hôn</button>
            <div class="dropdown-content">
                <a href="link.com">Nhẫn...</a>
                <a href="link.com">Nhẫn...</a>
                <a href="link.com">Nhẫn...</a>
                <a href="link.com">Nhẫn...</a>
            </div>
        </div>


          <div className="dropdown">
            <button className="dropbtn">Nhẫn Cưới</button>
            <div className="dropdown-content"></div>
          </div>
          <div className="dropdown">
            <button className="dropbtn">Trang sức</button>
            <div className="dropdown-content"></div>
          </div>
          <div className="dropdown">
            <button className="dropbtn">Khuyến mãi</button>
            <div className="dropdown-content"></div>
          </div>
          <div className="dropdown">
            <button className="dropbtn">Tin tức</button>
            <div className="dropdown-content"></div>
          </div>
          <div className="dropdown">
            <button className="dropbtn">Liên hệ</button>
            <div className="dropdown-content"></div>
          </div>
        </div>
          <div className="search-box">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Nhập từ khóa..."
            />
            <button type="submit">
              <img style={{height:'30px', width:'30px'}} src="https://tierra.vn/wp-content/uploads/2024/05/icon-search.png" alt="icon_search" />
            </button>
          </form>
        </div>
        <div className="cart">
          <Link to="/cart">
            <button>🛒 Giỏ hàng</button>
          </Link>
        </div>
        </div>
    )
}
export default Menu;