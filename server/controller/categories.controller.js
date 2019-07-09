const Router = require("koa-router");
const models = require("../models");
const { categoriesService } = require("../service");

const router = new Router();
// 查询所有分类列表分页
router.get("/", async (ctx, next) => {
  await next();
  let { logUtils, resData, dbQuery } = ctx;
  try {
    let result = await categoriesService.findByPages(ctx, models);
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
// 获取指定分类
router.get("/:id", async (ctx, next) => {
  await next();
  let { logUtils, resData } = ctx;
  try {
    let result = await categoriesService.findById(ctx, models);
    if (!result) {
      resData.code = 10404;
      resData.msg = "未查询到该分类信息";
    } else {
      resData.data = result;
    }
    ctx.body = resData;
  } catch (error) {
    logUtils.logError(ctx, error);
    ctx.status = 500;
  }
});
// 添加分类
router.post("/", async (ctx, next) => {
  await next();
  let { logUtils, resData } = ctx;
  try {
    let [result, created] = await categoriesService.add(ctx, models);
    if (created) {
      resData.data = result;
    } else {
      resData.code = 10404;
      resData.msg = "该分类名称已存在!";
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
  let { logUtils, resData } = ctx;
  try {
    let result = await categoriesService.update(ctx, models);
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
  let { logUtils, resData } = ctx;
  try {
    let result = await categoriesService.delete(ctx, models);
    if (!result) {
      resData.msg = "该分类不存在!";
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
// 获取指定分类的树形结构
router.get("/:id/tree", async (ctx, next) => {
  await next();
  let { logUtils, resData } = ctx;
  try {
    let result = await categoriesService.getTree(ctx, models);
    console.log(result);
    if (!result) {
      resData.code = 10404;
      resData.msg = "未查询到该分类信息";
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
