const Router = require("koa-router");
const models = require("../models");
const { usersService } = require("../service");

const router = new Router();

router.get("/:id", async (ctx, next) => {
  const { logUtils, resData } = ctx;
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
    ctx.body = { code: 10500, data: [], msg: "服务器内部错误" };
  }
});

router.get("/", async (ctx, next) => {
  const { logUtils, resData } = ctx;
  await next();
  try {
    let result = await usersService.findByPages(models, ctx);
    console.log(result);
    resData.data = {
      total: result.count,
      list: result.rows
    };
  } catch (error) {
    logUtils.error(ctx, error);
  }
  ctx.body = resData;
});

exports = module.exports = router;
