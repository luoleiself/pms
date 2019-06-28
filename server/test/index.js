const Koa = require("koa");
const app = new Koa();
const log4js = require("koa-log4");
const path = require("path");
// const logger = require('../config/log.config');

// logger
const logsUtil = require("../utils/logs.js");
app.use(async (ctx, next) => {
  const start = new Date(); // 响应开始时间
  let intervals; // 响应间隔时间
  try {
    await next();
    intervals = new Date() - start;
  } catch (error) {
    intervals = new Date() - start;
  }
  logsUtil.logError(ctx, error, intervals); //记录异常日志
});

app.listen(3000, () => {
  console.log("service listening in http://localhost:3000...");
});
