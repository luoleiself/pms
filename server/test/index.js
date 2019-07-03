const Koa = require("koa");
const app = new Koa();
// const log4js = require("koa-log4");
const path = require("path");
const md5 = require("md5");
// const logger = require('../config/log.config');

// logger
// const logsUtil = require("../utils/logs.js");
// app.use(async (ctx, next) => {
//   const start = new Date(); // 响应开始时间
//   let intervals; // 响应间隔时间
//   try {
//     await next();
//     intervals = new Date() - start;
//   } catch (error) {
//     intervals = new Date() - start;
//   }
//   logsUtil.logError(ctx, error, intervals); //记录异常日志
// });
/* *********************************************************** */
const Router = require("koa-router");
const router = new Router();

// const log4js = require("log4js");
// log4js.configure("../config/log4js.json");
// const logger = log4js.getLogger("access");

const logger = require("../utils/logUtils");

router.get("/home", async (ctx, next) => {
  await next();
  ctx.body = "hello home";
  logger.logAccess(ctx);
});
router.get("/about", async (ctx, next) => {
  await next();
  ctx.body = "hello about";
  logger.logAccess(ctx);
});
router.get("/", async (ctx, next) => {
  await next();
  logger.logError(ctx, new Error("hello world"));
  try {
    let a = 1 / 0;
    console.log(a);
  } catch (err) {
    logger.logError(ctx, err);
  } finally {
    ctx.body = "hello world";
    logger.logAccess(ctx);
  }
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
  console.log("service listening in http://localhost:3000...");
});

let msg = "hello world";
let password = "123456";
console.log(md5(msg));
console.log(md5(password));
