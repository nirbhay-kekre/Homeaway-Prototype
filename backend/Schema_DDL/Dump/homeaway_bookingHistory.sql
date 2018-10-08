CREATE DATABASE  IF NOT EXISTS `homeaway` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */;
USE `homeaway`;
-- MySQL dump 10.13  Distrib 8.0.12, for macos10.13 (x86_64)
--
-- Host: localhost    Database: homeaway
-- ------------------------------------------------------
-- Server version	8.0.12

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bookingHistory`
--

DROP TABLE IF EXISTS `bookingHistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `bookingHistory` (
  `bookingId` int(11) NOT NULL AUTO_INCREMENT,
  `owner_username` varchar(255) NOT NULL,
  `propertyId` int(11) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `occupants` int(2) NOT NULL,
  `amountPaid` float NOT NULL,
  `buyer_username` varchar(255) NOT NULL,
  PRIMARY KEY (`bookingId`),
  KEY `owner_username_index` (`owner_username`),
  KEY `buyer_username_index` (`buyer_username`),
  KEY `bookingHistory_propertyId` (`propertyId`),
  CONSTRAINT `bookingHistory_buyer_username` FOREIGN KEY (`buyer_username`) REFERENCES `credentials` (`username`),
  CONSTRAINT `bookingHistory_owner_username` FOREIGN KEY (`owner_username`) REFERENCES `credentials` (`username`),
  CONSTRAINT `bookingHistory_propertyId` FOREIGN KEY (`propertyId`) REFERENCES `property` (`propertyid`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookingHistory`
--

LOCK TABLES `bookingHistory` WRITE;
/*!40000 ALTER TABLE `bookingHistory` DISABLE KEYS */;
INSERT INTO `bookingHistory` VALUES (1,'sjsuOwner2@gmail.com',2,'2018-02-01','2018-02-10',5,670,'ravindra.jadeja@bcci.com'),(2,'sjsuOwner2@gmail.com',2,'2018-10-10','2018-10-19',1,670,'ravindra.jadeja@bcci.com'),(3,'sjsuOwner2@gmail.com',1,'2018-10-05','2018-11-01',1,2868.88,'ravindra.jadeja@bcci.com'),(4,'sjsuOwner2@gmail.com',2,'2018-10-20','2018-10-27',1,536,'ravindra.jadeja@bcci.com'),(5,'sjsuOwner2@gmail.com',2,'2018-10-28','2018-11-06',1,670,'ravindra.jadeja@bcci.com'),(6,'sjsuOwner2@gmail.com',2,'2018-10-05','2018-10-05',1,67,'ravindra.jadeja@bcci.com'),(7,'sjsuOwner2@gmail.com',2,'2019-01-01','2019-01-19',1,1273,'ravindra.jadeja@bcci.com'),(8,'sjsuOwner2@gmail.com',2,'2018-10-04','2018-10-04',5,670,'ravindra.jadeja@bcci.com'),(9,'sjsuOwner2@gmail.com',2,'2018-10-07','2018-10-07',1,67,'ravindra.jadeja@bcci.com'),(10,'ravindra.jadeja@bcci.com',21,'2018-10-10','2018-10-24',1,1530,'nirbhay.kekre@dummy.com');
/*!40000 ALTER TABLE `bookingHistory` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-10-07 22:20:26
