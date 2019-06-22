const Router = require("koa-router");
const router = new Router();
// router.prefix("/api");

router.use((ctx, next) => {
  console.log("router income...");
  next();
});


router.get("h", "/home/:id", (ctx, next) => {
  console.log("no use async 2 start");
  next();
  ctx.body = "hello world";
  console.log("no use async 2 end");
});

router.all("/", (ctx, next) => {
  next();
  ctx.body = "not found";
});

exports = module.exports = router;
