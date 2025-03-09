-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th3 09, 2025 lúc 04:57 PM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `jewelrystore`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `admin_users`
--

CREATE TABLE `admin_users` (
  `admin_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('superadmin','manager','staff') DEFAULT 'staff',
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `admin_users`
--

INSERT INTO `admin_users` (`admin_id`, `name`, `email`, `password`, `role`, `status`, `created_at`) VALUES
(1, 'Admin Master', 'admin@example.com', '$2b$10$QGV.TbJkZKML1D58Vs3c9O7lG0pbd8FwvXo7dBo28jz9tXPmO8mYm', 'superadmin', 'active', '2025-03-08 23:05:16'),
(2, 'Nguyễn Văn A', 'nguyenvana@example.com', '$2b$10$zVRzO8M7Jm3.KcVXNTcJxe5x6NLT97i24J3v7yNjBDdj5B7JY1F.e', 'manager', 'active', '2025-03-09 00:14:44');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `cart`
--

CREATE TABLE `cart` (
  `cart_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `added_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `categories`
--

CREATE TABLE `categories` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(255) NOT NULL,
  `parent_category_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `categories`
--

INSERT INTO `categories` (`category_id`, `category_name`, `parent_category_id`) VALUES
(1, 'Nhẫn cầu hôn', NULL),
(2, 'Nhẫn cưới\r\n', NULL),
(3, 'trang sức', NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `customers`
--

CREATE TABLE `customers` (
  `customer_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `shipping_address` text DEFAULT NULL,
  `billing_address` text DEFAULT NULL,
  `date_created` datetime DEFAULT current_timestamp(),
  `status` enum('active','inactive') DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `customers`
--

INSERT INTO `customers` (`customer_id`, `name`, `email`, `password`, `phone`, `shipping_address`, `billing_address`, `date_created`, `status`) VALUES
(1, 'Kiên Phạm Hữu', 'kienpham159753@gmail.com', '$2b$10$BZaMloO5q8DzZjAMsr6ieOgrGwqTshNMwPjiJy9zay5IjnyeYXcWm', NULL, NULL, NULL, '2025-01-16 23:10:40', 'active'),
(2, 'Kiên Phạm Hữu', 'kphamhuu2@gmail.com', '$2b$10$a0KgVTeVdfTOdQQQc/ZbUOpGhrrxToZk.4Gt/aiFQwSHzaLwYCaEW', NULL, NULL, NULL, '2025-01-16 23:13:53', 'active'),
(3, 'kiên', 'k@gmail.com', '$2b$10$P.pw28CtXSHfLhK2e/0/AuaREMrphDnCQxmt1wFaMnymxa359dNVO', NULL, NULL, NULL, '2025-01-16 23:15:55', 'active'),
(4, 'ki', 'i@gmail.com', '$2b$10$YC7ZVSvENv9hudBuqSnISOYaBJvqexPpLiMweMqQUM87mfqi4niGC', NULL, NULL, NULL, '2025-01-16 23:20:29', 'active'),
(5, 'sss', '12@gmail.com', '$2b$10$hpyE5AVXnbej.BsfCso7pOUpslpesYgwZ8y1z5TPpFyn1I2ylnBn.', '0914642747', NULL, NULL, '2025-01-16 23:24:19', 'active'),
(6, 'Phạm Hữu Kiên', 'hello@gmail.com', '$2b$10$tkcLoR8K8zMXBWLZJQ5llOrbrIYP63fqwKaXTOJixmU9L90E5Yo8.', '091421263812', NULL, NULL, '2025-01-16 23:43:02', 'active'),
(7, 'Hữu Kiên', 'ao@gmail.com', '$2b$10$YQGt7mWJsrCI7Or5vI6M6uVVxVP9A3bTpSpAlv1K06fppjNwNmdGq', '123123123', NULL, NULL, '2025-01-16 23:46:06', 'active'),
(8, 'kiên nek', 'heloo@gmail.com', '$2b$10$/YempwyWPbJQjJB1LXDW3Oh1zXyZichlLR/TMCqW5mlnhIoubSZxe', '111', NULL, NULL, '2025-03-06 00:21:14', 'active'),
(9, 'Jenni', 'hihi@gmail.com', '$2b$10$2/bihwuMpfX/9Ew62X99nOCZ773RBFcdQmpy50LsggF8XJxDk2xkO', '111111', NULL, NULL, '2025-03-08 01:26:13', 'active'),
(10, 'xinchao@gmail.com', 'xinchao@gmail.com', '$2b$10$awM85t8rMwu5BxXH98MB..mveW1xyzEhsdiVOWv2Ycq4y0dAGHT8S', '123123', NULL, NULL, '2025-03-09 22:45:06', 'active');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `orderdetails`
--

CREATE TABLE `orderdetails` (
  `order_detail_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `unit_price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `order_date` datetime DEFAULT current_timestamp(),
  `shipping_date` datetime DEFAULT NULL,
  `status` enum('pending','processed','shipped','completed') DEFAULT 'pending',
  `total_amount` decimal(10,2) NOT NULL,
  `payment_method` varchar(100) DEFAULT NULL,
  `shipping_address` text DEFAULT NULL,
  `payment_status` enum('unpaid','paid','failed') DEFAULT 'unpaid'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `payments`
--

CREATE TABLE `payments` (
  `payment_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `payment_date` datetime DEFAULT current_timestamp(),
  `amount_paid` decimal(10,2) NOT NULL,
  `payment_method` varchar(100) DEFAULT NULL,
  `payment_status` enum('success','failed','pending') DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `productreviews`
--

CREATE TABLE `productreviews` (
  `review_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `rating` int(11) NOT NULL CHECK (`rating` between 1 and 5),
  `comment` text DEFAULT NULL,
  `review_date` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `products`
--

CREATE TABLE `products` (
  `product_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `price` int(20) DEFAULT NULL,
  `stock_quantity` int(11) DEFAULT 0,
  `category_id` int(11) NOT NULL,
  `material` varchar(255) DEFAULT NULL,
  `color` varchar(100) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `weight` decimal(10,0) DEFAULT NULL,
  `status` enum('available','out_of_stock') DEFAULT 'available'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `products`
--

INSERT INTO `products` (`product_id`, `name`, `description`, `price`, `stock_quantity`, `category_id`, `material`, `color`, `image_url`, `weight`, `status`) VALUES
(1, 'Nhẫn đẹp', 'Chiếc nhẫn kim cương A không chỉ là một món trang sức, mà còn là biểu tượng của sự tinh tế, sang trọng và đẳng cấp. Được chế tác từ chất liệu kim cương tự nhiên cao cấp, sản phẩm sở hữu thiết kế độc đáo với các đường nét mềm mại, tôn lên vẻ đẹp hoàn mỹ của từng viên đá quý.', 190000000, 9999, 1, 'Bạc', 'Trắng', 'https://www.tierra.vn/wp-content/uploads/2024/07/NCH2009_4-1.webp', 19, 'out_of_stock'),
(2, 'Nhẫn xinh quá trời', 'wow đẹp dữ', 200000000, 999, 2, 'vàng', 'vàng', 'https://www.tierra.vn/wp-content/uploads/2024/08/NCH8417_3-H.webp', 19, 'out_of_stock'),
(23, 'Nhẫn kim cương A', 'Thiết kế sang trọng A', 150000000, 50, 2, 'kim cương', 'trắng', 'https://www.tierra.vn/wp-content/uploads/2024/08/NCH8415_3-T.webp', 10, 'available'),
(24, 'Nhẫn kim cương B', 'Thiết kế sang trọng B', 120000000, 30, 2, 'kim cương', 'trắng', 'https://www.tierra.vn/wp-content/uploads/2024/08/NCH8414_3_H.webp', 12, 'available'),
(25, 'Nhẫn vàng A', 'Thiết kế độc đáo A', 100000000, 20, 2, 'vàng', 'vàng', 'https://www.tierra.vn/wp-content/uploads/2024/08/NCH8414_3_H.webp', 15, 'available'),
(26, 'Nhẫn vàng B', 'Thiết kế độc đáo B', 900000000, 10, 2, 'vàng', 'vàng', 'https://www.tierra.vn/wp-content/uploads/2024/08/NCH8108_3-T.webp', 8, 'out_of_stock'),
(27, 'Nhẫn bạch kim A', 'Phong cách quý phái A', 200000000, 40, 2, 'bạch kim', 'bạc', 'https://www.tierra.vn/wp-content/uploads/2024/08/NCH1319_3-H.webp', 19, 'available'),
(28, 'Nhẫn bạc A', 'Phong cách tinh tế A', 800000000, 100, 2, 'bạc', 'bạc', 'https://www.tierra.vn/wp-content/uploads/2024/08/NCH1318_3-H.webp', 7, 'available'),
(29, 'Nhẫn ruby A', 'Tinh xảo với ruby A', 300000000, 25, 2, 'ruby', 'đỏ', 'https://www.tierra.vn/wp-content/uploads/2024/08/NCH1317_3-T.webp', 11, 'available'),
(30, 'Nhẫn sapphire A', 'Lộng lẫy với sapphire A', 400000000, 15, 2, 'sapphire', 'xanh', 'https://www.tierra.vn/wp-content/uploads/2024/07/NCH8402-R_04.webp', 10, 'available'),
(31, 'Nhẫn emerald A', 'Quyến rũ với emerald A', 350000000, 12, 2, 'emerald', 'xanh lá', 'https://www.tierra.vn/wp-content/uploads/2024/07/Frame-48096017.webp', 9, 'out_of_stock'),
(32, 'Nhẫn ngọc trai A', 'Sang trọng với ngọc trai A', 500000000, 60, 2, 'ngọc trai', 'trắng', 'https://www.tierra.vn/wp-content/uploads/2024/07/NCH2009_4-1.webp', 7, 'available'),
(33, 'Nhẫn đá quý A', 'Độc đáo với đá quý A', 150000000, 50, 2, 'đá quý', 'xanh', 'https://www.tierra.vn/wp-content/uploads/2024/07/NCH2007-R_4.webp', 13, 'available'),
(34, 'Nhẫn đá mặt trăng A', 'Tỏa sáng với đá mặt trăng A', 120000000, 80, 2, 'đá mặt trăng', 'xám', 'https://www.tierra.vn/wp-content/uploads/2024/07/NCH2006-R_4-1.webp', 9, 'available'),
(35, 'Nhẫn thạch anh A', 'Bí ẩn với thạch anh A', 100000000, 30, 2, 'thạch anh', 'tím', 'https://www.tierra.vn/wp-content/uploads/2024/07/NCH1701-R_4-1.webp', 7, 'available'),
(36, 'Nhẫn kim cương mini', 'Nhỏ gọn nhưng đẹp', 250000000, 25, 2, 'kim cương', 'trắng', 'https://www.tierra.vn/wp-content/uploads/2024/07/NCH1503-R_04.webp', 5, 'available'),
(37, 'Nhẫn vàng khối', 'Vàng khối cao cấp', 300000000, 5, 2, 'vàng', 'vàng', 'https://www.tierra.vn/wp-content/uploads/2024/07/NCH1502-R_04.webp', 0, 'available'),
(38, 'Nhẫn bạc khối', 'Tinh tế với bạc khối', 700000000, 100, 2, 'bạc', 'bạc', 'https://www.tierra.vn/wp-content/uploads/2024/07/NCH1402-R_04.webp', 5, 'available'),
(39, 'Nhẫn ruby nhỏ', 'Ruby nhỏ tinh tế', 200000000, 35, 2, 'ruby', 'đỏ', 'https://www.tierra.vn/wp-content/uploads/2024/07/NCH1401-R_04.webp', 9, 'available'),
(40, 'Nhẫn sapphire nhỏ', 'Sapphire nhỏ quyến rũ', 250000000, 20, 2, 'sapphire', 'xanh', 'https://www.tierra.vn/wp-content/uploads/2024/07/NCH1310_4.webp', 10, 'available'),
(41, 'Nhẫn emerald nhỏ', 'Emerald nhỏ sang trọng', 230000000, 15, 2, 'emerald', 'xanh lá', 'https://www.tierra.vn/wp-content/uploads/2024/07/NCH1304-R_04.webp', 10, 'available'),
(42, 'Nhẫn ngọc trai nhỏ', 'Ngọc trai nhỏ thanh lịch', 400000000, 100, 2, 'ngọc trai', 'trắng', 'https://www.tierra.vn/wp-content/uploads/2024/07/NCH1303-R_4.1146-1.webp', 3, 'available');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `promotions`
--

CREATE TABLE `promotions` (
  `promotion_id` int(11) NOT NULL,
  `promotion_name` varchar(255) NOT NULL,
  `discount_percentage` decimal(5,2) NOT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `product_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `shippinghistory`
--

CREATE TABLE `shippinghistory` (
  `shipping_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `shipping_date` datetime DEFAULT current_timestamp(),
  `delivery_date` datetime DEFAULT NULL,
  `carrier` varchar(255) DEFAULT NULL,
  `tracking_number` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `shoppingcart`
--

CREATE TABLE `shoppingcart` (
  `cart_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `status` enum('active','purchased','abandoned') DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `admin_users`
--
ALTER TABLE `admin_users`
  ADD PRIMARY KEY (`admin_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Chỉ mục cho bảng `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`cart_id`),
  ADD KEY `customer_id` (`customer_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Chỉ mục cho bảng `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_id`),
  ADD KEY `parent_category_id` (`parent_category_id`);

--
-- Chỉ mục cho bảng `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`customer_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Chỉ mục cho bảng `orderdetails`
--
ALTER TABLE `orderdetails`
  ADD PRIMARY KEY (`order_detail_id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Chỉ mục cho bảng `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `customer_id` (`customer_id`);

--
-- Chỉ mục cho bảng `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`payment_id`),
  ADD KEY `order_id` (`order_id`);

--
-- Chỉ mục cho bảng `productreviews`
--
ALTER TABLE `productreviews`
  ADD PRIMARY KEY (`review_id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `customer_id` (`customer_id`);

--
-- Chỉ mục cho bảng `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Chỉ mục cho bảng `promotions`
--
ALTER TABLE `promotions`
  ADD PRIMARY KEY (`promotion_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Chỉ mục cho bảng `shippinghistory`
--
ALTER TABLE `shippinghistory`
  ADD PRIMARY KEY (`shipping_id`),
  ADD KEY `order_id` (`order_id`);

--
-- Chỉ mục cho bảng `shoppingcart`
--
ALTER TABLE `shoppingcart`
  ADD PRIMARY KEY (`cart_id`),
  ADD KEY `customer_id` (`customer_id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `admin_users`
--
ALTER TABLE `admin_users`
  MODIFY `admin_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `cart`
--
ALTER TABLE `cart`
  MODIFY `cart_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `categories`
--
ALTER TABLE `categories`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `customers`
--
ALTER TABLE `customers`
  MODIFY `customer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT cho bảng `orderdetails`
--
ALTER TABLE `orderdetails`
  MODIFY `order_detail_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `payments`
--
ALTER TABLE `payments`
  MODIFY `payment_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `productreviews`
--
ALTER TABLE `productreviews`
  MODIFY `review_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT cho bảng `promotions`
--
ALTER TABLE `promotions`
  MODIFY `promotion_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `shippinghistory`
--
ALTER TABLE `shippinghistory`
  MODIFY `shipping_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `shoppingcart`
--
ALTER TABLE `shoppingcart`
  MODIFY `cart_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `categories`
--
ALTER TABLE `categories`
  ADD CONSTRAINT `categories_ibfk_1` FOREIGN KEY (`parent_category_id`) REFERENCES `categories` (`category_id`);

--
-- Các ràng buộc cho bảng `orderdetails`
--
ALTER TABLE `orderdetails`
  ADD CONSTRAINT `orderdetails_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`),
  ADD CONSTRAINT `orderdetails_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`);

--
-- Các ràng buộc cho bảng `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`);

--
-- Các ràng buộc cho bảng `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`);

--
-- Các ràng buộc cho bảng `productreviews`
--
ALTER TABLE `productreviews`
  ADD CONSTRAINT `productreviews_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`),
  ADD CONSTRAINT `productreviews_ibfk_2` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`);

--
-- Các ràng buộc cho bảng `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`);

--
-- Các ràng buộc cho bảng `promotions`
--
ALTER TABLE `promotions`
  ADD CONSTRAINT `promotions_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`);

--
-- Các ràng buộc cho bảng `shippinghistory`
--
ALTER TABLE `shippinghistory`
  ADD CONSTRAINT `shippinghistory_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`);

--
-- Các ràng buộc cho bảng `shoppingcart`
--
ALTER TABLE `shoppingcart`
  ADD CONSTRAINT `shoppingcart_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
