const Router = require("koa-router");
const models = require("../models");
const { manufactorsService } = require("../service");

const router = new Router();
// 查询所有供应商列表分页
router.get("/", async (ctx, next) => {
  await next();
  let { logUtils, resData, dbQuery } = ctx;
  try {
    let result = null;
    if (dbQuery.p && dbQuery.p_size) {
      result = await manufactorsService.findAllByPages(ctx, models); // 分页查询全部
    } else {
      dbQuery.keys = dbQuery.keys ? dbQuery.keys : "";
      result = await manufactorsService.findAllByParams(ctx, models); // 按条件查询全部不分页
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
// 获取指定供应商
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
    let result = await manufactorsService.findById(ctx, models);
    if (!result) {
      resData.code = 10404;
      resData.msg = "未查询到该供应商信息";
    } else {
      resData.data = result;
    }
    ctx.body = resData;
  } catch (error) {
    logUtils.logError(ctx, error);
    ctx.status = 500;
  }
});
// 添加供应商
router.post("/", async (ctx, next) => {
  await next();
  let { logUtils, resData } = ctx;
  try {
    let [result, created] = await manufactorsService.add(ctx, models);
    if (created) {
      resData.data = result;
    } else {
      resData.code = 10404;
      resData.msg = "该供应商名称已存在!";
    }
    ctx.body = resData;
  } catch (error) {
    logUtils.logError(ctx, error);
    ctx.status = 500;
  }
});
// 更新指定供应商信息
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
    let result = await manufactorsService.update(ctx, models);
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
// 删除指定供应商
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
    let result = await manufactorsService.delete(ctx, models);
    if (!result) {
      resData.msg = "该供应商不存在!";
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

// router.all("/[^1-9]*", async (ctx, next) => {
//   await next();
//   let { resData } = ctx;
//   resData.code = 10404;
//   resData.msg = "未匹配到正确资源操作路由!";
//   ctx.body = resData;
// });

exports = module.exports = router;
