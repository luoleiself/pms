# README

> 项目运行依赖于 NodeJS 环境，Node >= 8.12.0

```bash
node -v   # node 版本
npm -v    # npm 版本
```

## 数据库配置

* 数据库连接配置项: 
  > pms/server/config/db.config.json
* 数据库结构和数据文件: 
  > pms/server/bak/pms.sql

```javascript
// 数据库连接默认配置
dialect: mysql;
database: pms;
port: 3306;
username: root;
password: 1006611;
```

## 服务配置

* 客户端和服务器端配置项: 
  > pms/server/config/host.json

```javascript
// 示例用户
用户名: zhangsan
密码: 123456
```

## 项目启动

```bash
  npm install   # 安装项目运行依赖
  npm run dev   # 启动客户端服务和接口服务
```

## 地址

- 服务器端地址：http://localhost:9999/api/users

- 客户端访问地址：http://localhost:9998

- 接口文档地址: http://localhost:10000

## 其他命令

```bash
  npm run server        # 启动接口服务
  npm run client        # 启动客户端服务
  npm run client:lint   # 客户端代码语法检查
  npm run client:build  # 构建客户端生产环境
  npm run api           # 启动接口文档服务器
```

## 项目目录

```
|-- pms
  |-- node_modules 依赖模块文件
  |-- README.md  项目指南
  |-- package.json  项目依赖文件
  |-- vue.config.js vue配置文件
  |-- apidoc.json   接口文档配置文件
  |-- public  静态资源文件
  |-- server 服务器端目录
    |-- bak   备份文件目录
    |-- config  配置文件目录
    |-- controller  路由文件目录
    |-- doc  接口文档目录
    |-- logs  日志文件目录
    |-- middleware   中间件目录
    |-- models  数据库模型目录
    |-- service 业务逻辑目录
    |-- test  测试文件目录
    |-- utils 工具方法目录
    |-- index.js 入口文件
  |-- src
    |-- assets
    |-- component
    |-- router.js
    |-- store.js
    |-- App.vue
    |-- main.js  页面入口文件
```