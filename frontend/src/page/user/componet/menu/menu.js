import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./menu.scss";

const Menu = () => {
  const [keyword, setKeyword] = useState("");
  const [rings, setRings] = useState([]);
  const [weddingRings, setWeddingRings] = useState([]);
  const [jewelry, setJewelry] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRings = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/category/1", {
          params: { category_id: 1 }
        });
        setRings(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách nhẫn cầu hôn:", error);
      }
    };

    const fetchWeddingRings = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/category/2", {
          params: { category_id: 2 }
        });
        setWeddingRings(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách nhẫn cưới:", error);
      }
    };

    const fetchJewelry = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/category/3", {
          params: { category_id: 3 }
        });
        setJewelry(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách trang sức:", error);
      }
    };

    fetchRings();
    fetchWeddingRings();
    fetchJewelry();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search?keyword=${encodeURIComponent(keyword)}`);
    }
  };

  return (
    <div className="menu-wrapper">
      <div className="menu-list">
        <div className="menu-dropdown">
          <button className="menu-dropbtn">Nhẫn cầu hôn</button>
          <div className="menu-dropdown-content">
            {rings.slice(0, 5).map((ring, index) => (
              <a key={index} href={`/product/${ring.product_id}`}>{ring.name}</a>
            ))}
          </div>
        </div>

        <div className="menu-dropdown">
          <button className="menu-dropbtn">Nhẫn Cưới</button>
          <div className="menu-dropdown-content">
            {weddingRings.slice(0, 5).map((ring, index) => (
              <a key={index} href={`/product/${ring.product_id}`}>{ring.name}</a>
            ))}
          </div>
        </div>

        <div className="menu-dropdown">
          <button className="menu-dropbtn">Trang sức</button>
          <div className="menu-dropdown-content">
            {jewelry.slice(0, 5).map((item, index) => (
              <a key={index} href={`/product/${item.product_id}`}>{item.name}</a>
            ))}
          </div>
        </div>

        <div className="menu-dropdown">
          <button className="menu-dropbtn">Khuyến mãi</button>
          <div className="menu-dropdown-content"></div>
        </div>
        <div className="menu-dropdown">
          <button className="menu-dropbtn">Tin tức</button>
          <div className="menu-dropdown-content"></div>
        </div>
        <div className="menu-dropdown">
          <button className="menu-dropbtn">Liên hệ</button>
          <div className="menu-dropdown-content"></div>
        </div>
      </div>

      <div className="menu-search-box">
        <form onSubmit={handleSearch}>
          <div className="menu-search-input-wrapper">
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Nhập từ khóa..."
            />
            <button type="submit" className="menu-search-button">
              <img
                src="https://tierra.vn/wp-content/uploads/2024/05/icon-search.png"
                alt="icon_search"
              />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Menu;