# README

> 项目运行依赖于 NodeJS 环境，Node >= 8.12.0

```bash
node -v   # node 版本
npm -v    # npm 版本
```

## 数据库配置

> 数据库连接配置项: pms/server/config/db.config.json

> 数据库文件: pms/server/bak/pms.sql

```javascript
// 默认配置
dialect: mysql;
database: pms;
port: 3306;
username: root;
password: 1006611;
```

## 服务配置

> 客户端和服务器端配置项: pms/server/config/host.json

- server：http://localhost:9999/api

- client：http://localhost:9998

  ```javascript
  // 示例用户
  username: "zhangsan";
  password: 123456;
  ```

## 项目启动

```bash
  npm install   # 安装项目运行依赖
  npm run dev   # 启动
```

## 其他命令

```bash
  npm run lint          # 客户端代码语法检查
  npm run build         # 构建客户端生产环境
  npm run dev           # 同时启动客户端服务器和接口服务器
  npm run dev:server    # 只启动接口服务器
  npm run dev:client    # 只启动客户端服务器
  npm run dev:api       # 启动接口文档服务器
```

## 项目目录
