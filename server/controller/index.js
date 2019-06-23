const Router = require("koa-router");
const router = new Router();
// router.prefix("/api");
const goods = require("./goods.controller");

router.use((ctx, next) => {
  console.log("router income...");
  next();
  ctx.body = { path: ctx.path, params: ctx.params };
});

router.use("/goods", goods.routes());

exports = module.exports = router;
