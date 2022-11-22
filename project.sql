-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2022-11-22 13:39:54
-- 伺服器版本： 10.4.19-MariaDB
-- PHP 版本： 8.0.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `project`
--

-- --------------------------------------------------------

--
-- 資料表結構 `activity`
--

CREATE TABLE `activity` (
  `aID` int(11) NOT NULL,
  `uID` int(11) NOT NULL,
  `activity_name` varchar(20) NOT NULL,
  `start_activity_time` timestamp NULL DEFAULT NULL,
  `finish_activity_time` timestamp NULL DEFAULT NULL,
  `activity_time` datetime DEFAULT NULL,
  `tID` int(11) NOT NULL,
  `warning_distance` int(11) NOT NULL,
  `warning_time` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `activity`
--

INSERT INTO `activity` (`aID`, `uID`, `activity_name`, `start_activity_time`, `finish_activity_time`, `activity_time`, `tID`, `warning_distance`, `warning_time`) VALUES
(68, 9, 'happy go', NULL, NULL, NULL, 1, 50, 15),
(69, 9, 'happy go', NULL, NULL, '0000-00-00 00:00:00', 1, 50, 15),
(70, 9, 'happy go', NULL, NULL, '0000-00-00 00:00:00', 1, 50, 15),
(71, 9, 'happy go', NULL, NULL, '2022-10-30 14:37:00', 1, 50, 15),
(72, 9, 'happy go', NULL, '2022-11-11 22:36:17', NULL, 1, 50, 15),
(73, 9, 'happy', NULL, NULL, '2022-10-30 14:37:00', 1, 50, 15),
(74, 9, 'happy', NULL, NULL, '2022-10-30 14:37:00', 1, 50, 15),
(75, 9, 'happy', NULL, NULL, '2022-10-30 14:37:00', 1, 50, 15),
(76, 9, 'happy', NULL, NULL, '2022-10-30 14:37:00', 1, 50, 15),
(77, 9, 'happy', NULL, NULL, '2022-10-30 14:37:00', 1, 50, 15),
(78, 9, 'happy', NULL, NULL, '2022-10-30 14:37:00', 1, 50, 15),
(79, 9, 'happy', '2022-11-11 22:42:20', NULL, '2022-10-30 14:37:00', 1, 50, 15),
(80, 9, 'happy', '2022-11-11 23:36:45', '2022-11-11 23:19:19', '0000-00-00 00:00:00', 1, 50, 15),
(81, 9, 'happy', '2022-11-11 23:38:42', NULL, '2022-10-30 14:37:00', 1, 50, 15),
(82, 9, 'happy', NULL, NULL, '2022-10-30 14:37:00', 1, 50, 15),
(83, 9, 'happy', NULL, NULL, '2022-10-30 14:37:00', 1, 50, 15),
(84, 9, 'happy', NULL, NULL, '2022-10-30 14:37:00', 1, 50, 15),
(85, 9, 'happy', NULL, NULL, '2022-10-30 14:37:00', 1, 50, 15),
(86, 9, 'happy', '2022-11-17 19:59:58', NULL, '2022-10-30 14:37:00', 1, 50, 15),
(87, 9, 'happy', '2022-11-17 20:19:45', '2022-11-17 20:20:10', '0000-00-00 00:00:00', 1, 50, 15),
(88, 9, 'happy', NULL, NULL, '2022-10-30 14:37:00', 1, 50, 15),
(89, 9, 'update work', NULL, NULL, '2022-11-30 14:37:00', 2, 100, 150);

-- --------------------------------------------------------

--
-- 資料表結構 `activity_member`
--

CREATE TABLE `activity_member` (
  `mID` int(11) NOT NULL,
  `aID` int(11) NOT NULL,
  `uID` int(11) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `activity_member`
--

INSERT INTO `activity_member` (`mID`, `aID`, `uID`, `status`) VALUES
(1, 3, 0, 0),
(2, 4, 1, 0),
(3, 6, 1, 0),
(4, 6, 3, 0),
(5, 6, 2, 0),
(6, 6, 1, 0),
(7, 7, 1, 0),
(8, 7, 2, 0),
(9, 7, 1, 0),
(10, 7, 3, 0),
(11, 8, 1, 0),
(12, 8, 1, 0),
(13, 8, 2, 0),
(14, 8, 3, 0),
(15, 9, 1, 0),
(16, 9, 1, 0),
(17, 9, 2, 0),
(18, 9, 3, 0),
(19, 10, 1, 0),
(20, 10, 3, 0),
(21, 10, 1, 0),
(22, 10, 2, 0),
(23, 11, 1, 0),
(24, 12, 1, 0),
(25, 13, 1, 0),
(26, 13, 2, 0),
(27, 13, 3, 0),
(28, 13, 1, 0),
(29, 14, 9, 0),
(30, 14, 10, 0),
(31, 14, 1, 0),
(32, 15, 9, 0),
(33, 15, 10, 0),
(34, 15, 1, 0),
(35, 16, 9, 0),
(36, 16, 10, 0),
(37, 16, 1, 0),
(38, 17, 9, 0),
(39, 17, 1, 0),
(40, 17, 10, 0),
(41, 18, 9, 0),
(42, 18, 10, 0),
(43, 19, 9, 0),
(44, 19, 10, 0),
(45, 20, 9, 0),
(46, 20, 10, 0),
(47, 21, 9, 0),
(48, 21, 10, 0),
(49, 22, 9, 0),
(50, 22, 10, 0),
(51, 23, 9, 0),
(52, 23, 10, 0),
(53, 24, 9, 0),
(54, 24, 10, 0),
(55, 25, 9, 0),
(56, 25, 10, 0),
(57, 26, 9, 0),
(58, 26, 10, 0),
(59, 27, 9, 0),
(60, 27, 10, 0),
(61, 28, 9, 0),
(62, 28, 10, 0),
(63, 29, 9, 0),
(64, 29, 10, 0),
(65, 30, 9, 0),
(66, 30, 10, 0),
(67, 31, 9, 0),
(68, 31, 10, 0),
(69, 32, 9, 0),
(70, 32, 10, 0),
(71, 33, 9, 0),
(72, 33, 10, 0),
(73, 34, 9, 0),
(74, 34, 10, 0),
(75, 35, 9, 0),
(76, 35, 10, 0),
(77, 36, 9, 0),
(78, 36, 10, 0),
(79, 37, 10, 0),
(80, 37, 9, 0),
(81, 38, 9, 0),
(82, 38, 10, 0),
(83, 39, 9, 0),
(84, 39, 10, 0),
(85, 40, 9, 0),
(86, 40, 10, 0),
(87, 41, 9, 0),
(88, 41, 10, 0),
(89, 42, 9, 0),
(90, 42, 10, 0),
(91, 43, 9, 0),
(92, 43, 10, 0),
(93, 44, 9, 0),
(94, 44, 10, 0),
(95, 45, 9, 0),
(96, 45, 10, 0),
(97, 46, 9, 0),
(98, 46, 10, 0),
(99, 47, 9, 0),
(100, 47, 10, 0),
(101, 48, 9, 0),
(102, 48, 10, 0),
(103, 49, 9, 0),
(104, 49, 10, 0),
(105, 50, 9, 0),
(106, 51, 9, 0),
(107, 52, 9, 0),
(108, 52, 10, 0),
(109, 53, 9, 0),
(110, 53, 10, 0),
(111, 54, 9, 0),
(112, 54, 10, 0),
(113, 55, 9, 0),
(114, 55, 10, 0),
(115, 56, 9, 0),
(116, 56, 10, 0),
(117, 57, 9, 0),
(118, 57, 10, 0),
(119, 58, 9, 0),
(120, 58, 10, 0),
(121, 59, 9, 0),
(122, 59, 10, 0),
(123, 60, 9, 0),
(124, 60, 10, 0),
(125, 61, 9, 0),
(126, 61, 10, 0),
(127, 62, 9, 0),
(128, 62, 10, 0),
(129, 63, 9, 0),
(130, 63, 10, 0),
(131, 64, 9, 0),
(132, 64, 10, 0),
(133, 65, 9, 0),
(134, 65, 10, 0),
(135, 66, 9, 0),
(136, 66, 10, 0),
(137, 67, 9, 0),
(138, 67, 10, 0),
(139, 68, 9, 0),
(140, 68, 10, 0),
(141, 69, 9, 0),
(142, 69, 10, 0),
(143, 70, 9, 0),
(144, 70, 10, 0),
(145, 71, 9, 0),
(146, 71, 11, 0),
(147, 71, 10, 0),
(148, 72, 9, 0),
(149, 72, 10, 0),
(150, 72, 11, 0),
(151, 73, 9, 0),
(152, 73, 10, 0),
(153, 73, 11, 0),
(154, 77, 19, 0),
(155, 77, 24, 0),
(156, 78, 19, 0),
(157, 78, 24, 0),
(158, 79, 19, 1),
(159, 79, 24, 1),
(160, 80, 10, 1),
(161, 80, 11, 1),
(162, 81, 10, 1),
(163, 81, 9, 1),
(164, 82, 9, 0),
(165, 82, 10, 0),
(166, 83, 9, 0),
(167, 83, 10, 0),
(168, 84, 9, 0),
(169, 84, 10, 0),
(170, 85, 9, 0),
(171, 85, 10, 0),
(172, 86, 9, 1),
(173, 86, 10, 1),
(174, 87, 9, 0),
(175, 87, 10, 0),
(176, 88, 9, 0),
(177, 88, 10, 0),
(178, 89, 9, 0),
(179, 89, 10, 0);

-- --------------------------------------------------------

--
-- 資料表結構 `friend`
--

CREATE TABLE `friend` (
  `fID` int(11) NOT NULL,
  `uID1` int(11) NOT NULL,
  `uID2` int(11) NOT NULL,
  `time` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `friend`
--

INSERT INTO `friend` (`fID`, `uID1`, `uID2`, `time`, `status`) VALUES
(17, 9, 10, '2022-09-01 16:44:51', 0),
(18, 10, 9, '2022-09-01 16:44:51', 0),
(19, 9, 11, '2022-09-01 16:47:19', 0),
(20, 11, 9, '2022-09-01 16:47:19', 0),
(24, 2, 9, '2022-11-09 15:27:17', 0),
(25, 9, 2, '2022-11-20 12:43:35', 0),
(26, 2, 9, '2022-11-20 12:43:58', 0),
(30, 9, 12, '2022-11-20 15:26:53', 1);

-- --------------------------------------------------------

--
-- 資料表結構 `member`
--

CREATE TABLE `member` (
  `uID` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `account` varchar(20) NOT NULL,
  `password` varchar(200) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phone` varchar(10) NOT NULL,
  `time` timestamp NOT NULL DEFAULT current_timestamp(),
  `total_distance` int(11) NOT NULL DEFAULT 0,
  `total_time` int(11) NOT NULL DEFAULT 0,
  `total_activity` int(11) NOT NULL DEFAULT 0,
  `total_track` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `member`
--

INSERT INTO `member` (`uID`, `name`, `account`, `password`, `email`, `phone`, `time`, `total_distance`, `total_time`, `total_activity`, `total_track`) VALUES
(1, '蕭XX', 'john', 'john', 'j@j', '0908186189', '2022-07-02 09:08:32', 1, 1, 0, 0),
(2, '蕭XX', 'john', 'john', 'j@j', '911111111', '2022-07-02 09:08:39', 0, 0, 0, 0),
(3, '蕭XX', 'john', 'john', 'j@j', '911111111', '2022-07-02 09:09:59', 0, 0, 0, 0),
(4, '蕭XX', 'john', 'john', 'j@j', '911111111', '2022-07-02 09:15:57', 0, 0, 0, 0),
(5, '蕭XX', 'john', 'john', 'j@j', '911111111', '2022-07-02 09:16:52', 0, 0, 0, 0),
(6, '蕭XX', 'john', 'john', 'j@j', '911111111', '2022-07-02 09:17:20', 0, 0, 0, 0),
(7, '蕭仲停', 'john', 'john', 'j@h', '912345678', '2022-07-02 09:19:20', 0, 0, 0, 0),
(8, '蕭仲停', 'john', 'john', 'j@h', '912345678', '2022-07-02 09:20:09', 0, 0, 0, 0),
(9, '蕭仲停', 'john1', 'john', 'j@h', '912345678', '2022-07-02 09:54:55', 1, 1, 1, 1),
(10, '蕭仲停', 'l', 'l', 'j@h', '912345678', '2022-07-02 09:20:09', 0, 0, 0, 0),
(11, '蕭仲停', 'john123', 'john', 'j@h', '912345678', '2022-07-02 09:54:55', 1, 1, 1, 1),
(12, 'lo', 'lo', 'lo', 'l@l', '096673957', '2022-09-27 17:30:02', 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- 資料表結構 `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- 資料表結構 `track`
--

CREATE TABLE `track` (
  `tID` int(11) NOT NULL,
  `uID` int(11) NOT NULL,
  `track_name` varchar(20) NOT NULL,
  `track_locate` varchar(20) DEFAULT NULL,
  `start` datetime DEFAULT NULL,
  `finish` datetime DEFAULT NULL,
  `total_distance` int(11) NOT NULL,
  `time` timestamp NOT NULL DEFAULT current_timestamp(),
  `track_type` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `track`
--

INSERT INTO `track` (`tID`, `uID`, `track_name`, `track_locate`, `start`, `finish`, `total_distance`, `time`, `track_type`) VALUES
(1, 9, 'john1', 'john.txt', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 196, '2022-08-30 08:24:56', 0),
(2, 9, 'l', '/bin/', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 196, '2022-08-30 08:25:36', 0),
(5, 9, 'john1', '/bin/', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 196, '2022-09-01 14:04:28', 0),
(6, 9, 'john1', '/bin/', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 196, '2022-09-01 14:04:42', 0),
(7, 9, 'john1', '/bin/', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 196, '2022-10-09 09:39:32', 0);

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `activity`
--
ALTER TABLE `activity`
  ADD PRIMARY KEY (`aID`);

--
-- 資料表索引 `activity_member`
--
ALTER TABLE `activity_member`
  ADD PRIMARY KEY (`mID`);

--
-- 資料表索引 `friend`
--
ALTER TABLE `friend`
  ADD PRIMARY KEY (`fID`);

--
-- 資料表索引 `member`
--
ALTER TABLE `member`
  ADD PRIMARY KEY (`uID`);

--
-- 資料表索引 `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- 資料表索引 `track`
--
ALTER TABLE `track`
  ADD PRIMARY KEY (`tID`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `activity`
--
ALTER TABLE `activity`
  MODIFY `aID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=90;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `activity_member`
--
ALTER TABLE `activity_member`
  MODIFY `mID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=180;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `friend`
--
ALTER TABLE `friend`
  MODIFY `fID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `member`
--
ALTER TABLE `member`
  MODIFY `uID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `track`
--
ALTER TABLE `track`
  MODIFY `tID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
