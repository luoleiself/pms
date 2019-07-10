const Router = require("koa-router");
const models = require("../models");
const { brandsService } = require("../service");

const router = new Router();
// 查询所有品牌列表分页
router.get("/", async (ctx, next) => {
  await next();
  let { logUtils, resData, dbQuery } = ctx;
  try {
    let result = await brandsService.findByPages(ctx, models);
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
// 获取指定品牌
router.get("/:id", async (ctx, next) => {
  await next();
  let { logUtils, resData } = ctx;
  try {
    let result = await brandsService.findById(ctx, models);
    if (!result) {
      resData.code = 10404;
      resData.msg = "未查询到该品牌信息";
    } else {
      resData.data = result;
    }
    ctx.body = resData;
  } catch (error) {
    logUtils.logError(ctx, error);
    ctx.status = 500;
  }
});
// 添加品牌
router.post("/", async (ctx, next) => {
  await next();
  let { logUtils, resData } = ctx;
  try {
    let [result, created] = await brandsService.add(ctx, models);
    if (created) {
      resData.data = result;
    } else {
      resData.code = 10404;
      resData.msg = "该品牌名称已存在!";
    }
    ctx.body = resData;
  } catch (error) {
    logUtils.logError(ctx, error);
    ctx.status = 500;
  }
});
// 更新指定品牌信息
router.put("/:id", async (ctx, next) => {
  await next();
  let { logUtils, resData } = ctx;
  try {
    let result = await brandsService.update(ctx, models);
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
// 删除指定品牌
router.delete("/:id", async (ctx, next) => {
  await next();
  let { logUtils, resData } = ctx;
  try {
    let result = await brandsService.delete(ctx, models);
    if (!result) {
      resData.msg = "该品牌不存在!";
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
// 获取指定品牌的树形结构
router.get("/tree/:id", async (ctx, next) => {
  await next();
  let { logUtils, resData } = ctx;
  try {
    let result = await brandsService.getTree(ctx, models);
    if (!result) {
      resData.code = 10404;
      resData.msg = "未查询到该品牌信息";
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
