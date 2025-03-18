import React, { useState, useEffect, useCallback } from "react";
import "./Slideshow.scss";

const Slideshow = () => {
  const images = [
    "https://www.tierra.vn/wp-content/uploads/2024/12/TOP-BANNER-DESK-NCH-T1.2025-2048x853.webp",
    "https://www.tierra.vn/wp-content/uploads/2024/10/TOP-BANNER-DESK-2048x853.webp",
    "https://www.tierra.vn/wp-content/uploads/2025/01/banner-desktop-trang-suc-than-tai-giam-790k-tierra.webp",
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  // Sử dụng useCallback để tránh việc tạo lại hàm nextSlide mỗi lần render
  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval); // Dọn dẹp khi component unmount
  }, [nextSlide]); // Thêm nextSlide vào dependencies của useEffect

  return (
    <div className="slideshow-container">
      <div
        className="slides"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <img
            src={image}
            alt={`Slide ${index}`}
            key={index}
            className="slide"
          />
        ))}
      </div>
      <div className="buttons">
        <button onClick={prevSlide}>❮</button>
        <button onClick={nextSlide}>❯</button>
      </div>
    </div>
  );
};

export default Slideshow;


