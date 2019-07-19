/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50553
Source Host           : 127.0.0.1:3306
Source Database       : pms

Target Server Type    : MYSQL
Target Server Version : 50553
File Encoding         : 65001

Date: 2019-07-19 21:02:05
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for access
-- ----------------------------
DROP TABLE IF EXISTS `access`;
CREATE TABLE `access` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '菜单id',
  `pid` int(10) unsigned DEFAULT '0' COMMENT '菜单父id',
  `name` varchar(20) DEFAULT NULL COMMENT '菜单名称',
  `url` varchar(20) DEFAULT NULL COMMENT '菜单连接',
  `status` tinyint(1) DEFAULT '1' COMMENT '启用状态: 1启用，0禁用',
  `create_time` int(10) unsigned DEFAULT NULL COMMENT '创建时间',
  `update_time` int(10) unsigned DEFAULT NULL COMMENT '更新时间',
  `operator` varchar(20) DEFAULT NULL COMMENT '操作人员',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of access
-- ----------------------------
INSERT INTO `access` VALUES ('1', '0', '首页', '/home', '1', '1562637693', null, null);
INSERT INTO `access` VALUES ('2', '0', '采购', '/home/purchase', '1', null, null, null);
INSERT INTO `access` VALUES ('3', '0', '销售', '/home/sales', '1', null, null, null);

-- ----------------------------
-- Table structure for brands
-- ----------------------------
DROP TABLE IF EXISTS `brands`;
CREATE TABLE `brands` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '品牌id',
  `pid` int(10) unsigned DEFAULT '0' COMMENT '父级品牌id',
  `name` varchar(20) DEFAULT NULL COMMENT '品牌名称',
  `desc` varchar(100) DEFAULT NULL COMMENT '品牌描述',
  `status` tinyint(1) DEFAULT '1' COMMENT '启用状态: 1启用，0禁用',
  `create_time` int(10) unsigned DEFAULT NULL COMMENT '创建时间',
  `update_time` int(10) unsigned DEFAULT NULL COMMENT '更新时间',
  `operator` varchar(20) DEFAULT NULL COMMENT '操作人员',
  `manufactor_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `manufactor_id` (`manufactor_id`),
  CONSTRAINT `brands_ibfk_1` FOREIGN KEY (`manufactor_id`) REFERENCES `manufactors` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of brands
-- ----------------------------
INSERT INTO `brands` VALUES ('11', '0', '康师傅', '著名品牌', '1', '1563540342', null, '张三', '14');
INSERT INTO `brands` VALUES ('12', '0', '统一', '著名品牌', '1', '1563540504', null, '张三', '15');

-- ----------------------------
-- Table structure for categories
-- ----------------------------
DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '分类id',
  `pid` int(10) unsigned DEFAULT '0' COMMENT '父级分类id',
  `name` varchar(20) DEFAULT NULL COMMENT '分类名称',
  `desc` varchar(100) DEFAULT NULL COMMENT '分类描述',
  `create_time` int(10) unsigned DEFAULT NULL COMMENT '创建时间',
  `update_time` int(10) unsigned DEFAULT NULL COMMENT '更新时间',
  `status` tinyint(1) DEFAULT '1' COMMENT '启用状态: 1启用，0禁用',
  `operator` varchar(20) DEFAULT NULL COMMENT '操作人员',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of categories
-- ----------------------------
INSERT INTO `categories` VALUES ('16', '0', '食品饮料', '一级分类', '1563540600', null, '1', '张三');
INSERT INTO `categories` VALUES ('17', '16', '方便食品', '二级分类', '1563540697', '1563540853', '1', '张三');
INSERT INTO `categories` VALUES ('18', '16', '饮用水', '二级分类', '1563540902', '1563540929', '1', '张三');
INSERT INTO `categories` VALUES ('19', '16', '牛奶酸奶', '二级分类', '1563540947', null, '1', '张三');
INSERT INTO `categories` VALUES ('20', '16', '调味品', '二级分类', '1563540996', null, '1', '张三');
INSERT INTO `categories` VALUES ('21', '0', '电子产品', '一级分类', '1563541021', null, '1', '张三');
INSERT INTO `categories` VALUES ('22', '21', '手机', '二级分类', '1563541060', null, '1', '张三');

-- ----------------------------
-- Table structure for goods
-- ----------------------------
DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '商品id',
  `name` varchar(20) DEFAULT NULL COMMENT '商品名称',
  `keys` varchar(100) DEFAULT NULL COMMENT '检索关键字',
  `desc` varchar(100) DEFAULT NULL COMMENT '商品描述',
  `amount` smallint(5) unsigned DEFAULT '0' COMMENT '库存数据量',
  `create_time` int(10) unsigned DEFAULT NULL COMMENT '创建时间',
  `update_time` int(10) unsigned DEFAULT NULL COMMENT '更新时间',
  `status` tinyint(1) DEFAULT '1' COMMENT '启用状态: 1启用，0禁用',
  `operator` varchar(20) DEFAULT NULL COMMENT '操作人员',
  `brand_id` int(10) unsigned DEFAULT NULL,
  `category_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `brand_id` (`brand_id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `goods_ibfk_1` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `goods_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of goods
-- ----------------------------
INSERT INTO `goods` VALUES ('13', '矿泉水', '矿泉水，矿物质水', '水', '0', '1563540355', null, '1', '张三', '11', null);
INSERT INTO `goods` VALUES ('14', '方便面', '泡面', '油炸型方便面，大份量', '0', '1563541147', null, '1', '张三', '11', '17');

-- ----------------------------
-- Table structure for manufactors
-- ----------------------------
DROP TABLE IF EXISTS `manufactors`;
CREATE TABLE `manufactors` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '供应商id',
  `name` varchar(20) DEFAULT NULL COMMENT '供应商名称',
  `desc` varchar(100) DEFAULT NULL COMMENT '供应商描述',
  `address` varchar(100) DEFAULT NULL COMMENT '供应商地址',
  `contact` varchar(20) DEFAULT NULL COMMENT '联系人',
  `telephone` varchar(15) DEFAULT NULL COMMENT '联系方式',
  `fax` varchar(15) DEFAULT NULL COMMENT '传真号码',
  `email` varchar(20) DEFAULT NULL COMMENT '邮箱地址',
  `create_time` int(10) unsigned DEFAULT NULL COMMENT '创建时间',
  `update_time` int(10) unsigned DEFAULT NULL COMMENT '更新时间',
  `status` tinyint(1) DEFAULT '1' COMMENT '启用状态: 1启用，0禁用',
  `operator` varchar(20) DEFAULT NULL COMMENT '操作人员',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of manufactors
-- ----------------------------
INSERT INTO `manufactors` VALUES ('14', '康师傅控股有限公司', '康师傅', '北京市北京路1号', '贝贝', '13112345678', '010-12345678', '13112345678@163.com', '1563540246', null, '1', '张三');
INSERT INTO `manufactors` VALUES ('15', '统一企业公司', '著名公司', '上海市上海路1号', '嗨嗨', '13112345678', '010-1234567478', '12345678@163.com', '1563540474', null, '1', '张三');

-- ----------------------------
-- Table structure for purchase
-- ----------------------------
DROP TABLE IF EXISTS `purchase`;
CREATE TABLE `purchase` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '采购记录id',
  `price` decimal(10,2) unsigned DEFAULT '0.00' COMMENT '采购单价',
  `amount` smallint(5) unsigned DEFAULT '0' COMMENT '采购数量',
  `create_time` int(10) unsigned DEFAULT NULL COMMENT '创建时间',
  `update_time` int(10) unsigned DEFAULT NULL COMMENT '更新时间',
  `operator` varchar(20) DEFAULT NULL COMMENT '操作人员',
  `goods_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `goods_id` (`goods_id`),
  CONSTRAINT `purchase_ibfk_1` FOREIGN KEY (`goods_id`) REFERENCES `goods` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of purchase
-- ----------------------------

-- ----------------------------
-- Table structure for roles
-- ----------------------------
DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '角色id',
  `name` varchar(20) DEFAULT NULL COMMENT '角色名称',
  `desc` varchar(100) DEFAULT NULL COMMENT '角色描述',
  `status` tinyint(1) DEFAULT '1' COMMENT '启用状态: 1启用，0禁用',
  `create_time` int(10) unsigned DEFAULT NULL COMMENT '创建时间',
  `update_time` int(10) unsigned DEFAULT NULL COMMENT '更新时间',
  `operator` varchar(20) DEFAULT NULL COMMENT '操作人员',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of roles
-- ----------------------------
INSERT INTO `roles` VALUES ('1', 'admin', '超级管理员', '1', '1562637693', null, null);
INSERT INTO `roles` VALUES ('2', 'sale', '销售', '1', '1562637693', null, null);
INSERT INTO `roles` VALUES ('3', 'purchase', '采购', '1', '1563177129', null, null);

-- ----------------------------
-- Table structure for role_access
-- ----------------------------
DROP TABLE IF EXISTS `role_access`;
CREATE TABLE `role_access` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '角色菜单id',
  `access_id` int(10) unsigned DEFAULT NULL,
  `role_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `role_access_role_id_access_id_unique` (`access_id`,`role_id`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `role_access_ibfk_1` FOREIGN KEY (`access_id`) REFERENCES `access` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `role_access_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of role_access
-- ----------------------------
INSERT INTO `role_access` VALUES ('1', '1', '1');
INSERT INTO `role_access` VALUES ('2', '2', '1');
INSERT INTO `role_access` VALUES ('5', '2', '3');
INSERT INTO `role_access` VALUES ('4', '3', '1');
INSERT INTO `role_access` VALUES ('3', '3', '2');

-- ----------------------------
-- Table structure for sales
-- ----------------------------
DROP TABLE IF EXISTS `sales`;
CREATE TABLE `sales` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '销售记录id',
  `price` decimal(10,2) unsigned DEFAULT '0.00' COMMENT '销售单价',
  `amount` smallint(5) unsigned DEFAULT '0' COMMENT '销售数量',
  `create_time` int(10) unsigned DEFAULT NULL COMMENT '创建时间',
  `update_time` int(10) unsigned DEFAULT NULL COMMENT '更新时间',
  `operator` varchar(20) DEFAULT NULL COMMENT '操作人员',
  `goods_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `goods_id` (`goods_id`),
  CONSTRAINT `sales_ibfk_1` FOREIGN KEY (`goods_id`) REFERENCES `goods` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sales
-- ----------------------------

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `name` varchar(20) DEFAULT NULL COMMENT '用户姓名',
  `username` varchar(20) DEFAULT NULL COMMENT '登陆用户名',
  `password` varchar(200) DEFAULT NULL COMMENT '用户密码',
  `sex` tinyint(1) DEFAULT '1' COMMENT '性别: 1男, 0女',
  `department` varchar(15) DEFAULT NULL COMMENT '所属部门',
  `telephone` varchar(15) DEFAULT NULL COMMENT '联系电话',
  `address` varchar(100) DEFAULT NULL COMMENT '地址',
  `status` tinyint(1) DEFAULT '1' COMMENT '启用状态: 1启用，0禁用',
  `create_time` int(10) unsigned DEFAULT NULL COMMENT '创建时间',
  `update_time` int(10) unsigned DEFAULT NULL COMMENT '更新时间',
  `operator` varchar(20) DEFAULT NULL COMMENT '操作人员',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('1', '张三', 'zhangsan', 'e10adc3949ba59abbe56e057f20f883e', '1', '采购部', '13112345678', '北京市朝阳区朝阳路1号', '1', '1562637693', null, null);
INSERT INTO `users` VALUES ('12', '李四', 'lisi', 'e10adc3949ba59abbe56e057f20f883e', '1', '销售', null, null, '1', null, null, null);
INSERT INTO `users` VALUES ('13', '总管', 'zongguan', 'e10adc3949ba59abbe56e057f20f883e', '1', '系统部', null, null, '1', null, null, null);

-- ----------------------------
-- Table structure for user_role
-- ----------------------------
DROP TABLE IF EXISTS `user_role`;
CREATE TABLE `user_role` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '用户角色id',
  `role_id` int(10) unsigned DEFAULT NULL,
  `user_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_role_user_id_role_id_unique` (`role_id`,`user_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `user_role_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_role_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_role
-- ----------------------------
INSERT INTO `user_role` VALUES ('3', '1', '13');
INSERT INTO `user_role` VALUES ('2', '2', '12');
INSERT INTO `user_role` VALUES ('1', '3', '1');
