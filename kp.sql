-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 07, 2025 at 01:42 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kp`
--

-- --------------------------------------------------------

--
-- Table structure for table `categori`
--

CREATE TABLE `categori` (
  `idcategori` int(11) NOT NULL,
  `nama_categori` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categori`
--

INSERT INTO `categori` (`idcategori`, `nama_categori`) VALUES
(1, 'Kue Basah'),
(2, 'Kue Kering'),
(3, 'Jajanan Pasar');

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `idcustomer` int(11) NOT NULL,
  `nama` varchar(45) DEFAULT NULL,
  `pengirim` varchar(45) DEFAULT NULL,
  `jenis_pesanan` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`idcustomer`, `nama`, `pengirim`, `jenis_pesanan`) VALUES
(1, 'Andi Nugroho', 'Gojek', 'Online'),
(2, 'Lisa Hartono', 'Langganan', 'Offline'),
(3, 'Rahmat Santoso', 'Grab', 'Online'),
(4, 'Rina Setiawan', 'Admin Kasir', 'PO'),
(5, 'Yohana', 'Gojek', 'Langsung'),
(6, 'Arnold', 'Gosend', 'Reguler'),
(7, 'Wonyoung', 'Gojek', 'Reguler'),
(8, 'Radit', 'Gosend', 'Reguler'),
(9, 'Raditya', 'Gosend', 'Reguler');

-- --------------------------------------------------------

--
-- Table structure for table `detail_pesanan`
--

CREATE TABLE `detail_pesanan` (
  `iddetail_pesanan` int(11) NOT NULL,
  `idpesanan` int(11) NOT NULL,
  `idmenu` int(11) NOT NULL,
  `kuantitas` int(11) DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  `harga_awal` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `detail_pesanan`
--

INSERT INTO `detail_pesanan` (`iddetail_pesanan`, `idpesanan`, `idmenu`, `kuantitas`, `created_at`, `harga_awal`) VALUES
(1, 1, 1, 3, '2025-04-10', 2000),
(2, 1, 2, 1, '2025-04-10', 2500),
(3, 2, 3, 1, '2025-04-11', 3000),
(4, 2, 1, 1, '2025-04-11', 2000),
(5, 3, 2, 3, '2025-05-05', NULL),
(7, 4, 1, 1, '2025-05-05', NULL),
(8, 4, 2, 1, '2025-05-05', NULL),
(9, 4, 3, 1, '2025-05-05', NULL),
(10, 5, 1, 3, '2025-05-05', NULL),
(11, 6, 2, 2, '2025-05-05', NULL),
(12, 7, 1, 1, '2025-05-07', NULL),
(13, 7, 2, 2, '2025-05-07', NULL),
(14, 7, 3, 1, '2025-05-07', NULL),
(15, 8, 1, 1, '2025-05-07', NULL),
(16, 8, 2, 2, '2025-05-07', NULL),
(17, 8, 3, 1, '2025-05-07', NULL),
(18, 9, 3, 1, '2025-05-07', NULL),
(19, 9, 2, 2, '2025-05-07', NULL),
(20, 9, 1, 1, '2025-05-07', NULL),
(21, 10, 1, 1, '2025-05-07', NULL),
(22, 10, 2, 2, '2025-05-07', NULL),
(23, 10, 3, 1, '2025-05-07', NULL),
(24, 11, 1, 1, '2025-05-07', NULL),
(25, 11, 2, 2, '2025-05-07', NULL),
(26, 11, 3, 1, '2025-05-07', NULL),
(27, 12, 1, 2, '2025-06-14', NULL),
(28, 12, 3, 3, '2025-06-14', NULL),
(29, 12, 2, 5, '2025-06-14', NULL),
(30, 13, 1, 1, '2025-06-14', NULL),
(31, 13, 2, 1, '2025-06-14', NULL),
(32, 13, 3, 1, '2025-06-14', NULL),
(33, 14, 1, 3, '2025-06-14', NULL),
(34, 15, 1, 1, '2025-07-05', NULL),
(35, 15, 2, 2, '2025-07-05', NULL),
(36, 15, 3, 1, '2025-07-05', NULL),
(37, 16, 2, 1, '2025-07-05', NULL),
(38, 16, 3, 1, '2025-07-05', NULL),
(39, 16, 1, 1, '2025-07-05', NULL),
(40, 17, 1, 2, '2025-07-05', NULL),
(41, 17, 2, 1, '2025-07-05', NULL),
(42, 18, 2, 2, '2025-07-05', NULL),
(43, 18, 3, 3, '2025-07-05', NULL),
(44, 19, 1, 2, '2025-07-05', NULL),
(45, 19, 2, 1, '2025-07-05', NULL),
(46, 20, 2, 2, '2025-07-05', NULL),
(47, 20, 3, 1, '2025-07-05', NULL),
(48, 21, 1, 3, '2025-07-05', NULL),
(49, 21, 2, 2, '2025-07-05', NULL),
(50, 21, 3, 1, '2025-07-05', NULL),
(51, 22, 1, 2, '2025-07-05', NULL),
(52, 22, 2, 1, '2025-07-05', NULL),
(53, 23, 1, 5, '2025-07-07', NULL),
(54, 23, 3, 15, '2025-07-07', NULL),
(55, 23, 2, 14, '2025-07-07', NULL),
(56, 24, 1, 2, '2025-07-07', NULL),
(57, 24, 2, 3, '2025-07-07', NULL),
(58, 24, 3, 2, '2025-07-07', NULL),
(59, 25, 2, 4, '2025-07-07', NULL),
(60, 25, 1, 2, '2025-07-07', NULL),
(61, 25, 3, 2, '2025-07-07', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `harga`
--

CREATE TABLE `harga` (
  `idharga` int(11) NOT NULL,
  `harga` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `harga`
--

INSERT INTO `harga` (`idharga`, `harga`) VALUES
(1, 2000),
(2, 2500),
(3, 3000);

-- --------------------------------------------------------

--
-- Table structure for table `menu`
--

CREATE TABLE `menu` (
  `idmenu` int(11) NOT NULL,
  `nama` varchar(45) DEFAULT NULL,
  `idcategori` int(11) NOT NULL,
  `idharga` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `menu`
--

INSERT INTO `menu` (`idmenu`, `nama`, `idcategori`, `idharga`) VALUES
(1, 'Klepon', 1, 1),
(2, 'Lemper', 1, 2),
(3, 'Putri Salju', 2, 3);

-- --------------------------------------------------------

--
-- Table structure for table `pembayaran`
--

CREATE TABLE `pembayaran` (
  `idpembayaran` int(11) NOT NULL,
  `idpesanan` int(11) NOT NULL,
  `jumlah_bayar` int(11) NOT NULL,
  `metode` varchar(50) DEFAULT NULL,
  `bukti_bayar` varchar(255) DEFAULT NULL,
  `status` varchar(50) DEFAULT 'Menunggu Verifikasi',
  `tanggal_bayar` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pembayaran`
--

INSERT INTO `pembayaran` (`idpembayaran`, `idpesanan`, `jumlah_bayar`, `metode`, `bukti_bayar`, `status`, `tanggal_bayar`) VALUES
(1, 12, 25500, 'QRIS', 'bukti_1749874478813_155101860.jpg', 'Lunas', '2025-06-14 11:14:38'),
(2, 13, 7500, 'QRIS', 'bukti_1749875529933_537149517.jpg', 'Lunas', '2025-06-14 11:32:09'),
(3, 14, 6000, 'QRIS', 'bukti_1749875846407_602452585.jpg', 'Lunas', '2025-06-14 11:37:26'),
(4, 15, 10000, 'QRIS', 'bukti_1751692036736_453671260.png', 'Lunas', '2025-07-05 12:07:16'),
(5, 16, 7500, 'QRIS', 'bukti_1751694799500_504049403.jpg', 'Lunas', '2025-07-05 12:53:19'),
(6, 22, 6500, 'QRIS', 'bukti_1751733639679_265597159.png', 'Lunas', '2025-07-05 23:40:39'),
(7, 23, 90000, 'QRIS', 'bukti_1751874559444_350020735.png', 'Lunas', '2025-07-07 14:49:19'),
(8, 24, 17500, 'Cash', 'bukti_1751874683468_280777319.png', 'Lunas', '2025-07-07 14:51:23'),
(9, 25, 20000, 'QRIS', 'bukti_1751874747675_896283505.jpg', 'Lunas', '2025-07-07 14:52:27');

-- --------------------------------------------------------

--
-- Table structure for table `pesanan`
--

CREATE TABLE `pesanan` (
  `idpesanan` int(11) NOT NULL,
  `idcustomer` int(11) NOT NULL,
  `created_at` date DEFAULT NULL,
  `waktu_ambil` datetime DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  `harga_total` int(11) DEFAULT NULL,
  `tipe_ambil` varchar(45) DEFAULT NULL,
  `nama_penerima` varchar(100) DEFAULT NULL,
  `telepon_penerima` varchar(20) DEFAULT NULL,
  `alamat_kirim` text DEFAULT NULL,
  `tanggal_kirim` date DEFAULT NULL,
  `jam_kirim` time DEFAULT NULL,
  `kartu_kepada` varchar(100) DEFAULT NULL,
  `kartu_ucapan` text DEFAULT NULL,
  `kartu_dari` varchar(100) DEFAULT NULL,
  `invoice` enum('Ya','Tidak') DEFAULT 'Tidak'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pesanan`
--

INSERT INTO `pesanan` (`idpesanan`, `idcustomer`, `created_at`, `waktu_ambil`, `status`, `harga_total`, `tipe_ambil`, `nama_penerima`, `telepon_penerima`, `alamat_kirim`, `tanggal_kirim`, `jam_kirim`, `kartu_kepada`, `kartu_ucapan`, `kartu_dari`, `invoice`) VALUES
(1, 1, '2025-04-10', '2025-04-10 17:00:00', 'Selesai', 9500, 'Diantar', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Tidak'),
(2, 2, '2025-04-11', '2025-04-11 12:00:00', 'Selesai', 5000, 'Ambil Sendiri', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Tidak'),
(3, 1, '2025-05-05', '2024-05-04 00:00:00', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Tidak'),
(4, 1, '2025-05-05', '2025-05-06 15:54:00', 'proses', 7500, 'langsung', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Tidak'),
(5, 5, '2025-05-05', '2025-05-07 16:00:00', 'proses', 6000, 'langsung', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Tidak'),
(6, 3, '2025-05-05', '2025-05-15 16:01:00', 'proses', 5000, 'langsung', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Tidak'),
(7, 1, '2025-05-07', '2025-05-08 14:23:00', 'proses', 10000, 'langsung', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Tidak'),
(8, 6, '2025-05-07', '2025-05-08 14:24:00', 'proses', 10000, 'langsung', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Tidak'),
(9, 6, '2025-05-07', '2025-05-06 14:26:00', 'proses', 10000, 'langsung', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Tidak'),
(10, 6, '2025-05-07', '2025-05-01 13:31:00', 'proses', 10000, 'langsung', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Tidak'),
(11, 6, '2025-05-07', '2025-05-06 12:32:00', 'proses', 10000, 'langsung', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Tidak'),
(12, 7, '2025-06-14', '2025-06-15 19:05:00', 'Selesai', 25500, 'langsung', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Tidak'),
(13, 6, '2025-06-14', '2025-06-16 10:31:00', 'proses', 7500, 'langsung', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Tidak'),
(14, 5, '2025-06-14', '2025-06-28 11:37:00', 'Selesai', 6000, 'langsung', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Tidak'),
(15, 2, '2025-07-05', '2025-07-05 12:06:00', 'Selesai', 10000, 'langsung', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Tidak'),
(16, 1, '2025-07-05', '2025-07-05 12:51:00', 'Selesai', 7500, 'langsung', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Tidak'),
(17, 2, '2025-07-05', '2025-07-07 10:00:00', 'proses', 6500, 'langsung', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Tidak'),
(18, 3, '2025-07-05', '2025-07-08 14:30:00', 'proses', 14000, 'langsung', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Tidak'),
(19, 2, '2025-07-05', '2025-07-09 10:30:00', 'proses', 6500, 'langsung', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Tidak'),
(20, 4, '2025-07-05', '2025-07-10 15:00:00', 'proses', 8000, 'kirim', 'Siti Aisyah', '082212345678', 'Jl. Kenanga No. 23, Bandar Lampung', '2025-07-10', '15:00:00', 'Bu Siti', 'Selamat ulang tahun, sehat dan bahagia selalu!', 'Keluarga Besar', 'Ya'),
(21, 9, '2025-07-05', '2025-07-05 23:18:00', 'proses', 14000, 'langsung', 'Radit', '081121321', 'Jl Pacitan', '0000-00-00', '00:00:00', 'Wonyoung', 'Selamat', 'Radit', 'Tidak'),
(22, 2, '2025-07-05', '2025-07-10 10:00:00', 'Selesai', 6500, 'langsung', NULL, NULL, NULL, NULL, NULL, 'Yth. Pelanggan', 'Terima kasih atas pesanan Anda.', 'Toko Kue Kami', 'Tidak'),
(23, 7, '2025-07-07', '2025-09-10 14:48:00', 'Selesai', 90000, 'kirim', '', '', '', '2025-09-10', '15:59:00', 'Yujin', 'Selamat', 'Wonyoung', 'Tidak'),
(24, 1, '2025-07-07', '2025-07-07 14:50:00', 'Selesai', 17500, 'langsung', NULL, NULL, NULL, NULL, NULL, 'coba', 'coba', 'andi', 'Tidak'),
(25, 3, '2025-07-07', '2025-09-30 14:51:00', 'Selesai', 20000, 'kirim', 'dwadwa', 'dawdw', 'dwadaw', '2025-09-30', '00:52:00', 'dwada', 'dawdaw', 'dawdwa', 'Tidak');

-- --------------------------------------------------------

--
-- Table structure for table `stock`
--

CREATE TABLE `stock` (
  `idstock` int(11) NOT NULL,
  `idmenu` int(11) NOT NULL,
  `jumlah` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `stock`
--

INSERT INTO `stock` (`idstock`, `idmenu`, `jumlah`) VALUES
(1, 1, 10),
(2, 2, -11),
(3, 3, -9);

-- --------------------------------------------------------

--
-- Table structure for table `stock_keluar`
--

CREATE TABLE `stock_keluar` (
  `idstock_keluar` int(11) NOT NULL,
  `jumlah_keluar` int(11) DEFAULT NULL,
  `tanggal_keluar` datetime DEFAULT NULL,
  `alasan` varchar(45) DEFAULT NULL,
  `idstock` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `stock_keluar`
--

INSERT INTO `stock_keluar` (`idstock_keluar`, `jumlah_keluar`, `tanggal_keluar`, `alasan`, `idstock`) VALUES
(1, 10, '2025-07-03 12:26:00', 'Busuk', 1),
(2, 5, '2025-07-08 12:08:00', 'Kadaluarsa', 2),
(3, 10, '2025-07-05 23:43:00', 'Busuk', 1),
(4, 10, '2025-07-05 23:45:00', 'Busuk', 1);

-- --------------------------------------------------------

--
-- Table structure for table `stock_masuk`
--

CREATE TABLE `stock_masuk` (
  `idstock_masuk` int(11) NOT NULL,
  `jumlah_masuk` int(11) DEFAULT NULL,
  `tanggal_masuk` datetime DEFAULT NULL,
  `idstock` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `stock_masuk`
--

INSERT INTO `stock_masuk` (`idstock_masuk`, `jumlah_masuk`, `tanggal_masuk`, `idstock`) VALUES
(1, 20, '2025-07-03 12:19:00', 1),
(2, 15, '2025-07-05 12:08:00', 2),
(3, 20, '2025-07-05 23:41:00', 1),
(4, 10, '2025-07-05 23:44:00', 1),
(5, 10, '2025-07-05 23:44:00', 1),
(6, 10, '2025-07-07 14:33:00', 2),
(7, 10, '2025-07-07 14:34:00', 3);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `iduser` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(20) DEFAULT 'admin'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`iduser`, `username`, `password`, `role`) VALUES
(3, 'admin1', 'admin12', 'admin'),
(4, 'admin', '$2b$10$4EaHJxDHLCu/rdPZ3621AOBEBRWqcdYvmEATPA440ngn1S4iNl4Ba', 'admin');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categori`
--
ALTER TABLE `categori`
  ADD PRIMARY KEY (`idcategori`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`idcustomer`);

--
-- Indexes for table `detail_pesanan`
--
ALTER TABLE `detail_pesanan`
  ADD PRIMARY KEY (`iddetail_pesanan`),
  ADD KEY `fk_detail_pesanan_menu1_idx` (`idmenu`),
  ADD KEY `fk_detail_pesanan_pesanan1_idx` (`idpesanan`);

--
-- Indexes for table `harga`
--
ALTER TABLE `harga`
  ADD PRIMARY KEY (`idharga`);

--
-- Indexes for table `menu`
--
ALTER TABLE `menu`
  ADD PRIMARY KEY (`idmenu`),
  ADD KEY `fk_menu_categori1_idx` (`idcategori`),
  ADD KEY `fk_menu_harga1_idx` (`idharga`);

--
-- Indexes for table `pembayaran`
--
ALTER TABLE `pembayaran`
  ADD PRIMARY KEY (`idpembayaran`),
  ADD KEY `idpesanan` (`idpesanan`);

--
-- Indexes for table `pesanan`
--
ALTER TABLE `pesanan`
  ADD PRIMARY KEY (`idpesanan`),
  ADD KEY `fk_pesanan_customer_idx` (`idcustomer`);

--
-- Indexes for table `stock`
--
ALTER TABLE `stock`
  ADD PRIMARY KEY (`idstock`),
  ADD KEY `fk_stock_menu1_idx` (`idmenu`);

--
-- Indexes for table `stock_keluar`
--
ALTER TABLE `stock_keluar`
  ADD PRIMARY KEY (`idstock_keluar`),
  ADD KEY `fk_stock_keluar_stock1_idx` (`idstock`);

--
-- Indexes for table `stock_masuk`
--
ALTER TABLE `stock_masuk`
  ADD PRIMARY KEY (`idstock_masuk`),
  ADD KEY `fk_stock_masuk_stock1_idx` (`idstock`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`iduser`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categori`
--
ALTER TABLE `categori`
  MODIFY `idcategori` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `idcustomer` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `detail_pesanan`
--
ALTER TABLE `detail_pesanan`
  MODIFY `iddetail_pesanan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT for table `harga`
--
ALTER TABLE `harga`
  MODIFY `idharga` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `menu`
--
ALTER TABLE `menu`
  MODIFY `idmenu` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `pembayaran`
--
ALTER TABLE `pembayaran`
  MODIFY `idpembayaran` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `pesanan`
--
ALTER TABLE `pesanan`
  MODIFY `idpesanan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `stock`
--
ALTER TABLE `stock`
  MODIFY `idstock` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `stock_keluar`
--
ALTER TABLE `stock_keluar`
  MODIFY `idstock_keluar` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `stock_masuk`
--
ALTER TABLE `stock_masuk`
  MODIFY `idstock_masuk` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `iduser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `detail_pesanan`
--
ALTER TABLE `detail_pesanan`
  ADD CONSTRAINT `fk_detail_pesanan_menu1` FOREIGN KEY (`idmenu`) REFERENCES `menu` (`idmenu`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_detail_pesanan_pesanan1` FOREIGN KEY (`idpesanan`) REFERENCES `pesanan` (`idpesanan`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `menu`
--
ALTER TABLE `menu`
  ADD CONSTRAINT `fk_menu_categori1` FOREIGN KEY (`idcategori`) REFERENCES `categori` (`idcategori`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_menu_harga1` FOREIGN KEY (`idharga`) REFERENCES `harga` (`idharga`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `pembayaran`
--
ALTER TABLE `pembayaran`
  ADD CONSTRAINT `pembayaran_ibfk_1` FOREIGN KEY (`idpesanan`) REFERENCES `pesanan` (`idpesanan`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `pesanan`
--
ALTER TABLE `pesanan`
  ADD CONSTRAINT `fk_pesanan_customer` FOREIGN KEY (`idcustomer`) REFERENCES `customer` (`idcustomer`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `stock`
--
ALTER TABLE `stock`
  ADD CONSTRAINT `fk_stock_menu1` FOREIGN KEY (`idmenu`) REFERENCES `menu` (`idmenu`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `stock_keluar`
--
ALTER TABLE `stock_keluar`
  ADD CONSTRAINT `fk_stock_keluar_stock1` FOREIGN KEY (`idstock`) REFERENCES `stock` (`idstock`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `stock_masuk`
--
ALTER TABLE `stock_masuk`
  ADD CONSTRAINT `fk_stock_masuk_stock1` FOREIGN KEY (`idstock`) REFERENCES `stock` (`idstock`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
