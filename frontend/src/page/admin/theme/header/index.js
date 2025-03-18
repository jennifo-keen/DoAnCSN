import React from "react";
import "./style.scss";

const Header = () => {
  return (
    <header className="dashboard-header">
      <input type="text" placeholder="🔍 Search..." className="search-input" />
      <div className="user-info">
        <span>📅 3 August, 2021</span>
        <span>🔔</span>
        <span className="profile">👩 Sophia (Executive Manager)</span>
      </div>
    </header>
  );
};

export default Header;
