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
-- Table structure for table `profile`
--

DROP TABLE IF EXISTS `profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `profile` (
  `username` varchar(255) NOT NULL,
  `firstname` varchar(100) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `aboutme` varchar(255) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `company` varchar(100) DEFAULT NULL,
  `school` varchar(100) DEFAULT NULL,
  `hometown` varchar(100) DEFAULT NULL,
  `languages` varchar(100) DEFAULT NULL,
  `gender` char(1) DEFAULT NULL,
  `phone` varchar(10) DEFAULT NULL,
  `profilefilepath` varchar(255) DEFAULT NULL,
  `createdOn` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`username`),
  CONSTRAINT `profile_ibfk_1` FOREIGN KEY (`username`) REFERENCES `credentials` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profile`
--

LOCK TABLES `profile` WRITE;
/*!40000 ALTER TABLE `profile` DISABLE KEYS */;
INSERT INTO `profile` VALUES ('nirbhay.kekre@dummy.com','Nirbhay','Kekre','Software Engineering student at SJSU ','San Jose','SJSU','SJSU','Indore','English','M','1231423743','http://localhost:3001/profilePic/nirbhay.kekre@dummy.com_profile.jpeg','2018-10-08 03:42:44'),('nirbhay@gmail.com','Nirbhay','Kekre','student at sjsu','San Jose',NULL,'SJSU',NULL,'English','M',NULL,NULL,'2018-09-19 21:47:59'),('ravindra.jadeja@bcci.com','Jadu','Jadeja','Cricketer in Indian Cricket Team, I love to travel','San Jose','BCCI','NITK','Indore','English','M','123456789','http://localhost:3001/profilePic/ravindra.jadeja@bcci.com_profile.jpeg','2018-09-26 05:50:43'),('rohitSharma@bcci.com','Rohit','Sharma',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-09-26 07:23:43'),('sjsuOwner@gmail.com','Sachin','Tendulkar',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-09-19 21:51:07'),('sjsuOwner2@gmail.com','Nirbhay','Kekre','student at sjsu','San Jose','','SJSU','','English','M','4454234','http://localhost:3001/profilePic/sjsuOwner2@gmail.com_profile.png','2018-09-19 21:51:34'),('sjsuTraveler@gmail.com','Rahul','Dravid',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-09-19 21:49:39'),('virat.kohli@gmail.com','Virat','Kohli',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-10-08 04:31:36');
/*!40000 ALTER TABLE `profile` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-10-07 22:20:25
