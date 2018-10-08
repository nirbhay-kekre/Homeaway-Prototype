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
-- Table structure for table `credentials`
--

DROP TABLE IF EXISTS `credentials`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `credentials` (
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(10) NOT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `credentials`
--

LOCK TABLES `credentials` WRITE;
/*!40000 ALTER TABLE `credentials` DISABLE KEYS */;
INSERT INTO `credentials` VALUES ('nirbhay.kekre@dummy.com','$2b$10$Cuqkqej8drg1t5PaBZzHzONRJLBV7VGZwiJEwgSBfRensZtMNKXZG','traveler'),('nirbhay@gmail.com','$2b$10$NScFbpVPjjdnbQSvZA3Tsea4BJaUPDjDo1vGOiQBcsI5ng6moZr36','traveler'),('ravindra.jadeja@bcci.com','$2b$10$3EPPrR/1tNwApkDbVnKzNess44c01ZxJXPm.1k.xgDPa4n5weA36e','both'),('rohitSharma@bcci.com','$2b$10$yR4q7MV5EO8aT7fyejs9WOthpONfhWQhAbzDJHwhhKx20jO1rhcXS','traveler'),('sjsuOwner@gmail.com','$2b$10$3/nR6Dlx1T2CvOAml3Eby..kdnH0i9VxfFBWj7cD/WBuZl4KCK2qm','owner'),('sjsuOwner2@gmail.com','$2b$10$KtCd87pzeJSbcuaYedZ8V.fokMjoFQrQ0sdavvleTGIuFelEoKG9m','owner'),('sjsuTraveler@gmail.com','$2b$10$r/6z1WOVZi.vnU3MSAOmtuSqmTAscoNwK.Je3QsS.oPVeTWgjRM2q','traveler'),('virat.kohli@gmail.com','$2b$10$Y8NXUIiSOuudBh4IWXoTMuwIuupP/DKpRNyB95yW2/glZ.XlNX4Uu','traveler');
/*!40000 ALTER TABLE `credentials` ENABLE KEYS */;
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
