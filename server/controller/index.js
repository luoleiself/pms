const Router = require("koa-router");
const router = new Router();
// router.prefix("/api");
const goods = require("./goods.controller");

router.use("/goods", goods.routes());

router.all("/", async (ctx, next) => {
  // 添加日志工具
  let { logUtils } = ctx;
  await next();
  ctx.body = { code: 0, msg: "Not matched to any routing" };
  logUtils.logAccess(ctx);
});

exports = module.exports = router;
