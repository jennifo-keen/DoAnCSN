-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th3 25, 2025 lúc 06:57 PM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.0.30

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
(1, 'phạm hữu kiên', 'adminnek@gmail.com', '$2b$10$BZO3irMtKJgHovbKZGz2n.Yb1fNe4zAv0nhQ0f8qIHwMeeqIb2UL6', 'staff', 'active', '2025-03-10 00:37:39'),
(5, 'Hữu Kiên', 'admin01@gmail.com', '$2b$10$hyTwuo3ZrtxndZuGORSnwO.nr9Botuv0/Gvdz1rUl6bH0RkURH/bG', 'staff', 'active', '2025-03-18 23:28:37');

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
(1, 'Jennnifo nhe', 'kienpham159753@gmail.com', '$2b$10$BZaMloO5q8DzZjAMsr6ieOgrGwqTshNMwPjiJy9zay5IjnyeYXcWm', '0914642747', 'Số 3 Đường Trần Hưng tuấn', NULL, '2025-01-16 23:10:40', 'active'),
(2, 'Kiên Phạm Hữu', 'kphamhuu2@gmail.com', '$2b$10$a0KgVTeVdfTOdQQQc/ZbUOpGhrrxToZk.4Gt/aiFQwSHzaLwYCaEW', NULL, NULL, NULL, '2025-01-16 23:13:53', 'active'),
(3, 'kiên', 'k@gmail.com', '$2b$10$P.pw28CtXSHfLhK2e/0/AuaREMrphDnCQxmt1wFaMnymxa359dNVO', NULL, NULL, NULL, '2025-01-16 23:15:55', 'active'),
(4, 'ki', 'i@gmail.com', '$2b$10$YC7ZVSvENv9hudBuqSnISOYaBJvqexPpLiMweMqQUM87mfqi4niGC', NULL, NULL, NULL, '2025-01-16 23:20:29', 'active'),
(5, 'sss', '12@gmail.com', '$2b$10$hpyE5AVXnbej.BsfCso7pOUpslpesYgwZ8y1z5TPpFyn1I2ylnBn.', '0914642747', NULL, NULL, '2025-01-16 23:24:19', 'active'),
(6, 'Phạm Hữu Kiên', 'hello@gmail.com', '$2b$10$tkcLoR8K8zMXBWLZJQ5llOrbrIYP63fqwKaXTOJixmU9L90E5Yo8.', '091421263812', NULL, NULL, '2025-01-16 23:43:02', 'active'),
(7, 'Hữu Kiên', 'ao@gmail.com', '$2b$10$YQGt7mWJsrCI7Or5vI6M6uVVxVP9A3bTpSpAlv1K06fppjNwNmdGq', '123123123', NULL, NULL, '2025-01-16 23:46:06', 'active'),
(8, 'kiên nek', 'heloo@gmail.com', '$2b$10$/YempwyWPbJQjJB1LXDW3Oh1zXyZichlLR/TMCqW5mlnhIoubSZxe', '111', NULL, NULL, '2025-03-06 00:21:14', 'active'),
(9, 'Jenni', 'hihi@gmail.com', '$2b$10$2/bihwuMpfX/9Ew62X99nOCZ773RBFcdQmpy50LsggF8XJxDk2xkO', '111111', NULL, NULL, '2025-03-08 01:26:13', 'active'),
(10, 'xinchao@gmail.com', 'xinchao@gmail.com', '$2b$10$awM85t8rMwu5BxXH98MB..mveW1xyzEhsdiVOWv2Ycq4y0dAGHT8S', '123123', NULL, NULL, '2025-03-09 22:45:06', 'active'),
(11, 'Kiên', 'admintest@gmail.com', '$2b$10$i7JKrsqy/T9PRWmMBijEo./3RV2uvV1Pe3aHAY.kyVpxGuRA0ScD6', '1111', NULL, NULL, '2025-03-09 23:14:21', 'active'),
(12, 'Phạm Hồng Thi', 'h@gmail.com', '$2b$10$HWSwDsdCt3n6q4isUQdqhetNbA3gnXSxOK8gCYTi4H1Prithiro6W', '0849999027', NULL, NULL, '2025-03-21 14:29:26', 'active');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `order_date` datetime DEFAULT current_timestamp(),
  `shipping_date` datetime DEFAULT NULL,
  `status` varchar(50) DEFAULT 'pending',
  `total_amount` decimal(15,2) DEFAULT 0.00,
  `payment_method` varchar(50) DEFAULT NULL,
  `shipping_address` varchar(255) DEFAULT NULL,
  `payment_status` varchar(50) DEFAULT 'unpaid',
  `total_price` decimal(15,2) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `orders`
--

INSERT INTO `orders` (`order_id`, `customer_id`, `order_date`, `shipping_date`, `status`, `total_amount`, `payment_method`, `shipping_address`, `payment_status`, `total_price`, `created_at`) VALUES
(1, 12, '2025-03-22 13:20:03', NULL, 'pending', 0.00, NULL, NULL, 'unpaid', 190000000.00, '2025-03-22 13:20:03'),
(2, 12, '2025-03-22 14:25:41', NULL, 'pending', 0.00, NULL, NULL, 'unpaid', 190000000.00, '2025-03-22 14:25:41'),
(3, 12, '2025-03-22 14:30:41', NULL, 'pending', 0.00, NULL, NULL, 'unpaid', 190000000.00, '2025-03-22 14:30:41'),
(4, 12, '2025-03-22 14:35:41', NULL, 'pending', 0.00, NULL, NULL, 'unpaid', 800000000.00, '2025-03-22 14:35:41'),
(5, 12, '2025-03-22 14:43:21', NULL, 'pending', 0.00, NULL, NULL, 'unpaid', 300000000.00, '2025-03-22 14:43:21'),
(6, 12, '2025-03-22 14:50:59', NULL, 'pending', 0.00, NULL, NULL, 'unpaid', 120000000.00, '2025-03-22 14:50:59'),
(7, 12, '2025-03-22 15:02:31', NULL, 'pending', 0.00, NULL, NULL, 'unpaid', 120000000.00, '2025-03-22 15:02:31'),
(8, 12, '2025-03-22 15:22:44', NULL, 'pending', 0.00, NULL, NULL, 'unpaid', 120000000.00, '2025-03-22 15:22:44'),
(9, 12, '2025-03-22 16:20:42', NULL, 'pending', 0.00, NULL, NULL, 'unpaid', 150000000.00, '2025-03-22 16:20:42'),
(10, 12, '2025-03-22 16:28:42', NULL, 'pending', 0.00, NULL, NULL, 'unpaid', 120000000.00, '2025-03-22 16:28:42'),
(11, 12, '2025-03-22 17:14:14', NULL, 'pending', 0.00, NULL, NULL, 'unpaid', 120000000.00, '2025-03-22 17:14:14'),
(12, 12, '2025-03-22 17:15:21', NULL, 'pending', 0.00, NULL, NULL, 'unpaid', 780000000.00, '2025-03-22 17:15:21'),
(13, 12, '2025-03-22 17:35:46', NULL, 'pending', 0.00, NULL, NULL, 'unpaid', 190000000.00, '2025-03-22 17:35:46'),
(14, 1, '2025-03-22 17:47:19', NULL, 'pending', 0.00, NULL, NULL, 'unpaid', 120000000.00, '2025-03-22 17:47:19'),
(15, 1, '2025-03-23 22:31:56', NULL, 'pending', 0.00, NULL, NULL, 'unpaid', 2080000000.00, '2025-03-23 22:31:56'),
(16, 1, '2025-03-23 22:35:51', NULL, 'pending', 0.00, NULL, NULL, 'unpaid', 150000000.00, '2025-03-23 22:35:51'),
(17, 1, '2025-03-23 22:37:26', NULL, 'pending', 0.00, NULL, NULL, 'unpaid', 120000000.00, '2025-03-23 22:37:26'),
(18, 1, '2025-03-23 22:40:50', NULL, 'pending', 0.00, NULL, NULL, 'unpaid', 120000000.00, '2025-03-23 22:40:50'),
(19, 1, '2025-03-23 22:50:28', NULL, 'pending', 0.00, NULL, NULL, 'unpaid', 190000000.00, '2025-03-23 22:50:28'),
(20, 1, '2025-03-23 22:55:33', NULL, 'pending', 0.00, NULL, NULL, 'unpaid', 120000000.00, '2025-03-23 22:55:33'),
(21, 1, '2025-03-23 22:57:05', NULL, 'pending', 0.00, NULL, NULL, 'unpaid', 100000000.00, '2025-03-23 22:57:05'),
(22, 1, '2025-03-23 23:01:05', NULL, 'pending', 0.00, NULL, NULL, 'unpaid', 150000000.00, '2025-03-23 23:01:05'),
(23, 1, '2025-03-23 23:06:47', NULL, 'pending', 0.00, NULL, NULL, 'unpaid', 190000000.00, '2025-03-23 23:06:47'),
(24, 1, '2025-03-23 23:14:08', NULL, 'pending', 0.00, NULL, NULL, 'unpaid', 150000000.00, '2025-03-23 23:14:08'),
(25, 1, '2025-03-23 23:42:58', NULL, 'pending', 0.00, NULL, NULL, 'unpaid', 100000000.00, '2025-03-23 23:42:58'),
(26, 1, '2025-03-23 23:49:24', NULL, 'pending', 0.00, NULL, NULL, 'unpaid', 120000000.00, '2025-03-23 23:49:24'),
(27, 1, '2025-03-23 23:53:53', NULL, 'pending', 0.00, NULL, NULL, 'unpaid', 900000000.00, '2025-03-23 23:53:53'),
(28, 1, '2025-03-23 23:54:13', NULL, 'pending', 0.00, NULL, NULL, 'unpaid', 190000000.00, '2025-03-23 23:54:13'),
(29, 1, '2025-03-23 23:56:24', NULL, 'pending', 0.00, NULL, NULL, 'unpaid', 120000000.00, '2025-03-23 23:56:24'),
(30, 1, '2025-03-23 23:56:43', NULL, 'pending', 0.00, NULL, NULL, 'unpaid', 190000000.00, '2025-03-23 23:56:43'),
(31, 1, '2025-03-23 23:56:54', NULL, 'Đang thanh toán', 0.00, NULL, NULL, 'unpaid', 350000000.00, '2025-03-23 23:56:54'),
(32, 1, '2025-03-24 00:05:12', NULL, 'Chưa thanh toán', 0.00, NULL, 'số 10 cái gì đó', 'unpaid', 100000000.00, '2025-03-24 00:05:12'),
(33, 1, '2025-03-24 20:00:39', NULL, 'Chưa thanh toán', 0.00, NULL, 'số 10 cái gì đó', 'unpaid', 120000000.00, '2025-03-24 20:00:39'),
(34, 1, '2025-03-24 20:02:20', NULL, 'Chưa thanh toán', 0.00, NULL, 'Số 3 Đường Trần Hưng tuấn', 'unpaid', 120000000.00, '2025-03-24 20:02:20'),
(35, 1, '2025-03-24 23:45:39', NULL, 'Chưa thanh toán', 0.00, NULL, 'Số 3 Đường Trần Hưng tuấn', 'unpaid', 740000000.00, '2025-03-24 23:45:39');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `order_details`
--

CREATE TABLE `order_details` (
  `order_detail_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` decimal(15,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `order_details`
--

INSERT INTO `order_details` (`order_detail_id`, `order_id`, `product_id`, `quantity`, `price`) VALUES
(1, 1, 1, 1, 190000000.00),
(2, 2, 1, 1, 190000000.00),
(3, 3, 1, 1, 190000000.00),
(4, 4, 28, 1, 800000000.00),
(5, 5, 23, 2, 150000000.00),
(6, 6, 24, 1, 120000000.00),
(7, 7, 24, 1, 120000000.00),
(8, 8, 24, 1, 120000000.00),
(9, 9, 23, 1, 150000000.00),
(10, 10, 24, 1, 120000000.00),
(11, 11, 24, 1, 120000000.00),
(12, 12, 24, 2, 120000000.00),
(13, 12, 29, 1, 300000000.00),
(14, 12, 24, 2, 120000000.00),
(15, 13, 1, 1, 190000000.00),
(16, 14, 24, 1, 120000000.00),
(17, 15, 1, 2, 190000000.00),
(18, 15, 26, 1, 900000000.00),
(19, 15, 28, 1, 800000000.00),
(20, 16, 23, 1, 150000000.00),
(21, 17, 24, 1, 120000000.00),
(22, 18, 24, 1, 120000000.00),
(23, 19, 1, 1, 190000000.00),
(24, 20, 24, 1, 120000000.00),
(25, 21, 25, 1, 100000000.00),
(26, 22, 23, 1, 150000000.00),
(27, 23, 1, 1, 190000000.00),
(28, 24, 23, 1, 150000000.00),
(29, 25, 25, 1, 100000000.00),
(30, 26, 24, 1, 120000000.00),
(31, 27, 26, 1, 900000000.00),
(32, 28, 1, 1, 190000000.00),
(33, 29, 24, 1, 120000000.00),
(34, 30, 1, 1, 190000000.00),
(35, 31, 31, 1, 350000000.00),
(36, 32, 25, 1, 100000000.00),
(37, 33, 24, 1, 120000000.00),
(38, 34, 24, 1, 120000000.00),
(39, 35, 23, 1, 150000000.00),
(40, 35, 30, 1, 400000000.00),
(41, 35, 1, 1, 190000000.00);

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
(1, 'Nhẫn đẹpha', NULL, 190000000, 30, 2, 'Bạc', 'Trắng', 'https://www.tierra.vn/wp-content/uploads/2024/07/NCC0046_5-yellow.webp', 19, 'out_of_stock'),
(23, 'Nhẫn kim cương A', NULL, 150000000, 70, 2, 'kim cương', 'trắng', 'https://www.tierra.vn/wp-content/uploads/2024/08/NCH8415_3-T.webp', 10, 'available'),
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
(42, 'Nhẫn ngọc trai nhỏ', 'Ngọc trai nhỏ thanh lịch', 400000000, 100, 2, 'ngọc trai', 'trắng', 'https://www.tierra.vn/wp-content/uploads/2024/07/NCH1303-R_4.1146-1.webp', 3, 'available'),
(44, 'hí', 'hello mí bà', 2222, 22, 1, NULL, NULL, 'https://www.tierra.vn/wp-content/uploads/2024/08/NCH8415_3-T.webp', NULL, 'available'),
(45, '33', 'xin chào tất cả các bạn đến với chương trình này hôm nay và mình là cái gì đó, đang có ghi để cái mô tả này dài ơi là dài luôn á buồn ngủ quá trời rồi nè mấy đứa ơi huhuhauhsudaushduasdalsdlkal  asdajsdlf asldfasj ', 100000000, 101, 1, NULL, NULL, 'https://www.tierra.vn/wp-content/uploads/2024/08/NCH1319_3-H.webp', NULL, 'available');

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
-- Chỉ mục cho bảng `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `customer_id` (`customer_id`);

--
-- Chỉ mục cho bảng `order_details`
--
ALTER TABLE `order_details`
  ADD PRIMARY KEY (`order_detail_id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`);

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
  MODIFY `admin_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `cart`
--
ALTER TABLE `cart`
  MODIFY `cart_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;

--
-- AUTO_INCREMENT cho bảng `categories`
--
ALTER TABLE `categories`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `customers`
--
ALTER TABLE `customers`
  MODIFY `customer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT cho bảng `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT cho bảng `order_details`
--
ALTER TABLE `order_details`
  MODIFY `order_detail_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

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
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

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
-- Các ràng buộc cho bảng `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`);

--
-- Các ràng buộc cho bảng `order_details`
--
ALTER TABLE `order_details`
  ADD CONSTRAINT `order_details_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_details_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`);

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
