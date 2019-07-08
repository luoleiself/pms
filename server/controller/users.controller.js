const Router = require("koa-router");
const models = require("../models");
const { usersService } = require("../service");

const router = new Router();

router.get("/:id", async (ctx, next) => {
  let { logUtils, resData } = ctx;
  await next();
  try {
    let result = await usersService.findById(models, ctx);
    if (!result) {
      resData.code = 10404;
      resData.msg = "未查询到该用户信息";
    } else {
      resData.data = result;
    }
    ctx.body = resData;
  } catch (error) {
    logUtils.logError(ctx, error);
    ctx.status = 500;
  }
});

router.post("/", async (ctx, next) => {
  let { logUtils, resData } = ctx;
  await next();
  try {
    let result = await usersService.add(models, ctx);
    console.log(result);
  } catch (error) {
    logUtils.logError(ctx, error);
  }
});

router.get("/", async (ctx, next) => {
  let { logUtils, resData, dbQuery } = ctx;
  await next();
  try {
    let result = await usersService.findByPages(models, ctx);
    resData.data = {
      total: result.count,
      p: dbQuery.p,
      p_size: dbQuery.p_size,
      rows: result.rows
    };
    ctx.body = resData;
  } catch (error) {
    logUtils.logError(ctx, error);
    ctx.status = 500;
  }
});

exports = module.exports = router;
