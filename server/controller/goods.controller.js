const Router = require("koa-router");
const router = new Router();

router.get("/:id", (ctx, next) => {
  console.log("router goods income...");
  console.log(ctx.params);
  next();
});

exports = module.exports = router;
