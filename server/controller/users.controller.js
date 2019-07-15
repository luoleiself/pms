const Router = require("koa-router");
const models = require("../models");
const { usersService } = require("../service");

const router = new Router();
// 用户登陆
router.get("/login", async (ctx, next) => {
  await next();
  let { logUtils, resData } = ctx;
  try {
    let result  = await usersService.login(ctx,models);
    console.log(result);
  } catch (error) {
    logUtils.logError(ctx, error);
    ctx.status = 500;
  }
});


// 查询所有用户列表分页
router.get("/", async (ctx, next) => {
  await next();
  let { logUtils, resData, dbQuery } = ctx;
  try {
    let result = await usersService.findByPages(ctx, models);
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
// 获取指定用户信息
router.get("/:id", async (ctx, next) => {
  await next();
  let { logUtils, resData } = ctx;
  try {
    let result = await usersService.findById(ctx, models);
    if (!result) {
      resData.code = 10404;
      resData.msg = "未查询到该用户信息";
    } else {
      resData.data = result;
    }
    ctx.body = resData;
  } catch (error) {
    logUtils.logError(ctx, error);
    ctx.status = 500;
  }
});
// 添加新用户
router.post("/", async (ctx, next) => {
  await next();
  let { logUtils, resData } = ctx;
  try {
    let [result, created] = await usersService.add(ctx, models);
    if (created) {
      resData.data = result;
    } else {
      resData.code = 10404;
      resData.msg = "该登陆用户名已存在!";
    }
    ctx.body = resData;
  } catch (error) {
    logUtils.logError(ctx, error);
  }
});
// 更新指定用户信息
router.put("/:id", async (ctx, next) => {
  await next();
  let { logUtils, resData } = ctx;
  try {
    let result = await usersService.update(ctx, models);
    if (!result) {
      resData.msg = "该用户不存在!";
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
// 删除指定用户
router.delete("/:id", async (ctx, next) => {
  await next();
  let { logUtils, resData } = ctx;
  try {
    let result = await usersService.delete(ctx, models);
    if (!result) {
      resData.msg = "该用户不存在!";
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

// router.all('/([^\d].*)', async (ctx, next) => {
//   await next();
//   let { resData } = ctx;
//   resData.code = 10404;
//   resData.msg = "未匹配到正确资源操作路由!";
//   ctx.body = resData;
// });

exports = module.exports = router;
