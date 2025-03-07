import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Cài axios nếu chưa có
import "./style.scss";

const Menu = () => {
  const [keyword, setKeyword] = useState("");
  const [rings, setRings] = useState([]); // state lưu danh sách nhẫn cầu hôn
  const [weddingRings, setWeddingRings] = useState([]); // state lưu danh sách nhẫn cưới
  const [jewelry, setJewelry] = useState([]); // state lưu danh sách trang sức
  const navigate = useNavigate();

  // Gọi API để lấy danh sách nhẫn cầu hôn (category_id = 1)
  useEffect(() => {
    const fetchRings = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/loai1", {
          params: { category_id: 1 } // Gửi category_id = 1 để lấy nhẫn cầu hôn
        });
        setRings(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách nhẫn cầu hôn:", error);
      }
    };

    // Gọi API để lấy danh sách nhẫn cưới (category_id = 2)
    const fetchWeddingRings = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/loai2", {
          params: { category_id: 2 } // Gửi category_id = 2 để lấy nhẫn cưới
        });
        setWeddingRings(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách nhẫn cưới:", error);
      }
    };

    // Gọi API để lấy danh sách trang sức (category_id = 3)
    const fetchJewelry = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/loai3", {
          params: { category_id: 3 } // Gửi category_id = 3 để lấy trang sức
        });
        setJewelry(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách trang sức:", error);
      }
    };

    fetchRings();
    fetchWeddingRings();
    fetchJewelry();
  }, []); // Chạy 1 lần khi component mount

  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search?keyword=${encodeURIComponent(keyword)}`);
    }
  };

  return (
    <div className="menu">
      <div className="list">
        <div className="dropdown">
          <button className="dropbtn">Nhẫn cầu hôn</button>
          <div className="dropdown-content">
            {/* Hiển thị 5 nhẫn đầu tiên */}
            {rings.slice(0, 5).map((ring, index) => (
              <a key={index} href={`/product/${ring.product_id}`}>{ring.name}</a>
            ))}
          </div>
        </div>

        <div className="dropdown">
          <button className="dropbtn">Nhẫn Cưới</button>
          <div className="dropdown-content">
            {/* Hiển thị 5 nhẫn cưới */}
            {weddingRings.slice(0, 5).map((ring, index) => (
              <a key={index} href={`/product/${ring.product_id}`}>{ring.name}</a>
            ))}
          </div>
        </div>

        <div className="dropdown">
          <button className="dropbtn">Trang sức</button>
          <div className="dropdown-content">
            {/* Hiển thị 5 sản phẩm trang sức */}
            {jewelry.slice(0, 5).map((item, index) => (
              <a key={index} href={`/product/${item.product_id}`}>{item.name}</a>
            ))}
          </div>
        </div>

        {/* Các dropdown khác có thể thêm tương tự */}
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
            <img
              style={{ height: "30px", width: "30px" }}
              src="https://tierra.vn/wp-content/uploads/2024/05/icon-search.png"
              alt="icon_search"
            />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Menu;
