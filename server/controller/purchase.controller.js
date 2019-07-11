const Router = require("koa-router");
const models = require("../models");
const { purchaseService } = require("../service");

const router = new Router();
// 查询所有采购列表分页
router.get("/", async (ctx, next) => {
  await next();
  let { logUtils, resData, dbQuery } = ctx;
  try {
    let result = await purchaseService.findByPages(ctx, models);
    resData.data = {
      total: result.count,
      p: dbQuery.p,
      p_size: dbQuery.p_size,
      rows: result.rows
    };
    ctx.body = resData;
  } catch (error) {
    logUtils.logError(ctx, error);
    ctx.status = 500;
  }
});
// 获取指定采购信息
router.get("/:id", async (ctx, next) => {
  await next();
  let { logUtils, resData } = ctx;
  try {
    let result = await purchaseService.findById(ctx, models);
    if (!result) {
      resData.code = 10404;
      resData.msg = "未查询到该采购信息";
    } else {
      resData.data = result;
    }
    ctx.body = resData;
  } catch (error) {
    logUtils.logError(ctx, error);
    ctx.status = 500;
  }
});
// 添加采购信息
router.post("/", async (ctx, next) => {
  await next();
  let { logUtils, resData } = ctx;
  try {
    let result = await purchaseService.add(ctx, models);
    resData.data = result;
    ctx.body = resData;
  } catch (error) {
    logUtils.logError(ctx, error);
    ctx.status = 500;
  }
});
// 更新指定采购信息
router.put("/:id", async (ctx, next) => {
  await next();
  let { logUtils, resData } = ctx;
  try {
    let result = await purchaseService.update(ctx, models);
    if (result.code == 0) {
      resData.msg = result.msg;
      resData.code = 10404;
    } else {
      resData.data = result;
    }
    ctx.body = resData;
  } catch (error) {
    logUtils.logError(ctx, error);
    ctx.status = 500;
  }
});
// 删除指定采购记录
router.delete("/:id", async (ctx, next) => {
  await next();
  let { logUtils, resData } = ctx;
  try {
    let result = await purchaseService.delete(ctx, models);
    if (!result) {
      resData.msg = "该采购信息不存在!";
      resData.code = 10404;
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
