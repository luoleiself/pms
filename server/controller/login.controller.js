const Router = require("koa-router");
const models = require("../models");
const { loginService } = require("../service");

const router = new Router();
// 用户登陆
router.post("/", async (ctx, next) => {
  await next();
  let { logUtils, resData, jwt } = ctx;
  try {
    let result = await loginService.login(ctx, models);
    if (result.code === 400) {
      resData.code = 10400;
      resData.msg = "密码错误!";
    } else if (result.code === 404) {
      resData.code = 10404;
      resData.msg = "该用户名不存在!";
    } else {
      resData.data = result;
      ctx.token = resData.token = jwt.sign({
        id: result.id,
        username: result.username,
        name: result.name
      });
    }

    ctx.body = resData;
  } catch (error) {
    logUtils.logError(ctx, error);
    ctx.status = 500;
  }
});
// 用户退出登陆
router.delete("/", async (ctx, next) => {
  await next();
  let { logUtils, resData, jwt } = ctx;
  try {
    ctx.token = null;
    resData.msg = "退出成功!";
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
