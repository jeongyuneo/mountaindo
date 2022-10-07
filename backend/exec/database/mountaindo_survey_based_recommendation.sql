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
-- Table structure for table `survey_based_recommendation`
--

DROP TABLE IF EXISTS `survey_based_recommendation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `survey_based_recommendation` (
  `survey_based_recommendation_id` int NOT NULL AUTO_INCREMENT,
  `created_date` datetime DEFAULT NULL,
  `deleted_date` datetime DEFAULT NULL,
  `is_active` bit(1) NOT NULL,
  `last_modified_date` datetime DEFAULT NULL,
  `member_id` int NOT NULL,
  `trail_id` int NOT NULL,
  PRIMARY KEY (`survey_based_recommendation_id`),
  KEY `FKkxs4itjye9o7fgugttrm5nkk7` (`member_id`),
  KEY `FKb2edsxsl030g5dydqcgyjcl5w` (`trail_id`),
  CONSTRAINT `FKb2edsxsl030g5dydqcgyjcl5w` FOREIGN KEY (`trail_id`) REFERENCES `trail` (`trail_id`),
  CONSTRAINT `FKkxs4itjye9o7fgugttrm5nkk7` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `survey_based_recommendation`
--

LOCK TABLES `survey_based_recommendation` WRITE;
/*!40000 ALTER TABLE `survey_based_recommendation` DISABLE KEYS */;
INSERT INTO `survey_based_recommendation` VALUES (1,'2022-10-06 22:20:30',NULL,_binary '',NULL,27,34401),(2,'2022-10-06 22:20:30',NULL,_binary '',NULL,27,36645),(3,'2022-10-06 22:20:30',NULL,_binary '',NULL,27,28783),(4,'2022-10-06 22:20:30',NULL,_binary '',NULL,27,28733),(5,'2022-10-06 22:20:30',NULL,_binary '',NULL,27,28723),(6,'2022-10-06 22:20:30',NULL,_binary '',NULL,27,28715),(7,'2022-10-06 22:20:30',NULL,_binary '',NULL,27,28687),(8,'2022-10-06 22:20:30',NULL,_binary '',NULL,27,3847),(9,'2022-10-06 22:20:30',NULL,_binary '',NULL,27,28501),(10,'2022-10-06 22:20:30',NULL,_binary '',NULL,27,28319),(11,'2022-10-06 22:21:35',NULL,_binary '',NULL,2,26031),(12,'2022-10-06 22:21:35',NULL,_binary '',NULL,2,18624),(13,'2022-10-06 22:21:35',NULL,_binary '',NULL,2,44706),(14,'2022-10-06 22:21:35',NULL,_binary '',NULL,2,16897),(15,'2022-10-06 22:21:35',NULL,_binary '',NULL,2,36073),(16,'2022-10-06 22:21:35',NULL,_binary '',NULL,2,16900),(17,'2022-10-06 22:21:35',NULL,_binary '',NULL,2,41461),(18,'2022-10-06 22:21:35',NULL,_binary '',NULL,2,44580),(19,'2022-10-06 22:21:35',NULL,_binary '',NULL,2,6899),(20,'2022-10-06 22:21:35',NULL,_binary '',NULL,2,39722),(21,'2022-10-06 23:02:14',NULL,_binary '',NULL,29,34401),(22,'2022-10-06 23:02:14',NULL,_binary '',NULL,29,36645),(23,'2022-10-06 23:02:14',NULL,_binary '',NULL,29,28783),(24,'2022-10-06 23:02:14',NULL,_binary '',NULL,29,28733),(25,'2022-10-06 23:02:14',NULL,_binary '',NULL,29,28723),(26,'2022-10-06 23:02:14',NULL,_binary '',NULL,29,28715),(27,'2022-10-06 23:02:14',NULL,_binary '',NULL,29,28687),(28,'2022-10-06 23:02:14',NULL,_binary '',NULL,29,3847),(29,'2022-10-06 23:02:14',NULL,_binary '',NULL,29,28501),(30,'2022-10-06 23:02:14',NULL,_binary '',NULL,29,28319),(31,'2022-10-06 23:07:31',NULL,_binary '',NULL,30,54337),(32,'2022-10-06 23:07:31',NULL,_binary '',NULL,30,747),(33,'2022-10-06 23:07:31',NULL,_binary '',NULL,30,40372),(34,'2022-10-06 23:07:31',NULL,_binary '',NULL,30,3240),(35,'2022-10-06 23:07:31',NULL,_binary '',NULL,30,18365),(36,'2022-10-06 23:07:31',NULL,_binary '',NULL,30,52409),(37,'2022-10-06 23:07:31',NULL,_binary '',NULL,30,6304),(38,'2022-10-06 23:07:31',NULL,_binary '',NULL,30,18367),(39,'2022-10-06 23:07:31',NULL,_binary '',NULL,30,30761),(40,'2022-10-06 23:07:31',NULL,_binary '',NULL,30,30735),(41,'2022-10-07 00:34:20',NULL,_binary '',NULL,36,215),(42,'2022-10-07 00:34:20',NULL,_binary '',NULL,36,18),(43,'2022-10-07 00:34:20',NULL,_binary '',NULL,36,35),(44,'2022-10-07 00:34:20',NULL,_binary '',NULL,36,57),(45,'2022-10-07 00:34:20',NULL,_binary '',NULL,36,3),(46,'2022-10-07 00:34:20',NULL,_binary '',NULL,36,122),(47,'2022-10-07 00:34:20',NULL,_binary '',NULL,36,33020),(48,'2022-10-07 00:34:20',NULL,_binary '',NULL,36,4852),(49,'2022-10-07 00:34:20',NULL,_binary '',NULL,36,32934),(50,'2022-10-07 00:34:20',NULL,_binary '',NULL,36,32938),(51,'2022-10-07 01:16:15',NULL,_binary '',NULL,39,3),(52,'2022-10-07 01:16:15',NULL,_binary '',NULL,39,18),(53,'2022-10-07 01:16:15',NULL,_binary '',NULL,39,35),(54,'2022-10-07 01:16:15',NULL,_binary '',NULL,39,57),(55,'2022-10-07 01:16:15',NULL,_binary '',NULL,39,122),(56,'2022-10-07 01:16:15',NULL,_binary '',NULL,39,4929),(57,'2022-10-07 01:16:15',NULL,_binary '',NULL,39,32934),(58,'2022-10-07 01:16:15',NULL,_binary '',NULL,39,32938),(59,'2022-10-07 01:16:15',NULL,_binary '',NULL,39,4901),(60,'2022-10-07 01:16:15',NULL,_binary '',NULL,39,53251),(61,'2022-10-07 01:28:41',NULL,_binary '',NULL,40,1),(62,'2022-10-07 01:28:41',NULL,_binary '',NULL,40,143),(63,'2022-10-07 01:28:41',NULL,_binary '',NULL,40,54971),(64,'2022-10-07 01:28:41',NULL,_binary '',NULL,40,16911),(65,'2022-10-07 01:28:41',NULL,_binary '',NULL,40,26083),(66,'2022-10-07 01:28:41',NULL,_binary '',NULL,40,41628),(67,'2022-10-07 01:28:41',NULL,_binary '',NULL,40,3102),(68,'2022-10-07 01:28:41',NULL,_binary '',NULL,40,16931),(69,'2022-10-07 01:28:41',NULL,_binary '',NULL,40,47200),(70,'2022-10-07 01:28:41',NULL,_binary '',NULL,40,41686),(71,'2022-10-07 01:36:53',NULL,_binary '',NULL,38,1),(72,'2022-10-07 01:36:53',NULL,_binary '',NULL,38,143),(73,'2022-10-07 01:36:53',NULL,_binary '',NULL,38,387),(74,'2022-10-07 01:36:53',NULL,_binary '',NULL,38,385),(75,'2022-10-07 01:36:53',NULL,_binary '',NULL,38,10526),(76,'2022-10-07 01:36:53',NULL,_binary '',NULL,38,47020),(77,'2022-10-07 01:36:53',NULL,_binary '',NULL,38,9272),(78,'2022-10-07 01:36:53',NULL,_binary '',NULL,38,9116),(79,'2022-10-07 01:36:53',NULL,_binary '',NULL,38,45611),(80,'2022-10-07 01:36:53',NULL,_binary '',NULL,38,45664),(81,'2022-10-07 01:50:32',NULL,_binary '',NULL,18,1),(82,'2022-10-07 01:50:32',NULL,_binary '',NULL,18,5986),(83,'2022-10-07 01:50:32',NULL,_binary '',NULL,18,33266),(84,'2022-10-07 01:50:32',NULL,_binary '',NULL,18,52798),(85,'2022-10-07 01:50:32',NULL,_binary '',NULL,18,52801),(86,'2022-10-07 01:50:32',NULL,_binary '',NULL,18,14933),(87,'2022-10-07 01:50:32',NULL,_binary '',NULL,18,32976),(88,'2022-10-07 01:50:32',NULL,_binary '',NULL,18,32729),(89,'2022-10-07 01:50:32',NULL,_binary '',NULL,18,32406),(90,'2022-10-07 01:50:32',NULL,_binary '',NULL,18,53307),(91,'2022-10-07 01:50:32',NULL,_binary '',NULL,18,1),(92,'2022-10-07 01:50:32',NULL,_binary '',NULL,18,5986),(93,'2022-10-07 01:50:32',NULL,_binary '',NULL,18,33266),(94,'2022-10-07 01:50:32',NULL,_binary '',NULL,18,52798),(95,'2022-10-07 01:50:32',NULL,_binary '',NULL,18,52801),(96,'2022-10-07 01:50:32',NULL,_binary '',NULL,18,14933),(97,'2022-10-07 01:50:32',NULL,_binary '',NULL,18,32976),(98,'2022-10-07 01:50:32',NULL,_binary '',NULL,18,32729),(99,'2022-10-07 01:50:32',NULL,_binary '',NULL,18,32406),(100,'2022-10-07 01:50:32',NULL,_binary '',NULL,18,53307);
/*!40000 ALTER TABLE `survey_based_recommendation` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-07 10:51:28
