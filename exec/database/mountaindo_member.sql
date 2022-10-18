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
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member` (
  `member_id` int NOT NULL AUTO_INCREMENT,
  `created_date` datetime DEFAULT NULL,
  `deleted_date` datetime DEFAULT NULL,
  `is_active` bit(1) NOT NULL,
  `last_modified_date` datetime DEFAULT NULL,
  `dong` varchar(255) DEFAULT NULL,
  `gu` varchar(255) DEFAULT NULL,
  `si` varchar(255) DEFAULT NULL,
  `birth` date NOT NULL,
  `email` varchar(255) NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `nickname` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  PRIMARY KEY (`member_id`),
  UNIQUE KEY `UK_mbmcqelty0fbrvxp1q58dn57t` (`email`),
  UNIQUE KEY `UK_hh9kg6jti4n1eoiertn2k6qsc` (`nickname`),
  UNIQUE KEY `UK_6ithqvsvrcawbi9dtxu0ttsny` (`phone`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member`
--

LOCK TABLES `member` WRITE;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
INSERT INTO `member` VALUES (1,'2022-10-07 06:51:38',NULL,_binary '','2022-10-07 06:51:38','명천동','구구구','보령시','1996-09-01','qwer@gmail.com',NULL,'최인국','짱짱','$2a$10$AZz84f.tbhKw1wY2nEqQC.VyhrygLazQsF3AoJ3iOieS6ER1zXVua','010-1111-1111'),(2,'2022-10-07 06:51:52',NULL,_binary '','2022-10-07 08:24:44','','천안시','충청남도','1999-07-11','a12@naver.com','/images/profile/3ef2e432-2e31-4457-8651-a99cb1c92671.jpeg','유현수','따봉1','$2a$10$4dw7O1uVVQUAiWengaOO1.vruGZUErYp0wyhAAOwjuHZMEaLEyGuW','010-1111-1222'),(3,'2022-10-07 06:51:59',NULL,_binary '','2022-10-07 06:51:59','창영동','동구','인천광역시','1987-03-25','ryu99@naver.com',NULL,'류현진','공놀이왕','$2a$10$8kjdUSyJxsGfGv8nd5yot..UjQ/56yWQkdjK64Uh60.XXvpqOcIvq','010-1111-1113'),(4,'2022-10-07 06:52:04',NULL,_binary '','2022-10-07 06:52:04','상도동','동작구','서울특별시','1994-09-12','btsnj@hanmail.net',NULL,'김남준','RM','$2a$10$9o/hvjDk6vGqQVFxiFTX/umdG2N8KXANJWIeJB3q6uJApRpgDkyrW','010-1111-1114'),(5,'2022-10-07 06:52:09',NULL,_binary '','2022-10-07 06:52:09','방이동','송파구','서울특별시','1992-12-04','btssj@hanmail.net',NULL,'김석진','진','$2a$10$M95PPoKz/nkBMbYl3jv71OpqmJ/Am1/pNUuYoTJzA1XE34JcUzkGy','010-1111-1115'),(6,'2022-10-07 06:52:16',NULL,_binary '','2022-10-07 06:52:16','태전동','북구','대구광역시','1993-03-09','btsyg@hanmail.net',NULL,'민윤기','슈가','$2a$10$1VMvteOjK7lZGgSiu4tXWe2VQHSD3MRTUrNbAMB30hT5HHHwv57fq','010-1111-1116'),(7,'2022-10-07 06:52:20',NULL,_binary '','2022-10-07 06:52:20','일곡동','북구','광주광역시','1994-02-18','btshs@hanmail.net',NULL,'정호석','제이홉','$2a$10$dffk4Evf7lHTHSa88JUuVOqu1JbOwWB11aRVMlDLQ/z4PCRfijsym','010-1111-1117'),(8,'2022-10-07 06:52:25',NULL,_binary '','2022-10-07 06:52:25','회동동','금정구','부산광역시','1995-10-13','btsjm@hanmail.net',NULL,'박지민','지민','$2a$10$XGSXzni90hh8ZEwy517IuOQsO.z/QqGhbJM6aoGTwV99QLpaJwFPa','010-1111-1118'),(9,'2022-10-07 06:52:30',NULL,_binary '','2022-10-07 06:52:30','비산동','서구','대구광역시','1995-12-30','btsth@hanmail.net',NULL,'김태형','뷔','$2a$10$FB0Kigy7Ao.prDzH36ELN.GnbllsRHGEIoivI5FP5TpmTEpRI1Ek6','010-1111-1119'),(10,'2022-10-07 06:52:36',NULL,_binary '','2022-10-07 06:52:36','만덕동','북구','부산광역시','1997-09-01','btsjk@hanmail.net',NULL,'전정국','정국','$2a$10$qECYIt3DKvEqUFIvO6.0Z.Pj7EQes0qwpz/dgnJCFPAP5D/hXcyC2','010-1111-1120'),(11,'2022-10-07 06:52:41',NULL,_binary '','2022-10-07 06:52:41','후평동','구구구','춘천시','1992-07-08','son7@gmail.com',NULL,'손흥민','쏘니','$2a$10$FSWeccDyBnFyMSZdxud07.bFPNPHn/CMU4p3CwBlecUXP358a5mM.','010-1111-1121'),(12,'2022-10-07 06:52:46',NULL,_binary '','2022-10-07 06:52:46','수유동','강북구','서울특별시','1972-08-14','youjs72@gmail.com',NULL,'유재석','국민MC','$2a$10$xdGIJoS3v2YVre0NDv14s.go3bKQyZ29m2YpdKd9c7FMh2uCqaqle','010-1111-1122'),(13,'2022-10-07 06:52:52',NULL,_binary '','2022-10-07 06:52:52','송정동','구구구','광주시','1993-05-16','lje93@naver.com',NULL,'이지은','IU','$2a$10$5aE405ykARC9d3.HqxTEOOnSh/JE8LZ7u8iKiqawVwWxdi.3P4BHS','010-1111-1123'),(14,'2022-10-07 06:52:56',NULL,_binary '','2022-10-07 06:52:56','청담동','강남구','서울특별시','1988-12-16','psj88@naver.com',NULL,'박서준','박새로이','$2a$10$j4.Qo1VN3FOYzdLfiSfOlOBpw0bFPWKvYFe7nTyrG4u.N1kqpiHBm','010-1111-1124'),(15,'2022-10-07 06:53:03',NULL,_binary '','2022-10-07 06:53:03','산본동','구구구','군포시','1997-03-30','cew97@naver.com',NULL,'차은우','차은우','$2a$10$82P2XTtN2w0sYsvpj/UGZ.cXlCqoJKOmF8KPxfAEwd8joPWHbgQaK','010-1111-1125'),(16,'2022-10-07 06:53:10',NULL,_binary '','2022-10-07 06:53:10','방배동','서초구','서울특별시','1966-09-04','bjw66@hanmail.net',NULL,'백종원','슈가보이','$2a$10$HTlB/Fh82Sre0TcwpFoi7.oMMSosDfimBqHQAqEP5qYHjDPnVQAWW','010-1111-1126'),(17,'2022-10-07 06:53:16',NULL,_binary '','2022-10-07 06:53:16','이태원동','용산구','서울특별시','1968-06-23','samsungjy@hanmail.net',NULL,'이재용','나 삼성부회장','$2a$10$ptFjO4zrbSa3f70DYjkmHecmdzJICQqw4T59uxpFmYtzC6.ei57fa','010-1111-1127'),(18,'2022-10-07 06:53:22',NULL,_binary '','2022-10-07 10:50:31','문흥동','북구','광주광역시','1994-10-10','missasj@naver.com',NULL,'배수지','수지','$2a$10$JNJmLmCwczPSrg/dY.D.xudOGiOLy7u1ZWu/BhmTLDhJH40T8IAVm','010-1111-1128'),(19,'2022-10-07 06:53:33',NULL,_binary '','2022-10-07 06:53:33','산본동','구구구','군포시','1995-01-03','jisoo@gmail.com',NULL,'지수','불쾌지수','$2a$10$ViS7YOxeBnOUa5LxYeh29eBilEPeAsUdr4kX6mm9Fen4U3zZXfEeu','010-1111-1130'),(20,'2022-10-07 06:53:39',NULL,_binary '','2022-10-07 06:53:39','청담동','강남구','서울특별시','1996-01-16','jennie@gmail.com',NULL,'제니','제니','$2a$10$65zNXbnCvPGMK3PCI8ZtS.XMBPe8mQ29Y6roxUMpHlyKdSwc.cpAK','010-1111-1131'),(21,'2022-10-07 06:53:45',NULL,_binary '','2022-10-07 06:53:45','합정동','마포구','서울특별시','1997-03-27','lisa@gmail.com',NULL,'리사','리사','$2a$10$jtaeGrDo3abJAhSHNFCkIe/8Te6AwbNM7we9KeLSvpCilq7vd4NnW','010-1111-1132'),(22,'2022-10-07 06:53:49',NULL,_binary '','2022-10-07 06:53:49','합정동','마포구','서울특별시','1997-02-11','rose@gmail.com',NULL,'로제','로제 떡볶이','$2a$10$mgAo.lo8fUYY65ztK.31BO6J3WrVqQZ6xU1zAmFMDY0Z1eRfhMSi6','010-1111-1133'),(23,'2022-10-07 06:53:54',NULL,_binary '','2022-10-07 06:53:54','동동','마산합포구','창원시','1970-09-01','hjm70@naver.com',NULL,'황정민','전요환 목사','$2a$10$zFaXKJbyCNsNpZNwg4uDyO6.mbS9uRrOp4gNlMr0F.ieOM7YlCsBm','010-1111-1134'),(24,'2022-10-07 06:53:58',NULL,_binary '','2022-10-07 06:53:58','잠원동','서초구','서울특별시','1978-03-11','hjw123@naver.com',NULL,'하정우','강인구','$2a$10$dD2E9af0k1LD7Pid.EKgx.GBYLpype6M29KdLuXfhRvbNOaQa/q5K','010-1111-1135'),(25,'2022-10-07 06:54:04',NULL,_binary '','2022-10-07 06:54:04','동동동','중구','대구광역시','1979-01-16','jwj123@gmail.com',NULL,'조우진','변기태','$2a$10$XePOD2vNjvlyhZdihwwknesNBpamFC7k49v1CkBDcxonV05DR/hSe','010-1111-1136'),(26,'2022-10-07 06:55:43',NULL,_binary '','2022-10-07 06:55:43','동동동','홍성읍','홍성군','1995-12-13','pbsu1213@hanmail.net',NULL,'박범수','캐리범','$2a$10$.tVlrOzag0pDV/PIh3RBq.Lpeo1pSuu1ymLBJ4RV4rV0hsX5MB58O','010-1111-1129'),(27,'2022-10-07 07:20:17','2022-10-07 10:08:02',_binary '\0','2022-10-07 10:08:02',NULL,'창원시','경상남도','2022-10-06','ska05142@naver.com','/images/profile/244784b0-db6c-4e35-a7f2-8a1e6c15c9e4.jpeg','test','test','$2a$10$YFU.3Q.I1evToRwgtLbh4.jK76tMcVzg3Rl/QU16J2ofFATot.MV6','010-3488-8888'),(28,'2022-10-07 07:47:32',NULL,_binary '','2022-10-07 07:47:32','영통구','수원시','경기도','2022-10-06','ssafy@samsung.com',NULL,'이재용','나는 부회장','$2a$10$dSQKVWeVBTN72BdYirJjyubjfiUaIEjdv0vHPhZ6Lcsjfffr4SPIG','010-3333-3333'),(29,'2022-10-07 07:58:58',NULL,_binary '','2022-10-07 10:42:34',NULL,NULL,'서울특별시','2022-10-06','ska05142@gmail.com','/images/profile/de9e104c-6eef-411e-a998-102e3ca101e2.jpeg','test1','test1','$2a$10$GsEBm8HolbMpVShbzMkW0.R3ruYQMZeXEDYTlarepeYBfr26NQpHW','010-3488-6030'),(30,'2022-10-07 08:06:16',NULL,_binary '','2022-10-07 08:07:31',NULL,'보령시','충청남도','1996-04-22','zerojei0423@naver.com',NULL,'신영제','신빵제','$2a$10$pRldSCk6VfB6yVMryXndDuNYD2T.1N80dEHTrt9KENWG4/OysIgyq','010-7412-1945'),(36,'2022-10-07 09:33:49',NULL,_binary '','2022-10-07 09:34:19',NULL,'청주시','충청북도','2022-10-05','dudwp1945@naver.com',NULL,'Test44','Test44','$2a$10$BjQWxBN6glNIn.Ktcz3Ly.kpbp3a8dIXi2meP8KLwpZqaU6cr6rJS','010-3488-6039'),(37,'2022-10-07 09:36:03',NULL,_binary '','2022-10-07 09:36:03',NULL,NULL,'서울특별시','2022-10-07','youstina1019@gmail.com',NULL,'test33','test33','$2a$10$czcIEeDRcawgKAQOKP9R3umJlCM5Wgc8EJL3pUhphMuLH0OZ/mj1G','010-3488-6038'),(38,'2022-10-07 10:11:22',NULL,_binary '','2022-10-07 10:43:45','','목포시','전라남도','2022-08-17','rlamsp234@naver.com','/images/profile/cb49d3b5-93e2-40da-bfcc-83b8fcab3f5a.jpeg','sss','ssafy','$2a$10$ffot09WlYCZQ1tfPpYJ1oO6sN.Egi6rYjk/A72DTlFLztt3DZxIr6','010-3333-4444'),(39,'2022-10-07 10:15:58',NULL,_binary '','2022-10-07 10:16:15',NULL,NULL,'서울특별시','2020-06-18','joong1108@naver.com',NULL,'영제형동샹','영제형동생','$2a$10$zAZ6XjXuYSgEY9Zs6Y3Tl.Pv2/83TgJBcV3KoSfBzF/B4pKnv3FQy','010-9328-5369'),(40,'2022-10-07 10:28:08',NULL,_binary '','2022-10-07 10:28:40',NULL,'보령시','충청남도','2022-10-07','alswp001107@gmail.com',NULL,'신민제','Skxjs','$2a$10$K8K1lcXASz/RUxE2cyEuReW619mW6SalzJr0CsH6qNTB//NtpmQhm','010-6660-6831');
/*!40000 ALTER TABLE `member` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-07 10:51:29
