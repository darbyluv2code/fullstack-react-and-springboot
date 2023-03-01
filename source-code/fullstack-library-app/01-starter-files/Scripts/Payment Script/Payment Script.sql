DROP TABLE IF EXISTS `payment`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `payment` (
`id` BIGINT(20) NOT NULL AUTO_INCREMENT,
`user_email` VARCHAR(45) DEFAULT NULL,
`amount` DECIMAL (10,2) DEFAULT NULL,
PRIMARY KEY (`id`)
)ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;