
SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category`  (
  `CATEGORY_ID` int(0) NOT NULL AUTO_INCREMENT,
  `NAME` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`CATEGORY_ID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of category
-- ----------------------------
INSERT INTO `category` VALUES (1, 'Education');
INSERT INTO `category` VALUES (2, 'Health');
INSERT INTO `category` VALUES (3, 'Environment');
INSERT INTO `category` VALUES (4, 'AnimalWelfare');
INSERT INTO `category` VALUES (5, 'DisasterRelief');

-- ----------------------------
-- Table structure for fundraiser
-- ----------------------------
DROP TABLE IF EXISTS `fundraiser`;
CREATE TABLE `fundraiser`  (
  `FUNDRAISER_ID` int(0) NOT NULL AUTO_INCREMENT,
  `ORGANIZER` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `CAPTION` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `TARGET_FUNDING` decimal(10, 2) NOT NULL,
  `CURRENT_FUNDING` decimal(10, 2) NOT NULL,
  `CITY` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `ACTIVE` tinyint(1) NOT NULL DEFAULT 1,
  `CATEGORY_ID` int(0) NULL DEFAULT NULL,
  PRIMARY KEY (`FUNDRAISER_ID`) USING BTREE,
  INDEX `CATEGORY_ID`(`CATEGORY_ID`) USING BTREE,
  CONSTRAINT `fundraiser_ibfk_1` FOREIGN KEY (`CATEGORY_ID`) REFERENCES `category` (`CATEGORY_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 16 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of fundraiser
-- ----------------------------
INSERT INTO `fundraiser` VALUES (1, 'John Doe', 'Support Rural Schools', 10000.00, 4500.00, 'Sydney', 1, 1);
INSERT INTO `fundraiser` VALUES (2, 'Jane Smith', 'Cancer Treatment for Children', 50000.00, 20000.00, 'Melbourne', 1, 2);
INSERT INTO `fundraiser` VALUES (3, 'Green Earth Foundation', 'Planting Trees in Urban Areas', 15000.00, 8000.00, 'Brisbane', 1, 3);
INSERT INTO `fundraiser` VALUES (4, 'Animal Lovers', 'Save Endangered Koalas', 30000.00, 12000.00, 'Adelaide', 1, 4);
INSERT INTO `fundraiser` VALUES (5, 'Disaster Relief Fund', 'Help Flood Victims in Queensland', 25000.00, 18000.00, 'Perth', 1, 5);
INSERT INTO `fundraiser` VALUES (6, 'James Oliver', 'Scholarship for Underprivileged Students', 20000.00, 10000.00, 'Canberra', 1, 1);
INSERT INTO `fundraiser` VALUES (7, 'Susan Wright', 'Medical Supplies for Remote Communities', 40000.00, 15000.00, 'Hobart', 1, 2);
INSERT INTO `fundraiser` VALUES (8, 'Ocean Cleaners', 'Clean the Great Barrier Reef', 35000.00, 16000.00, 'Cairns', 1, 3);
INSERT INTO `fundraiser` VALUES (9, 'Wildlife Rescue', 'Protect Tasmanian Devils', 15000.00, 7000.00, 'Hobart', 1, 4);
INSERT INTO `fundraiser` VALUES (10, 'Flood Support', 'Help Cyclone Victims in Northern Territory', 30000.00, 25000.00, 'Darwin', 1, 5);
INSERT INTO `fundraiser` VALUES (11, 'Emma Thompson', 'Build Libraries in Rural Areas', 12000.00, 6000.00, 'Sydney', 1, 1);
INSERT INTO `fundraiser` VALUES (12, 'Healthy Life Org', 'Provide Free Health Checkups for Elderly', 50000.00, 30000.00, 'Melbourne', 1, 2);
INSERT INTO `fundraiser` VALUES (13, 'Eco Warriors', 'Reduce Plastic Waste in Sydney Beaches', 18000.00, 8000.00, 'Sydney', 1, 3);
INSERT INTO `fundraiser` VALUES (14, 'Koala Guardians', 'Plant Eucalyptus Trees for Koalas', 22000.00, 9000.00, 'Brisbane', 1, 4);
INSERT INTO `fundraiser` VALUES (15, 'Emergency Relief Team', 'Assist Bushfire Victims in Victoria', 45000.00, 20000.00, 'Melbourne', 1, 5);

SET FOREIGN_KEY_CHECKS = 1;
