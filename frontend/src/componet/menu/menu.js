
import "./style.scss";

const Menu = () => {
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
          <form action="">
            <input
              type="text"
              name="keyword"
              id="searchInput"
              placeholder="Nhập từ khóa..."
            />
            <button type="submit" className="timkiem">
              <img
                src="https://tierra.vn/wp-content/uploads/2024/05/icon-search.png"
                alt="icon_search"
              />
            </button>
          </form>
        </div>
    </div>
    )
}
export default Menu;