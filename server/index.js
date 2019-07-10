const Koa = require("koa");
const md5 = require("md5");
const koaBody = require("koa-body");
const models = require("./models");
const router = require("./controller");
const resData = require("./middleware/resData");
const pages = require("./middleware/pages");
const headers = require("./middleware/headers");

const SERVER_PORT = process.env.SERVER_PORT || 80;

const app = new Koa();

app
  .use(pages)
  .use(headers)
  .use(resData)
  .use(koaBody());

app.use(router.routes()).use(router.allowedMethods());

/* 数据库同步 */
models.sequelize
  .sync()
  .then(async () => {
    console.log("|----- database sync success -----|");

    app.listen(SERVER_PORT, () => {
      console.log(`pms service is running at http://localhost:${SERVER_PORT}`);
    });
  })
  .catch(err => {
    if (err.name == "SequelizeConnectionError") {
      console.error(`数据库连接错误，请检查数据库是否存在!`);
      process.exit();
    }
  });
