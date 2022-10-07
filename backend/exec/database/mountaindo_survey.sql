-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: j7b201.p.ssafy.io    Database: mountaindo
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `survey`
--

DROP TABLE IF EXISTS `survey`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `survey` (
  `survey_id` int NOT NULL AUTO_INCREMENT,
  `created_date` datetime DEFAULT NULL,
  `deleted_date` datetime DEFAULT NULL,
  `is_active` bit(1) NOT NULL,
  `last_modified_date` datetime DEFAULT NULL,
  `level` int NOT NULL,
  `preferred_hiking_style` int NOT NULL,
  `preferred_hiking_time` int NOT NULL,
  `preferred_mountain_location` int NOT NULL,
  `member_id` int NOT NULL,
  PRIMARY KEY (`survey_id`),
  KEY `FK8jxem4c3k9lo8nj4ebempero9` (`member_id`),
  CONSTRAINT `FK8jxem4c3k9lo8nj4ebempero9` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `survey`
--

LOCK TABLES `survey` WRITE;
/*!40000 ALTER TABLE `survey` DISABLE KEYS */;
INSERT INTO `survey` VALUES (1,'2022-10-07 07:20:30',NULL,_binary '','2022-10-07 07:20:30',1,1,1,1,27),(2,'2022-10-07 07:21:35',NULL,_binary '','2022-10-07 07:21:35',2,2,3,2,2),(3,'2022-10-07 08:02:14',NULL,_binary '','2022-10-07 08:02:14',1,2,1,1,29),(4,'2022-10-07 08:07:31',NULL,_binary '','2022-10-07 08:07:31',2,1,3,2,30),(5,'2022-10-07 09:34:19',NULL,_binary '','2022-10-07 09:34:19',1,1,1,2,36),(6,'2022-10-07 10:16:15',NULL,_binary '','2022-10-07 10:16:15',1,1,1,2,39),(7,'2022-10-07 10:28:40',NULL,_binary '','2022-10-07 10:28:40',1,2,2,2,40),(8,'2022-10-07 10:36:53',NULL,_binary '','2022-10-07 10:36:53',1,2,2,2,38),(9,'2022-10-07 10:50:31',NULL,_binary '','2022-10-07 10:50:31',1,2,2,2,18),(10,'2022-10-07 10:50:32',NULL,_binary '','2022-10-07 10:50:32',1,2,2,2,18);
/*!40000 ALTER TABLE `survey` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-07 10:51:37
