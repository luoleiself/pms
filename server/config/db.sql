# 删除数据库
DROP DATABASE IF EXISTS `pms`; 
CREATE DATABASE IF NOT EXISTS `pms` CHARACTER SET utf8;

USE `pms`;

/*##################### 商品信息表  #####################*/
DROP TABLE IF EXISTS `goods`;
CREATE TABLE IF NOT EXISTS `goods` (
  `id` int(10) unsigned NOT NULL  AUTO_INCREMENT COMMENT '商品id',
  `name` varchar(20) NOT NULL COMMENT '商品名称',
	`keys` varchar(100) COMMENT '检索关键字',
  `desc` varchar(100) COMMENT '商品描述',
  `amount` smallint(5) unsigned NOT NULL DEFAULT '0' COMMENT '库存数量',
  `create_time` int(10) unsigned COMMENT '创建时间',
  `update_time` int(10) unsigned COMMENT '更新时间',
  `category_id` int(5) unsigned COMMENT '商品分类id',
  `brand_id` int(5) unsigned COMMENT '所属品牌id', 
	`manufactor_id` int(5) unsigned COMMENT '供应商id', 
	primary key(`id`)
);

/*##################### 供应商信息表  #####################*/
DROP TABLE IF EXISTS `manufactors`;
CREATE TABLE IF NOT EXISTS `manufactors`(
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '供应商id', 
	`name` varchar(20) NOT NULL COMMENT '供应商名称', 
	`desc` varchar(100) COMMENT '供应商描述',
	`address` varchar(100) COMMENT '供应商地址', 
	`contact` varchar(20) COMMENT '联系人', 
	`telephone` varchar(15) COMMENT '联系方式', 
	`fax` varchar(15) COMMENT '传真号码', 
	`email` varchar(20) COMMENT '邮箱地址', 
	`create_time` int(10) unsigned COMMENT '创建时间', 
	`update_time` int(10) unsigned COMMENT '更新时间',
	primary key (`id`)
);

/*##################### 分类信息表  #####################*/
DROP TABLE IF EXISTS `categories`;
CREATE TABLE IF NOT EXISTS `categories`(
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '分类id', 
	`pid` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '父级分类id', 
	`name` varchar(20) NOT NULL COMMENT '分类名称', 
	`desc` varchar(100) COMMENT '分类描述', 
	`create_time` int(10) unsigned COMMENT '创建时间', 
	`update_time` int(10) unsigned COMMENT '更新时间', 
	`status` tinyint(1) unsigned DEFAULT '1' COMMENT '启用状态: 1启用，0禁用', 
	primary key(`id`)
);

/*##################### 品牌信息表  #####################*/
DROP TABLE IF EXISTS `brands`;
CREATE TABLE IF NOT EXISTS `brands`(
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '品牌id', 
	`pid` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '父级品牌id', 
	`name` varchar(20) NOT NULL COMMENT '品牌名称', 
	`desc` varchar(100) COMMENT '品牌描述', 
	`create_time` int(10) unsigned COMMENT '创建时间', 
	`update_time` int(10) unsigned COMMENT '更新时间', 
	`status` tinyint(1) unsigned DEFAULT '1' COMMENT '启用状态: 1启用，0禁用',
	primary key(`id`)
);

/*##################### 商品单位信息表  #####################*/
DROP TABLE IF EXISTS `units`;
CREATE TABLE IF NOT EXISTS `units`(
	`id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '单位id', 
	`name` varchar(20) NOT NULL COMMENT '单位名称', 
	`desc` varchar(100) COMMENT '单位描述', 
	`create_time` int(10) unsigned COMMENT '创建时间', 
	`update_time` int(10) unsigned COMMENT '更新时间', 
	`status` tinyint(1) unsigned DEFAULT '1' COMMENT '启用状态: 1启用，0禁用',
	primary key(`id`)
);

/*##################### 销售信息表  #####################*/
DROP TABLE IF EXISTS `sales`;
CREATE TABLE IF NOT EXISTS `sales`(
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '销售记录id', 
	`price` decimal(10,2) unsigned DEFAULT '0.0' COMMENT '销售单价', 
	`amount` smallint(5) unsigned NOT NULL DEFAULT '0' COMMENT '销售数量', 
	`unit` int(5) unsigned NOT NULL COMMENT '商品单位id',
	`create_time` int(10) unsigned COMMENT '创建时间', 
	`update_time` int(10) unsigned COMMENT '更新时间', 
	`operator` int(5) unsigned COMMENT '操作人员id', 
	`goods_id` int(5) unsigned COMMENT '商品id', 
	primary key(`id`)
);

/*##################### 采购信息表  #####################*/
DROP TABLE IF EXISTS `purchase`;
CREATE TABLE IF NOT EXISTS `purchase`(
	`id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '采购信息id',
	`price` decimal(10,2) unsigned default '0.0' COMMENT '采购单价',
	`amount` smallint(5) unsigned default '0' COMMENT '采购数量',
	`unit` int(5) unsigned NOT NULL COMMENT '商品单位id',
	`create_time` int(10) unsigned COMMENT '创建时间',
	`update_time` int(10) unsigned COMMENT '更新时间',
	`operator` int(5) unsigned COMMENT '操作人员id',
	`goods_id` int(5) unsigned COMMENT '商品id',
	primary key(`id`)
);

/*##################### 用户信息表  #####################*/
DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users`(
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '用户id', 
  `name` varchar(20) NOT NULL COMMENT '用户名称', 
  `sex` tinyint(1) unsigned DEFAULT '1' COMMENT '性别: 1男，0女', 
  `department` varchar(15) COMMENT '所属部门',
  `password` varchar(200) COMMENT '用户密码', 
  `telephone` varchar(15) COMMENT '联系电话', 
  `address` varchar(100) COMMENT '地址', 
  `status` tinyint(1) unsigned NOT NULL DEFAULT '1' COMMENT '启用状态: 1启用，0禁用',
  primary key(`id`)
);

/*##################### 角色信息表  #####################*/
DROP TABLE IF EXISTS `roles`;
CREATE TABLE IF NOT EXISTS `roles`(
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '角色id',
  `name` varchar(20) NOT NULL COMMENT '角色名称',
  `desc` varchar(100) COMMENT '角色描述',
	`status` tinyint(1) unsigned NOT NULL DEFAULT '1' COMMENT '启用状态: 1启用，0禁用',
  primary key(`id`)
);

/*##################### 权限信息表  #####################*/
DROP TABLE IF EXISTS `roles`;
CREATE TABLE IF NOT EXISTS `roles`(
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '权限id',
  `name` varchar(20) NOT NULL COMMENT '权限菜单名称',
  `path` varchar(20) NOT NULL COMMENT '权限菜单跳转路径',
  `pid` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '父级权限id',
  `desc` varchar(100) COMMENT '权限菜单描述',
  primary key(`id`)
);

/*##################### 用户角色信息表  #####################*/
DROP TABLE IF EXISTS `user_role`;
CREATE TABLE IF NOT EXISTS `user_role`(
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '用户角色id',
  `user_id` int(10) unsigned COMMENT '用户id',
  `role_id` int(10) unsigned COMMENT '角色id',
  primary key(`id`)
);

/*##################### 角色权限信息表  #####################*/
DROP TABLE IF EXISTS `role_menu`;
CREATE TABLE IF NOT EXISTS `role_menu`( 
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '角色权限id',
  `menu_id` int(10) unsigned COMMENT '权限id',
  `role_id` int(10) unsigned COMMENT '角色id',
  `permission` tinyint(1) unsigned NOT NULL DEFAULT '1' COMMENT '权限状态: 1可用，0不可用',
  primary key(`id`)
);
