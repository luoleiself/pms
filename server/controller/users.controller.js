const Router = require("koa-router");
const models = require("../models");
const { usersService } = require("../service");

const router = new Router();

router.get("/:id", async (ctx, next) => {
  await next();
  ctx.body = { code: 1000, msg: "请求成功", data: `${ctx.origin}${ctx.path}` };
});

router.all("/", async (ctx, next) => {
  const { logUtils } = ctx;
  await next();
  try {
    let result = await usersService.findAll(models, ctx);
    ctx.body = { code: 10000, msg: "请求成功", data: JSON.stringify(result) };
  } catch (error) {
    logUtils.logError(ctx, error);
    ctx.body = { code: 10001, data: [], msg: "服务器错误" };
  }
});

exports = module.exports = router;
