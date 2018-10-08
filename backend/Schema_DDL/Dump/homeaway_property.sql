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
-- Table structure for table `property`
--

DROP TABLE IF EXISTS `property`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `property` (
  `username` varchar(255) NOT NULL,
  `propertyId` int(11) NOT NULL AUTO_INCREMENT,
  `street` varchar(70) NOT NULL,
  `city` varchar(25) NOT NULL,
  `unit` varchar(10) DEFAULT NULL,
  `state` varchar(25) NOT NULL,
  `zip` int(5) NOT NULL,
  `country` varchar(25) NOT NULL,
  `headline` varchar(255) DEFAULT NULL,
  `propertyDescription` varchar(255) DEFAULT NULL,
  `propertyType` varchar(20) DEFAULT NULL,
  `bedroom` int(1) DEFAULT NULL,
  `bathroom` int(1) DEFAULT NULL,
  `accomodates` int(2) DEFAULT NULL,
  `bookingOption` varchar(10) DEFAULT NULL,
  `oneNightRate` float DEFAULT NULL,
  `minNightStay` int(3) DEFAULT NULL,
  `availableId` int(11) DEFAULT NULL,
  `isActive` tinyint(1) DEFAULT '0',
  `markForDelete` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`propertyId`),
  KEY `username` (`username`),
  CONSTRAINT `property_ibfk_1` FOREIGN KEY (`username`) REFERENCES `credentials` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `property`
--

LOCK TABLES `property` WRITE;
/*!40000 ALTER TABLE `property` DISABLE KEYS */;
INSERT INTO `property` VALUES ('sjsuOwner2@gmail.com',1,'786 the alameda','San Jose',NULL,'California',95126,'USA','Modera at Alameda','located in the center of down town sanjose','Apartment',3,2,7,'instant',102.46,7,NULL,1,0),('sjsuOwner2@gmail.com',2,'431 El Camino Real','Santa Clara',NULL,'California',95050,'USA','Domicilio Apartments','Domicilio Apartments offers apartment homes featuring stylish and sophisticated two-bedroom floor plans within our refined community. Immerse yourself in the culture at nearby Triton Museum of Art, or enjoy the vibrant downtown Santa Clara scene.','Apartment',2,2,5,'instant',67,7,NULL,1,0),('sjsuOwner2@gmail.com',3,'Wolfe Rd','Sunnyvale',NULL,'California',94126,'United States','Beautiful private studio in new house directly across new Apple campus entrance','Private guest studio with its own separate entrance and access to a private side yard with garden. Guest studio is part of a beautiful new house built directly across the entrance to the new Apple campus (Gate 3). Includes new hardwood floors','Studio',1,1,2,'Instant',98,1,NULL,1,0),('sjsuOwner2@gmail.com',4,'Wolfe Rd','Sunnyvale',NULL,'California',94126,'United States','Beautiful private studio in new house directly across new Apple campus entrance','Private guest studio with its own separate entrance and access to a private side yard with garden. Guest studio is part of a beautiful new house built directly across the entrance to the new Apple campus (Gate 3). Includes new hardwood floors','Studio',1,1,2,'Instant',98,1,NULL,1,0),('sjsuOwner2@gmail.com',5,'Wolfe Rd','Sunnyvale',NULL,'California',94126,'United States','Beautiful private studio in new house directly across new Apple campus entrance','Private guest studio with its own separate entrance and access to a private side yard with garden. Guest studio is part of a beautiful new house built directly across the entrance to the new Apple campus (Gate 3). Includes new hardwood floors','Studio',1,1,2,'Instant',98,1,NULL,1,0),('sjsuOwner2@gmail.com',6,'Wolfe Rd','Sunnyvale',NULL,'California',94126,'United States','Beautiful private studio in new house directly across new Apple campus entrance','Private guest studio with its own separate entrance and access to a private side yard with garden. Guest studio is part of a beautiful new house built directly across the entrance to the new Apple campus (Gate 3). Includes new hardwood floors','Studio',1,1,2,'Instant',98,1,NULL,1,0),('sjsuOwner2@gmail.com',7,'Wolfe Rd','Sunnyvale',NULL,'California',94126,'United States','Beautiful private studio in new house directly across new Apple campus entrance','Private guest studio with its own separate entrance and access to a private side yard with garden. Guest studio is part of a beautiful new house built directly across the entrance to the new Apple campus (Gate 3). Includes new hardwood floors','Studio',1,1,2,'Instant',98,1,NULL,1,0),('sjsuOwner2@gmail.com',8,'Wolfe Rd','Sunnyvale',NULL,'California',94126,'United States','Beautiful private studio in new house directly across new Apple campus entrance','Private guest studio with its own separate entrance and access to a private side yard with garden. Guest studio is part of a beautiful new house built directly across the entrance to the new Apple campus (Gate 3). Includes new hardwood floors','Studio',1,1,2,'Instant',98,1,NULL,1,0),('sjsuOwner2@gmail.com',9,'Wolfe Rd','Sunnyvale',NULL,'California',94126,'United States','Beautiful private studio in new house directly across new Apple campus entrance','Private guest studio with its own separate entrance and access to a private side yard with garden. Guest studio is part of a beautiful new house built directly across the entrance to the new Apple campus (Gate 3). Includes new hardwood floors','Studio',1,1,2,'Instant',98,1,NULL,1,0),('sjsuOwner2@gmail.com',10,'Wolfe Rd','Sunnyvale',NULL,'California',94126,'United States','Beautiful private studio in new house directly across new Apple campus entrance','Private guest studio with its own separate entrance and access to a private side yard with garden. Guest studio is part of a beautiful new house built directly across the entrance to the new Apple campus (Gate 3). Includes new hardwood floors','Studio',1,1,2,'Instant',98,1,NULL,1,0),('sjsuOwner2@gmail.com',11,'Wolfe Rd','Sunnyvale',NULL,'California',94126,'United States','Beautiful private studio in new house directly across new Apple campus entrance','Private guest studio with its own separate entrance and access to a private side yard with garden. Guest studio is part of a beautiful new house built directly across the entrance to the new Apple campus (Gate 3). Includes new hardwood floors','Studio',1,1,2,'Instant',98,1,NULL,1,0),('sjsuOwner2@gmail.com',12,'Wolfe Rd','Sunnyvale',NULL,'California',94126,'United States','dzgd','gdgsg','Studio',1,1,1,'Instant',88,2,NULL,1,0),('sjsuOwner2@gmail.com',13,'Wolfe Rd','Sunnyvale',NULL,'California',94126,'United States','Beautiful private studio in new house directly across new Apple campus entrance','Private guest studio with its own separate entrance and access to a private side yard with garden. Guest studio is part of a beautiful new house built directly across the entrance to the new Apple campus (Gate 3). Includes new hardwood floors','Studio',1,1,2,'Instant',85,1,NULL,1,0),('sjsuOwner2@gmail.com',14,'Wolfe Rd','Sunnyvale',NULL,'California',94126,'United States','Beautiful private studio in new house directly across new Apple campus entrance','Private guest studio with its own separate entrance and access to a private side yard with garden. Guest studio is part of a beautiful new house built directly across the entrance to the new Apple campus (Gate 3). Includes new hardwood floors','Studio',1,1,2,'Instant',45,1,NULL,1,0),('sjsuOwner2@gmail.com',15,'Wolfe Rd','Sunnyvale',NULL,'California',94126,'United States','Beautiful private studio in new house directly across new Apple campus entrance','ajsdbf,j sbv,asb,nsdmas ','House',2,3,3,'Instant',87,1,NULL,1,0),('sjsuOwner2@gmail.com',16,'Wolfe Rd','Sunnyvale',NULL,'California',94126,'United States','Beautiful private studio in new house directly across new Apple campus entrance','wetwwghegfa','Studio',1,2,1,'Instant',123,1,NULL,1,0),('sjsuOwner2@gmail.com',17,'Wolfe Rd','Sunnyvale',NULL,'California',94126,'United States','Beautiful private studio in new house directly across new Apple campus entrance','asdsfghjk','House',3,2,8,'Instant',679,6,NULL,1,0),('sjsuOwner2@gmail.com',18,'Wolfe Rd','Sunnyvale',NULL,'California',94126,'United States','Beautiful private studio in new house directly across new Apple campus entrance','asdsfghjk','House',3,2,8,'Instant',679,6,NULL,1,0),('sjsuOwner2@gmail.com',19,'787 the Alameda #323','San Jose',NULL,'CA',95126,'USA','sdvfbffdasvc ','fdfsadfcvbfdgef','Studio',2,2,2,'Instant',213,2,NULL,1,0),('sjsuOwner2@gmail.com',20,'asdfvb','asdfgh',NULL,'asdfgh',12345,'asdf','awesfdgh','asfdgh','Studio',1,1,1,'Instant',123,1,NULL,1,0),('ravindra.jadeja@bcci.com',21,'897 Race Rd','San Jose',NULL,'California',95126,'United States','Casa El Patio ...chill-out in a cozy patio near the ocean!','Welcome to this short virtual tour at Casa El Patio. We are located in the neighborhood of Las Tunas, in the area north of Todos Santos, within a short drive from the historic district, one miles north a world-class surf break “ La Pastora”','Farmhouse',2,2,4,'Instant',102,2,NULL,1,0),('ravindra.jadeja@bcci.com',22,'Wolfe Rd','San Jose',NULL,'California',94126,'United States','Cerritos Beach Palace, Tranquility in 1600 sq ft Oceanfront Suite','Step out onto your private beach or balcony and see the waves roll in on the miles of golden sandy beach just steps away. This beautiful solar-powered beachfront, 2 bedroom (3 bed) upper level (1600 sq ft ) suite on Cerritos Beach is ideal for surfing','Farmhouse',3,2,5,'Instant',97,1,NULL,1,0),('ravindra.jadeja@bcci.com',23,'787 the Alameda','San Jose',NULL,'California',95126,'United States','Avalon','Superb society join us, located near SJSU ','Apartment',3,2,5,'Instant',88,3,NULL,1,0),('ravindra.jadeja@bcci.com',24,'787 the Alameda','San Jose',NULL,'California',95126,'United States','Avalon','Superb society join us, located near SJSU ','Apartment',3,2,5,'Instant',88,3,NULL,1,0),('ravindra.jadeja@bcci.com',25,'Wolfe Rd','San Jose',NULL,'California',94126,'United States','One South','Located in the center of downtown, near VTA bus stop and SJSU','Apartment',3,3,5,'Instant',100,3,NULL,1,0);
/*!40000 ALTER TABLE `property` ENABLE KEYS */;
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
