-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 06, 2025 at 06:48 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `beach_project`
--

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

CREATE TABLE `feedback` (
  `id` int(11) NOT NULL,
  `user_email` varchar(100) DEFAULT NULL,
  `rating` int(11) DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `submitted_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `feedback`
--

INSERT INTO `feedback` (`id`, `user_email`, `rating`, `category`, `message`, `submitted_at`) VALUES
(1, 'sushmitha1823@gmail.com', 5, 'General Comment', 'good', '2025-06-23 07:52:55'),
(2, 'sushmitha1823@gmail.com', 3, 'General Comment', 'df', '2025-06-26 06:33:43'),
(3, 'sushmitha1823@gmail.com', 3, 'Feature Request', 'gfd', '2025-06-26 06:59:41'),
(4, 'sushmitha1823@gmail.com', 5, 'General Comment', 'goood', '2025-07-05 11:16:18');

-- --------------------------------------------------------

--
-- Table structure for table `plans`
--

CREATE TABLE `plans` (
  `id` int(11) NOT NULL,
  `user_email` varchar(100) DEFAULT NULL,
  `beaches` text DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `plans`
--

INSERT INTO `plans` (`id`, `user_email`, `beaches`, `start_date`, `end_date`) VALUES
(1, 'sushmitha1823@gmail.com', 'Rama Krishna', '2025-06-24', '2025-06-28'),
(2, 'sushmitha1823@gmail.com', 'Kovalam beach', '2025-06-25', '2025-06-28'),
(3, 'sushmitha1823@gmail.com', 'Kovalam beach', '2025-06-25', '2025-06-28'),
(4, 'sushmitha1823@gmail.com', 'Gopalpur', '2025-06-18', '2025-06-30'),
(5, 'sushmitha1823@gmail.com', 'Mandarmani', '2025-06-27', '2025-06-28'),
(6, 'sushmitha1823@gmail.com', 'Chandrabhaga', '2025-06-26', '2025-06-30'),
(7, 'sushmitha1823@gmail.com', 'Rama Krishna', '2025-06-26', '2025-06-30'),
(8, 'sushmitha1823@gmail.com', 'Rama Krishna', '2025-06-27', '2025-06-30'),
(9, 'sushmitha1823@gmail.com', 'Rama Krishna', '2025-06-27', '2025-06-30'),
(10, 'sushmitha1823@gmail.com', 'Rama Krishna', '2025-06-27', '2025-06-30'),
(11, 'sushmitha1823@gmail.com', 'Diu', '2025-06-28', '2025-06-30'),
(12, 'sushmitha1823@gmail.com', 'Mandarmani', '2025-06-27', '2025-06-30'),
(13, 'sushmitha1823@gmail.com', 'Kudle', '2025-06-27', '2025-06-30'),
(14, 'sushmitha1823@gmail.com', 'Alleppey beach', '2025-06-27', '2025-06-30'),
(15, 'sushmitha1823@gmail.com', 'Alleppey beach', '2025-06-27', '2025-06-30'),
(16, 'sushmitha1823@gmail.com', 'Tarkarli', '2025-06-27', '2025-07-02'),
(17, 'sushmitha1823@gmail.com', 'Kudle', '2025-06-27', '2025-06-30'),
(18, 'sushmitha1823@gmail.com', 'Kashid', '2025-06-27', '2025-06-30'),
(19, 'sushmitha1823@gmail.com', 'Kudle', '2025-06-27', '2025-07-03'),
(20, 'sushmitha1823@gmail.com', 'Rama Krishna', '2025-06-27', '2025-06-30'),
(21, 'sushmitha1823@gmail.com', 'Rama Krishna', '2025-06-27', '2025-06-30'),
(22, 'sushmitha1823@gmail.com', 'Rama Krishna', '2025-06-27', '2025-06-30'),
(23, 'sushmitha1823@gmail.com', 'Bheemunipatnam', '2025-06-27', '2025-06-30'),
(24, 'sushmitha1823@gmail.com', 'Bheemunipatnam', '2025-06-28', '2025-06-30'),
(25, 'sushmitha1823@gmail.com', 'Bheemunipatnam', '2025-06-28', '2025-06-30'),
(26, 'sushmitha1823@gmail.com', 'Chandrabhaga', '2025-06-28', '2025-06-30'),
(27, 'sushmitha1823@gmail.com', 'Tajpur', '2025-06-27', '2025-06-30'),
(28, 'sushmitha1823@gmail.com', 'Digha', '2025-06-27', '2025-06-30'),
(29, 'sushmitha1823@gmail.com', 'Tarkarli', '2025-06-27', '2025-06-30'),
(30, 'sushmitha1823@gmail.com', 'Mandarmani', '2025-07-07', '2025-07-12');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`) VALUES
(1, 'sushma22@gmail.com', '123'),
(2, 'sushmitha022@gmail.com', '1234'),
(3, 'sushmitha1823@gmail.com', '12345');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `plans`
--
ALTER TABLE `plans`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `feedback`
--
ALTER TABLE `feedback`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `plans`
--
ALTER TABLE `plans`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
