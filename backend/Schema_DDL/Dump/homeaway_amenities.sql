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
-- Table structure for table `amenities`
--

DROP TABLE IF EXISTS `amenities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `amenities` (
  `propertyId` int(11) NOT NULL,
  `amenity` varchar(60) NOT NULL,
  PRIMARY KEY (`propertyId`,`amenity`),
  CONSTRAINT `amenities_ibfk_1` FOREIGN KEY (`propertyId`) REFERENCES `property` (`propertyid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `amenities`
--

LOCK TABLES `amenities` WRITE;
/*!40000 ALTER TABLE `amenities` DISABLE KEYS */;
INSERT INTO `amenities` VALUES (1,'Garden'),(1,'Internet'),(1,'Kitchen'),(2,'TV'),(4,'Dishwasher'),(4,'Dryer'),(4,'Garden'),(4,'Internet'),(4,'Kitchen'),(5,'Dishwasher'),(5,'Dryer'),(5,'Garden'),(5,'Internet'),(5,'Kitchen'),(6,'Dishwasher'),(6,'Dryer'),(6,'Garden'),(6,'Internet'),(6,'Kitchen'),(7,'Dishwasher'),(7,'Dryer'),(7,'Garden'),(7,'Internet'),(7,'Kitchen'),(8,'Dishwasher'),(8,'Dryer'),(8,'Garden'),(8,'Internet'),(8,'Kitchen'),(9,'Garden'),(9,'Internet'),(9,'Kitchen'),(10,'Garden'),(10,'Internet'),(10,'Kitchen'),(11,'Garden'),(11,'Internet'),(11,'Kitchen'),(11,'Pool'),(11,'TV'),(12,'Garden'),(12,'Kitchen'),(12,'Pool'),(12,'TV'),(13,'Garden'),(13,'Internet'),(13,'Kitchen'),(14,'Garden'),(14,'Internet'),(14,'Kitchen'),(14,'Pool'),(14,'TV'),(15,'Garden'),(15,'Internet'),(15,'Kitchen'),(15,'Pool'),(15,'TV'),(16,'Garden'),(16,'Internet'),(16,'Kitchen'),(16,'Pool'),(16,'TV'),(17,'Garden'),(17,'Internet'),(17,'Kitchen'),(17,'TV'),(18,'Garden'),(18,'Internet'),(18,'Kitchen'),(18,'TV'),(19,'Garden'),(19,'Internet'),(19,'Kitchen'),(19,'Pool'),(19,'TV'),(20,'Garden'),(20,'Internet'),(20,'Kitchen'),(20,'Pool'),(20,'TV'),(21,'Dishwasher'),(21,'Dryer'),(21,'Garden'),(21,'Internet'),(21,'Kitchen'),(21,'Pool'),(21,'TV'),(22,'Garden'),(22,'Internet'),(22,'Kitchen'),(22,'Pool'),(22,'TV'),(23,'Garden'),(23,'Internet'),(23,'Kitchen'),(23,'Pool'),(23,'TV'),(24,'Garden'),(24,'Internet'),(24,'Kitchen'),(24,'Pool'),(24,'TV'),(25,'Garden'),(25,'Internet'),(25,'Kitchen'),(25,'TV');
/*!40000 ALTER TABLE `amenities` ENABLE KEYS */;
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
