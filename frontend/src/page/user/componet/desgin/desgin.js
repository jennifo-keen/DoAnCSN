import "./desgin.scss";

const Design = () => {
  return (
    <div className="design-container">
      <img
        className="design-background-image"
        src="https://www.tierra.vn/wp-content/uploads/2024/04/thiet-ke-theo-yeu-cau-P9CAcUADlA.png"
        alt="design theo yêu cầu"
      />
      <div className="design-text-overlay">
        <h2>Thiết kế riêng theo yêu cầu</h2>
        <p>Hiện thực hoá chiếc nhẫn trên những ý tưởng, câu chuyện của riêng bạn.</p>
        <a href="link.com" className="design-cta-button">
          Khám phá ngay
        </a>
      </div>
    </div>
  );
};

export default Design;