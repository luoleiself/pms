const Router = require("koa-router");
const models = require("../models");
const { goodsService } = require("../service");

const router = new Router();
// 查询所有商品列表分页
router.get("/", async (ctx, next) => {
  await next();
  let { logUtils, resData, dbQuery } = ctx;
  try {
    let result = null;
    if (dbQuery.p && dbQuery.p_size) {
      result = await goodsService.findAllByPages(ctx, models); // 分页查询全部
    } else {
      dbQuery.keys = dbQuery.keys ? dbQuery.keys : "";
      result = await goodsService.findAllByParams(ctx, models); // 分页查询全部
    }
    if (Array.isArray(result)) {
      resData.data = result;
    } else {
      resData.data = {
        total: result.count,
        p: dbQuery.p,
        p_size: dbQuery.p_size,
        rows: result.rows
      };
    }
    ctx.body = resData;
  } catch (error) {
    logUtils.logError(ctx, error);
    ctx.status = 500;
  }
});
// 获取指定商品
router.get("/:id", async (ctx, next) => {
  await next();
  let {
    logUtils,
    resData,
    params: { id }
  } = ctx;
  if (id.search(/^(\d)*$/) == -1) {
    ctx.status = 400;
    return;
  }
  try {
    let result = await goodsService.findById(ctx, models);
    if (!result) {
      resData.code = 10404;
      resData.msg = "未查询到该商品信息";
    } else {
      resData.data = result;
    }
    ctx.body = resData;
  } catch (error) {
    logUtils.logError(ctx, error);
    ctx.status = 500;
  }
});
// 添加商品
router.post("/", async (ctx, next) => {
  await next();
  let { logUtils, resData } = ctx;
  try {
    let [result, created] = await goodsService.add(ctx, models);
    if (created) {
      resData.data = result;
    } else {
      resData.code = 10404;
      resData.msg = "该商品名称已存在!";
    }
    ctx.body = resData;
  } catch (error) {
    logUtils.logError(ctx, error);
    ctx.status = 500;
  }
});
// 更新指定商品信息
router.put("/:id", async (ctx, next) => {
  await next();
  let {
    logUtils,
    resData,
    params: { id }
  } = ctx;
  if (id.search(/^(\d)*$/) == -1) {
    ctx.status = 400;
    return;
  }
  try {
    let result = await goodsService.update(ctx, models);
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
// 删除指定商品
router.delete("/:id", async (ctx, next) => {
  await next();
  let {
    logUtils,
    resData,
    params: { id }
  } = ctx;
  if (id.search(/^(\d)*$/) == -1) {
    ctx.status = 400;
    return;
  }
  try {
    let result = await goodsService.delete(ctx, models);
    if (!result) {
      resData.msg = "该商品不存在!";
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

// router.all("/*", async (ctx, next) => {
//   await next();
//   let { resData } = ctx;
//   resData.code = 10404;
//   resData.msg = "未匹配到正确资源操作路由!";
//   ctx.body = resData;
// });

exports = module.exports = router;
