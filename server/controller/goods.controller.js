const Router = require("koa-router");
const models = require("../models");
const { goodsService } = require("../service");

const router = new Router();

router.get("/:id", async (ctx, next) => {
  await next();
});

router.all("/", async (ctx, next) => {
  const { logUtils } = ctx;
  await next();
  try {
    let result = await goodsService.findAll(models, ctx);
    ctx.body = { code: 10000, msg: "请求成功", data: JSON.stringify(result) };
  } catch (error) {
    logUtils.logError(ctx, error);
    ctx.body = { code: 10001, data: [], msg: "服务器错误" };
  }
});

exports = module.exports = router;
