-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 12-05-2016 a las 01:13:09
-- Versión del servidor: 10.1.10-MariaDB
-- Versión de PHP: 7.0.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `restaurante`
--

DELIMITER $$
--
-- Funciones
--
CREATE DEFINER=`root`@`localhost` FUNCTION `TotalFactura` (`id` INT(10)) RETURNS DOUBLE READS SQL DATA
RETURN (
  SELECT SUM(precio * cantidad)
  FROM   pedidoproductos
  WHERE  idPEDIDOS = id
  limit 1
)$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidoproductos`
--

CREATE TABLE `pedidoproductos` (
  `id` int(11) NOT NULL,
  `idPRODUCTOS` int(11) DEFAULT NULL,
  `idPEDIDOS` int(11) DEFAULT NULL,
  `cantidad` int(11) NOT NULL,
  `precio` double NOT NULL,
  `num_mesa` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `pedidoproductos`
--

INSERT INTO `pedidoproductos` (`id`, `idPRODUCTOS`, `idPEDIDOS`, `cantidad`, `precio`, `num_mesa`) VALUES
(17, 3, 68, 2, 2, 2),
(18, 5, 68, 3, 1.8, 2),
(19, 3, 68, 4, 2, 2),
(20, 5, 68, 5, 1.8, 2),
(21, 2, 72, 2, 2, 2),
(22, 4, 72, 6, 1.8, 2),
(23, 6, 72, 7, 10, 2),
(24, 2, 73, 4, 2, 2),
(25, 3, 73, 5, 2, 2),
(26, 3, 74, 4, 2, 2),
(27, 5, 74, 5, 1.8, 2),
(28, 3, 74, 2, 2, 2),
(29, 5, 74, 4, 1.8, 2),
(30, 6, 74, 2, 10, 2),
(31, 4, 74, 2, 1.8, 2),
(32, 4, 74, 2, 1.8, 2),
(33, 2, 74, 2, 2, 2),
(34, 2, 75, 3, 2, 2),
(35, 3, 75, 2, 2, 2),
(36, 6, 75, 2, 10, 2),
(37, 3, 75, 2, 2, 2),
(38, 5, 75, 2, 1.8, 2),
(39, 6, 75, 2, 10, 2),
(40, 4, 75, 2, 1.8, 2),
(41, 6, 75, 2, 10, 2),
(42, 3, 75, 2, 2, 2),
(43, 2, 75, 2, 2, 2),
(44, 3, 75, 2, 2, 2),
(45, 3, 75, 2, 2, 2),
(46, 4, 75, 2, 1.8, 2),
(47, 3, 75, 2, 2, 2),
(48, 2, 75, 2, 2, 2),
(49, 4, 75, 4, 1.8, 2),
(50, 2, 75, 2, 2, 2),
(51, 3, 75, 2, 2, 2),
(52, 2, 75, 2, 2, 2),
(53, 4, 75, 2, 1.8, 2),
(54, 3, 75, 2, 2, 2),
(55, 2, 75, 2, 2, 2),
(56, 3, 75, 3, 2, 2),
(57, 4, 75, 2, 1.8, 2),
(58, 5, 75, 2, 1.8, 2),
(59, 3, 75, 2, 2, 2),
(60, 4, 75, 2, 1.8, 2),
(61, 3, 75, 2, 2, 2),
(62, 3, 75, 2, 2, 2),
(63, 4, 75, 2, 1.8, 2),
(64, 5, 75, 2, 1.8, 2),
(65, 2, 75, 2, 2, 2),
(66, 3, 75, 2, 2, 2),
(67, 3, 75, 2, 2, 2),
(68, 7, 75, 2, 20, 2),
(69, 4, 75, 2, 1.8, 2),
(70, 4, 75, 2, 1.8, 2),
(71, 3, 75, 2, 2, 2),
(72, 4, 75, 2, 1.8, 2),
(73, 2, 75, 2, 2, 2),
(74, 4, 75, 2, 1.8, 2),
(75, 3, 75, 2, 2, 2),
(76, 3, 75, 2, 2, 2),
(77, 4, 75, 2, 1.8, 2),
(78, 3, 75, 2, 2, 2),
(79, 2, 75, 2, 2, 2),
(80, 5, 75, 2, 1.8, 2),
(81, 4, 75, 2, 1.8, 2),
(82, 3, 75, 2, 2, 2),
(83, 2, 75, 2, 2, 2),
(84, 3, 75, 2, 2, 2),
(85, 4, 75, 2, 1.8, 2),
(86, 3, 75, 2, 2, 2),
(87, 3, 75, 2, 2, 2),
(88, 4, 75, 2, 1.8, 2),
(89, 3, 75, 2, 2, 2),
(90, 4, 75, 2, 1.8, 2),
(91, 5, 75, 3, 1.8, 2),
(92, 2, 75, 2, 2, 2),
(93, 3, 75, 2, 2, 2),
(94, 2, 75, 2, 2, 2),
(95, 3, 75, 2, 2, 2),
(96, 3, 75, 2, 2, 2),
(97, 4, 75, 2, 1.8, 2),
(98, 3, 75, 2, 2, 2),
(99, 6, 75, 4, 10, 2),
(100, 3, 75, 4, 2, 2),
(101, 5, 75, 5, 1.8, 2),
(102, 4, 75, 2, 1.8, 2),
(103, 6, 75, 4, 10, 2),
(104, 5, 75, 2, 1.8, 2),
(105, 6, 75, 4, 10, 2),
(106, 3, 75, 5, 2, 2),
(107, 5, 75, 7, 1.8, 2),
(108, 3, 75, 7, 2, 2),
(109, 5, 75, 8, 1.8, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `id` int(11) NOT NULL,
  `fecha` varchar(25) NOT NULL,
  `Importe` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `pedidos`
--

INSERT INTO `pedidos` (`id`, `fecha`, `Importe`) VALUES
(1, '30/4/2016', 80),
(2, '30/4/2016', 80),
(3, '2/5/2016', 80),
(4, '2/5/2016', 80),
(5, '2/5/2016', 80),
(6, '2/5/2016', 80),
(7, '2/5/2016', 80),
(8, '2/5/2016', 80),
(9, '2/5/2016', 80),
(10, '2/5/2016', 80),
(11, '2/5/2016', 80),
(12, '2/5/2016', 80),
(13, '2/5/2016', 80),
(14, '2/5/2016', 80),
(15, '2/5/2016', 80),
(16, '2/5/2016', 80),
(17, '2/5/2016', 80),
(18, '2/5/2016', 80),
(28, '3/5/2016', 80),
(29, '3/5/2016', 80),
(30, '6/5/2016', 80),
(31, '7/5/2016', 80),
(32, '7/5/2016', 80),
(33, '7/5/2016', 80),
(34, '7/5/2016', 80),
(35, '7/5/2016', 80),
(36, '7/5/2016', 80),
(37, '7/5/2016', 80),
(38, '7/5/2016', 80),
(39, '7/5/2016', 80),
(40, '7/5/2016', 80),
(41, '7/5/2016', 80),
(42, '7/5/2016', 80),
(43, '7/5/2016', 80),
(44, '7/5/2016', 80),
(45, '7/5/2016', 80),
(46, '7/5/2016', 80),
(47, '7/5/2016', 80),
(48, '7/5/2016', 80),
(49, '7/5/2016', 80),
(50, '7/5/2016', 80),
(51, '7/5/2016', 80),
(52, '7/5/2016', 80),
(53, '7/5/2016', 80),
(54, '7/5/2016', 80),
(55, '7/5/2016', 80),
(56, '8/5/2016', 80),
(57, '8/5/2016', 80),
(58, '8/5/2016', 80),
(59, '8/5/2016', 80),
(60, '8/5/2016', 80),
(61, '8/5/2016', 80),
(62, '8/5/2016', 80),
(63, '8/5/2016', 80),
(64, '8/5/2016', 80),
(65, '8/5/2016', 80),
(66, '8/5/2016', 80),
(67, '8/5/2016', 80),
(68, '8/5/2016', 80),
(69, '9/5/2016', 80),
(70, '9/5/2016', 80),
(71, '9/5/2016', 80),
(72, '11/5/2016', 80),
(73, '11/5/2016', 80),
(74, '11/5/2016', 80),
(75, '11/5/2016', 41024.8);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(25) NOT NULL,
  `precio` double NOT NULL,
  `tipo` enum('Comida','Bebida') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `nombre`, `precio`, `tipo`) VALUES
(2, 'Coca cola', 2, 'Bebida'),
(3, 'nestea', 2, 'Bebida'),
(4, 'fanta de naranja', 1.8, 'Bebida'),
(5, 'Pepsi', 1.8, 'Bebida'),
(6, 'ensalada', 10, 'Comida'),
(7, 'entrecot de ternera', 20, 'Comida');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `pedidoproductos`
--
ALTER TABLE `pedidoproductos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idPRODUCTOS` (`idPRODUCTOS`),
  ADD KEY `idPEDIDOS` (`idPEDIDOS`);

--
-- Indices de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `pedidoproductos`
--
ALTER TABLE `pedidoproductos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=110;
--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;
--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `pedidoproductos`
--
ALTER TABLE `pedidoproductos`
  ADD CONSTRAINT `pedidoproductos_ibfk_1` FOREIGN KEY (`idPRODUCTOS`) REFERENCES `productos` (`id`),
  ADD CONSTRAINT `pedidoproductos_ibfk_2` FOREIGN KEY (`idPEDIDOS`) REFERENCES `pedidos` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
