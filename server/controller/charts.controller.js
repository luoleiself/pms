const Router = require("koa-router");
const models = require("../models");
const { chartsService } = require("../service");

const router = new Router();
/**
 * @api {get} /category/goods statGoodsByCategory
 * @apiName statGoodsByCategory
 * @apiGroup charts
 *
 * @apiSampleRequest http://localhost:9999/api/charts/category/goods
 * @apiVersion 0.1.0
 */
router.get("/category/goods", async (ctx, next) => {
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
/**
 * @api {get} /sales/record sumSalesAmountByTime
 * @apiName sumSalesAmountByTime
 * @apiGroup charts
 *
 * @apiParam {Number} [p_size=5] 筛选条数
 *
 * @apiSampleRequest http://localhost:9999/api/charts/sales/record
 * @apiVersion 0.1.0
 */
router.get("/sales/record", async (ctx, next) => {
  await next();
  let { logUtils, resData } = ctx;
  try {
    let result = await chartsService.sumSalesAmountByTime(ctx, models);
    if (!result) {
      resData.code = 10404;
      resData.msg = "未查询到记录!";
    } else {
      resData.data = {};
      resData.data.p_size = result.length;
      resData.data.rows = result;
    }
    ctx.body = resData;
  } catch (error) {
    logUtils.logError(ctx, error);
    ctx.status = 500;
  }
});
/**
 * @api {get} /purchase/record sumPurchaseAmountByTime
 * @apiName sumPurchaseAmountByTime
 * @apiGroup charts
 *
 * @apiParam {Number} [p_size=5] 筛选条数
 *
 * @apiSampleRequest http://localhost:9999/api/charts/purchase/record
 * @apiVersion 0.1.0
 */
router.get("/purchase/record", async (ctx, next) => {
  await next();
  let { logUtils, resData } = ctx;
  try {
    let result = await chartsService.sumPurchaseAmountByTime(ctx, models);
    if (!result) {
      resData.code = 10404;
      resData.msg = "未查询到记录!";
    } else {
      resData.data = {};
      resData.data.p_size = result.length;
      resData.data.rows = result;
    }
    ctx.body = resData;
  } catch (error) {
    logUtils.logError(ctx, error);
    ctx.status = 500;
  }
});
/**
 * @api {get} /salesPurchase salesPurchase
 * @apiName salesPurchase
 * @apiGroup charts
 *
 * @apiSampleRequest http://localhost:9999/api/charts/salesPurchase
 * @apiVersion 0.1.0
 */
router.get("/salesPurchase", async (ctx, next) => {
  await next();
  let { logUtils, resData } = ctx;
  try {
    let result = await chartsService.statSalesPurchaseByMonth(ctx, models);
    resData.data = result;
    ctx.body = resData;
  } catch (error) {
    logUtils.logError(ctx, error);
    ctx.status = 500;
  }
});

exports = module.exports = router;
