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
-- Table structure for table `propertyPhotos`
--

DROP TABLE IF EXISTS `propertyPhotos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `propertyPhotos` (
  `propertyId` int(11) NOT NULL,
  `photoUrl` varchar(255) NOT NULL,
  `markForDelete` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`propertyId`,`photoUrl`),
  CONSTRAINT `propertyphotos_ibfk_1` FOREIGN KEY (`propertyId`) REFERENCES `property` (`propertyid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `propertyPhotos`
--

LOCK TABLES `propertyPhotos` WRITE;
/*!40000 ALTER TABLE `propertyPhotos` DISABLE KEYS */;
INSERT INTO `propertyPhotos` VALUES (2,'http://localhost:3001/propertyPic/2_2018-09-20T08:51:46.955Z_property.jpeg',0),(2,'http://localhost:3001/propertyPic/2_2018-09-20T08:51:47.848Z_property.png',0),(14,'undefined',0),(15,'undefined',0),(16,'http://localhost:3001/propertyPic/16_2018-10-07T10:22:00.715Z_property.jpeg',0),(16,'http://localhost:3001/propertyPic/16_2018-10-07T10:22:02.007Z_property.jpeg',0),(16,'http://localhost:3001/propertyPic/16_2018-10-07T10:22:03.175Z_property.jpeg',0),(16,'http://localhost:3001/propertyPic/16_2018-10-07T10:22:04.634Z_property.jpeg',0),(17,'undefined',0),(18,'undefined',0),(19,'undefined',0),(20,'http://localhost:3001/propertyPic/20_2018-10-07T10:28:12.182Z_property.jpeg',0),(20,'http://localhost:3001/propertyPic/20_2018-10-07T10:28:13.303Z_property.jpeg',0),(20,'http://localhost:3001/propertyPic/20_2018-10-07T10:28:13.880Z_property.jpeg',0),(20,'http://localhost:3001/propertyPic/20_2018-10-07T10:28:14.452Z_property.jpeg',0),(21,'http://localhost:3001/propertyPic/21_2018-10-08T04:02:53.835Z_property.jpeg',0),(21,'http://localhost:3001/propertyPic/21_2018-10-08T04:02:53.840Z_property.jpeg',0),(21,'http://localhost:3001/propertyPic/21_2018-10-08T04:02:53.841Z_property.jpeg',0),(21,'http://localhost:3001/propertyPic/21_2018-10-08T04:02:53.843Z_property.jpeg',0),(21,'http://localhost:3001/propertyPic/21_2018-10-08T04:02:53.844Z_property.jpeg',0),(22,'http://localhost:3001/propertyPic/22_2018-10-08T04:09:10.283Z_property.jpeg',0),(22,'http://localhost:3001/propertyPic/22_2018-10-08T04:09:10.285Z_property.jpeg',0),(22,'http://localhost:3001/propertyPic/22_2018-10-08T04:09:10.288Z_property.jpeg',0),(22,'http://localhost:3001/propertyPic/22_2018-10-08T04:09:10.291Z_property.jpeg',0),(22,'http://localhost:3001/propertyPic/22_2018-10-08T04:09:10.296Z_property.jpeg',0),(23,'http://localhost:3001/propertyPic/23_2018-10-08T04:12:44.059Z_property.jpeg',0),(23,'http://localhost:3001/propertyPic/23_2018-10-08T04:12:44.060Z_property.jpeg',0),(23,'http://localhost:3001/propertyPic/23_2018-10-08T04:12:44.061Z_property.jpeg',0),(24,'http://localhost:3001/propertyPic/24_2018-10-08T04:11:38.622Z_property.jpeg',0),(24,'http://localhost:3001/propertyPic/24_2018-10-08T04:11:38.628Z_property.jpeg',0),(24,'http://localhost:3001/propertyPic/24_2018-10-08T04:11:38.630Z_property.jpeg',0),(25,'http://localhost:3001/propertyPic/25_2018-10-08T04:15:39.186Z_property.jpeg',0),(25,'http://localhost:3001/propertyPic/25_2018-10-08T04:15:39.188Z_property.jpeg',0),(25,'http://localhost:3001/propertyPic/25_2018-10-08T04:15:39.189Z_property.jpeg',0);
/*!40000 ALTER TABLE `propertyPhotos` ENABLE KEYS */;
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
