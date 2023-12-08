-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: localhost
-- Thời gian đã tạo: Th12 08, 2023 lúc 06:35 PM
-- Phiên bản máy phục vụ: 10.4.28-MariaDB
-- Phiên bản PHP: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `zalo_api`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `api`
--

CREATE TABLE `api` (
  `id` int(11) NOT NULL,
  `accessToken` text NOT NULL,
  `refreshToken` text NOT NULL,
  `secretKey` text NOT NULL,
  `appId` text NOT NULL,
  `createdDate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Đang đổ dữ liệu cho bảng `api`
--

INSERT INTO `api` (`id`, `accessToken`, `refreshToken`, `secretKey`, `appId`, `createdDate`) VALUES
(1, '8F9g54FjJHuhzseKIU1E6I3yR1zVcZrlTkuQC1A4PdiKqZ0CTBrwVN2W8H5--4LtTUCF2Wc6ItfgnH9qIQ9YC7JZ84HTz5qFO9GXLMJ9PoXueXfq7STCCXQBEajpuHaNSBPp16BB9dvIftuQQlqRNNtbK0f2ZH5SNSiq2rwc575wrs0QKhOxT4tRVYLKWGPGLPTQNa7i1rD3h4qwFzGOL2-8CWqBzqG7RujdUt7G9tn7h0CpPhPUG0Nz50WwXanX6FiSRJsTT6jV-oeaJwTHQ6ka3nfsmIr-4u8FBnRYRNWtW0Sf8UedUnoCR78Vu1GB5AXV30_XFWGEa5HhQeTq8c_yD7jdgnymNCvCV5s96ZL7ma9JT889MshsJJnXwIj408HHDocJ9JW1pmLE1DCZG5THBX8-HV9170', 't-Oi6xxIvHxKuomRjD_c6T_eAX2Yt9TMgPib4RRfwMYoj60ijeBNJzIoM2_Bs-vyh9PHA9AX_I-ObZHQa_2d3fMJCW-eq81_afeOFO3kbKF-fZaK-fMmRy7RU0xgjSWB-zfCTjkO_dJWp4ysqfxxOkJNGHJ1XFzArBHn0Utkn5cCYKyljyc5CxR-JZ2Bri9mduT4TFswbIdOZICXmEQKSj2GAGV6fBXQfkib1xE1hNsgmmLyZf2GFONRNa3Wyv4GtAaiKEIOuYV_f6nOmStPBTk2O7txiUb-n_8Z5_24xdMIudeoyz_HQD2eTmck_x9Pbf440wFOpWN0XGD3nUUk1wElDMIAcAndk-qAFBU4pdUMw6CrYghHSw7uO2wuayyhXCSBGw7niolAZI18s-6oCVwnB7TMHLTJ1VmnkCtf70', 'WQ4RWSco6ITVuTLRNwGZ', '962154945439638208', '2023-12-08 16:00:34');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `api`
--
ALTER TABLE `api`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `api`
--
ALTER TABLE `api`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
