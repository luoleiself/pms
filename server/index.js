const Koa = require("koa");
const url = require("url");
const md5 = require("md5");
const koaBody = require("koa-body");
const models = require("./models");
const router = require("./controller");
const resData = require("./middleware/resData"); // 响应数据模板
const validateParams = require("./middleware/validateParams"); // 检查请求参数格式
const headers = require("./middleware/headers"); // 设置响应头
const validateToken = require("./middleware/validateToken"); // 验证token
const hostName = require("./config/host.json");
const jwt = require("./utils/jwt");

const app = new Koa();

app
  .use(async (ctx, next) => {
    ctx.jwt = jwt;
    ctx.Op = models.Sequelize.Op;
    ctx.md5 = md5;
    await next();
  })
  .use(headers)
  .use(resData)
  .use(validateParams)
  .use(validateToken)
  .use(koaBody());

app.use(router.routes()).use(router.allowedMethods());

/* 数据库同步 */
models.sequelize
  .sync()
  .then(async () => {
    console.log("|----- database sync success -----|");

    app.listen(hostName.server.port, () => {
      console.log(`pms service is running at ${url.format(hostName.server)}`);
    });
  })
  .catch(err => {
    if (err.name == "SequelizeConnectionError") {
      console.error(`数据库连接错误，请检查数据库是否存在!`);
      process.exit();
    }
  });
