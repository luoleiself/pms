const Koa = require("koa");
const md5 = require("md5");
const koaBody = require("koa-body");
const models = require("./models");
const router = require("./controller");
const logUtils = require("./utils/logUtils");
const pages = require("./middleware/pages");
const headers = require("./middleware/headers");

const app = new Koa();

app.use(async (ctx, next) => {
  ctx.logUtils = logUtils;
  ctx.resData = {
    code: 10200,
    msg: "操作成功",
    data: []
  };
  await next();
  let { resData } = ctx;
  ctx.status = 200;
  if (ctx.status == 500) {
    resData.code = 10500;
    resData.msg = "服务器内部错误";
    ctx.body = resData;
  }
  logUtils.logAccess(ctx);
});

app
  .use(koaBody())
  .use(pages)
  .use(headers);

app.use(router.routes()).use(router.allowedMethods());

/* 数据库同步 */
models.sequelize
  .sync()
  .then(async () => {
    console.log("|----- database sync success -----|");

    app.listen(30000, () => {
      console.log("pms service is running at http://localhost:30000");
    });
  })
  .catch(err => {
    if (err.name == "SequelizeConnectionError") {
      console.error(`数据库连接错误，请检查数据库是否存在!`);
      process.exit();
    }
  });
