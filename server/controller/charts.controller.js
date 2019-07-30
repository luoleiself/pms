const Router = require("koa-router");
const models = require("../models");
const { chartsService } = require("../service");

const router = new Router();
router.get("/statGoodsByCategory", async (ctx, next) => {
  await next();
  let { logUtils, resData } = ctx;
  try {
    let result = await chartsService.statGoodsByCategory(ctx, models);
    resData.data = result;
    ctx.body = resData;
  } catch (error) {
    logUtils.logError(ctx, error);
    ctx.status = 500;
  }
});

router.get("/sales", async (ctx, next) => {
  await next();
  let { logUtils, resData } = ctx;
  try {
    let result = await chartsService.sumSalesAmountByTime(ctx, models);
    if (!result) {
      resData.code = 10404;
      resData.msg = "未查询到记录!";
    } else {
      resData.data = result;
    }
    ctx.body = resData;
  } catch (error) {
    logUtils.logError(ctx, error);
    ctx.status = 500;
  }
});
router.get("/purchase", async (ctx, next) => {
  await next();
  let { logUtils, resData } = ctx;
  try {
    let result = await chartsService.sumPurchaseAmountByTime(ctx, models);
    if (!result) {
      resData.code = 10404;
      resData.msg = "未查询到记录!";
    } else {
      resData.data = result;
    }
    ctx.body = resData;
  } catch (error) {
    logUtils.logError(ctx, error);
    ctx.status = 500;
  }
});
exports = module.exports = router;
