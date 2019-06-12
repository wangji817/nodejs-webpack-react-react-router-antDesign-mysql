/*
Navicat MySQL Data Transfer

Source Server         : jj
Source Server Version : 50553
Source Host           : localhost:3306
Source Database       : jjchapter

Target Server Type    : MYSQL
Target Server Version : 50553
File Encoding         : 65001

Date: 2019-06-05 10:47:13
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `csdnlist`
-- ----------------------------
DROP TABLE IF EXISTS `csdnlist`;
CREATE TABLE `csdnlist` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `csdnTitle` varchar(255) DEFAULT NULL,
  `csdnNickName` varchar(255) DEFAULT NULL,
  `csdnAvtar` varchar(255) DEFAULT NULL,
  `csdnCreateDate` varchar(255) DEFAULT NULL,
  `csdnChapterDesc` varchar(255) DEFAULT NULL,
  `csdnUserUrl` varchar(255) DEFAULT NULL,
  `csdnBlogUrl` varchar(255) DEFAULT NULL,
  `csdnViews` bigint(20) DEFAULT NULL,
  `csdnComments` bigint(20) DEFAULT NULL,
  `csdnId` varchar(255) DEFAULT NULL,
  `csdnTags` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of csdnlist
-- ----------------------------
