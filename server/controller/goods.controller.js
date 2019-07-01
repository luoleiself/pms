const Router = require("koa-router");
const router = new Router();
const { goodsService } = require("../service");

router.get("/:id", async (ctx, next) => {
  let { logUtils } = ctx;
  await next();
  ctx.body = {
    code: 0,
    msg: "请求成功",
    data: {
      path: ctx.path,
      params: ctx.params
    }
  };
  let result = await goodsService.findAll();
  console.log("result:", result);
  logUtils.logAccess(ctx);
});

router.all("/", async (ctx, next) => {
  let { logUtils } = ctx;
  await next();
  ctx.body = {
    code: 0,
    msg: "请求成功",
    data: []
  };
  logUtils.logAccess(ctx);
});

router.exports = module.exports = router;
