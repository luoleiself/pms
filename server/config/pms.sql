/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50553
Source Host           : 127.0.0.1:3306
Source Database       : pms

Target Server Type    : MYSQL
Target Server Version : 50553
File Encoding         : 65001

Date: 2019-07-24 20:43:44
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
  `path` varchar(20) DEFAULT NULL COMMENT '菜单路径',
  `alias` varchar(20) DEFAULT NULL COMMENT '路径缩写',
  `status` tinyint(1) DEFAULT '1' COMMENT '启用状态: 1启用，0禁用',
  `create_time` int(10) unsigned DEFAULT NULL COMMENT '创建时间',
  `update_time` int(10) unsigned DEFAULT NULL COMMENT '更新时间',
  `operator` varchar(20) DEFAULT NULL COMMENT '操作人员',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of access
-- ----------------------------
INSERT INTO `access` VALUES ('1', '0', '登录页', '/login', 'login', '1', null, null, null);
INSERT INTO `access` VALUES ('2', '0', '导航页', '/home', 'home', '1', null, null, null);
INSERT INTO `access` VALUES ('3', '2', '首页', '/home/index', 'index', '1', null, null, null);
INSERT INTO `access` VALUES ('4', '2', '商品管理', '/home/goods', 'goods', '1', null, null, null);
INSERT INTO `access` VALUES ('5', '2', '分类管理', '/home/categories', 'categories', '1', null, null, null);
INSERT INTO `access` VALUES ('6', '2', '品牌管理', '/home/brands', 'brands', '1', null, null, null);
INSERT INTO `access` VALUES ('7', '2', '供应商管理', '/home/manufactors', 'manufactors', '1', null, null, null);
INSERT INTO `access` VALUES ('8', '2', '采购管理', '/home/purchase', 'purchase', '1', null, null, null);
INSERT INTO `access` VALUES ('9', '2', '销售管理', '/home/sale', 'sale', '1', null, null, null);
INSERT INTO `access` VALUES ('10', '2', '用户管理', '/home/users', 'users', '1', null, null, null);

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
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of brands
-- ----------------------------
INSERT INTO `brands` VALUES ('11', '0', '康师傅', '著名品牌', '1', '1563540342', null, '张三', '14');
INSERT INTO `brands` VALUES ('12', '0', '统一', '著名品牌', '1', '1563540504', null, '张三', '15');
INSERT INTO `brands` VALUES ('13', '0', '加多宝', '凉茶一哥', '1', '1563796223', null, '张三', '16');

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
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;

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
INSERT INTO `categories` VALUES ('23', '16', '功能饮料', '功能饮料', '1563796259', null, '1', '张三');

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
INSERT INTO `goods` VALUES ('13', '矿泉水', '矿泉水，矿物质水', '水', '100', '1563540355', '1563774705', '1', '张三', '11', '18');
INSERT INTO `goods` VALUES ('14', '方便面', '泡面', '油炸型方便面，大份量', '5', '1563541147', null, '1', '张三', '11', '17');

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
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of manufactors
-- ----------------------------
INSERT INTO `manufactors` VALUES ('14', '康师傅控股有限公司', '康师傅', '北京市北京路1号', '贝贝', '13112345678', '010-12345678', '13112345678@163.com', '1563540246', null, '1', '张三');
INSERT INTO `manufactors` VALUES ('15', '统一企业公司', '著名公司', '上海市上海路1号', '嗨嗨', '13112345678', '010-1234567478', '12345678@163.com', '1563540474', null, '1', '张三');
INSERT INTO `manufactors` VALUES ('16', '加多宝集团有限公司', '凉茶一哥', '广东省广州市白云区白云路1号', '宝宝', '13112345678', '010-12345678', '12345678@163.com', '1563796171', null, '1', '张三');

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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of purchase
-- ----------------------------
INSERT INTO `purchase` VALUES ('1', '1.20', '10', '1563788273', '1563788367', '张三', '14');
INSERT INTO `purchase` VALUES ('2', '5.00', '100', '1563886174', null, '张三', '13');

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
INSERT INTO `roles` VALUES ('1', '管理员', 'admin', '1', null, null, '');
INSERT INTO `roles` VALUES ('2', '销售', 'sale', '1', null, null, null);
INSERT INTO `roles` VALUES ('3', '采购', 'purchase', '1', null, null, null);

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
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of role_access
-- ----------------------------
INSERT INTO `role_access` VALUES ('2', '3', '1');
INSERT INTO `role_access` VALUES ('11', '3', '2');
INSERT INTO `role_access` VALUES ('15', '3', '3');
INSERT INTO `role_access` VALUES ('3', '4', '1');
INSERT INTO `role_access` VALUES ('12', '4', '2');
INSERT INTO `role_access` VALUES ('16', '4', '3');
INSERT INTO `role_access` VALUES ('4', '5', '1');
INSERT INTO `role_access` VALUES ('5', '6', '1');
INSERT INTO `role_access` VALUES ('6', '7', '1');
INSERT INTO `role_access` VALUES ('7', '8', '1');
INSERT INTO `role_access` VALUES ('17', '8', '3');
INSERT INTO `role_access` VALUES ('8', '9', '1');
INSERT INTO `role_access` VALUES ('13', '9', '2');
INSERT INTO `role_access` VALUES ('9', '10', '1');

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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sales
-- ----------------------------
INSERT INTO `sales` VALUES ('1', '1.50', '11', '1563813100', '1563786846', '张三', '13');
INSERT INTO `sales` VALUES ('2', '2.00', '1', '1563796032', null, '张三', '13');
INSERT INTO `sales` VALUES ('3', '5.00', '5', '1563796955', null, '张三', '14');
INSERT INTO `sales` VALUES ('4', '5.00', '88', '1563886214', null, '张三', '13');

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
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('1', '张三', 'zhangsan', 'e10adc3949ba59abbe56e057f20f883e', '0', '系统部', '010-12345678', '北京市北京路1号', '1', '1563956172', '1563956215', '张三');
INSERT INTO `users` VALUES ('10', '李四', 'lisi', 'e10adc3949ba59abbe56e057f20f883e', '1', '采购部', '13112345678', '上海市上海路1号', '1', '1563953178', '1563972092', '李四');
INSERT INTO `users` VALUES ('11', '王五', 'wangwu', 'e10adc3949ba59abbe56e057f20f883e', '1', '销售部', '13187654321', '广州市广州路1号', '1', '1563956103', '1563956167', '张三');

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
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_role
-- ----------------------------
INSERT INTO `user_role` VALUES ('1', '1', '1');
INSERT INTO `user_role` VALUES ('13', '2', '1');
INSERT INTO `user_role` VALUES ('15', '2', '11');
INSERT INTO `user_role` VALUES ('14', '3', '1');
INSERT INTO `user_role` VALUES ('12', '3', '10');
