CREATE DATABASE IF NOT EXISTS  `homeaway`;
USE `homeaway`;

DROP TABLE IF EXISTS `amenities`; 
DROP TABLE IF EXISTS `profile`;
DROP TABLE IF EXISTS `propertyPhotos`;
DROP TABLE IF EXISTS `propertyBlockDate`;
DROP TABLE IF EXISTS `property`;
DROP TABLE IF EXISTS`credentials`;

CREATE TABLE `credentials` (
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(10) NOT NULL,
  PRIMARY KEY (`username`)
);

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
) ;

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
);

CREATE TABLE `propertyPhotos` (
  `propertyId` int(11) NOT NULL,
  `photoUrl` varchar(255) NOT NULL,
  `markForDelete` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`propertyId`,`photoUrl`),
  CONSTRAINT `propertyphotos_ibfk_1` FOREIGN KEY (`propertyId`) REFERENCES `property` (`propertyid`)
);

CREATE TABLE `propertyBlockDate` (
  `propertyId` int(11) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  PRIMARY KEY (`propertyId`,`startDate`,`endDate`),
  CONSTRAINT `propertyblockdate_ibfk_1` FOREIGN KEY (`propertyId`) REFERENCES `property` (`propertyid`)
);

CREATE TABLE `amenities` (
 `propertyId` int(11) NOT NULL,
 `amenity` varchar(60) NOT NULL,
 PRIMARY KEY(`propertyId`, `amenity`),
 CONSTRAINT `amenities_ibfk_1` FOREIGN KEY (`propertyId`) REFERENCES `property`(`propertyId`)
);


    
    
    