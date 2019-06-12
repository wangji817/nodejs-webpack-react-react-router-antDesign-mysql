/*
Navicat MySQL Data Transfer

Source Server         : jj
Source Server Version : 50553
Source Host           : localhost:3306
Source Database       : jjchapter

Target Server Type    : MYSQL
Target Server Version : 50553
File Encoding         : 65001

Date: 2019-06-04 10:13:34
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `chapterlist`
-- ----------------------------
DROP TABLE IF EXISTS `chapterlist`;
CREATE TABLE `chapterlist` (
  `chapterId` varchar(255) DEFAULT '',
  `chapterName` varchar(255) DEFAULT NULL,
  `chapterLikeCount` bigint(20) DEFAULT NULL,
  `chapterCommentsCount` bigint(20) DEFAULT NULL,
  `chapterTags` varchar(255) DEFAULT NULL,
  `chapterUsername` varchar(255) DEFAULT NULL,
  `chapterUrl` varchar(255) DEFAULT NULL,
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;