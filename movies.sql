-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 11, 2018 at 02:26 PM
-- Server version: 10.1.26-MariaDB
-- PHP Version: 7.1.9

-- SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
-- SET AUTOCOMMIT = 0;
-- START TRANSACTION;
-- SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `moviedb`
--  We firstly need to create our databse called moviedb

CREATE DATABASE moviedb;


-- --------------------------------------------------------

-- --------------------------------------------------------

/*2. Create a table inside the database and name it MOVIES.*/
/*3. The table must contain the following columns :
            a. id
            b. m_title 
            c. director 
            d. year
            e. genre           
*/

--
-- Table structure for table `movies`
-- Use the details below to create our table movies
--

CREATE TABLE `movies` (
  `id` int(255) NOT NULL,
  `m_title` varchar(225) NOT NULL,
  `director` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `year` varchar(4) NOT NULL,
  `genre` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --
-- -- Dumping data for table `movies`
-- --

INSERT INTO `movies` (`id`, `m_title`, `director`, `description`, `year`, `genre`) VALUES
(3, '', 'Peace', '', '0000', 'Action'),
(4, 'The Matrix', 'Gaba Cannal', '', '2000', 'Thriller'),
(5, 'Sicario', 'Zulu Mafia', 'njhsfsgfhdgjsdgfjsdgfjhdsgfjhdgfjgdsjfhdsnufhsifsiyfugsydgfjsgfjhgsfjhsgfjsfhndsifhsudyfryfsrfishfuishiegiusfsegfegif', '2015', 'Action-Thriller'),
(6, 'Sicario', 'nokwazi', 'gfftyftft', '2007', 'Action');

-- --
-- -- Indexes for dumped tables
-- --

-- --
-- -- Indexes for table `movies`
-- --
-- ALTER TABLE `movies`
--   ADD PRIMARY KEY (`id`);

-- --
-- -- AUTO_INCREMENT for dumped tables
-- --

-- --
-- -- AUTO_INCREMENT for table `movies`
-- --
-- ALTER TABLE `movies`
--   MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
-- COMMIT;

-- /*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
-- /*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
-- /*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
