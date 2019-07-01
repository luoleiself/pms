const Koa = require("koa");
const app = new Koa();
const models = require("./models");
const router = require("./controller");
const logUtils = require("./utils/logUtils");

app.use(async (ctx, next) => {
  ctx.logUtils = logUtils;
  let startTime = Date.now();
  await next();
  let endTime = Date.now();
  ctx.set("X-Response-Time", `${endTime - startTime}ms`);
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
  console.log("pms service is running at http://localhost:3000");
});

/* 数据库同步 */
models.sequelize
  .sync()
  .then(() => {
    console.log("database sync success...");
  })
  .catch(err => {
    console.log(err);
  });
