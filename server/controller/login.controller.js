const Router = require("koa-router");
const models = require("../models");
const { usersService } = require("../service");

const router = new Router();
/**
 * @api {post} /login login
 * @apiName login
 * @apiGroup login
 *
 * @apiParam {String} username 用户名
 * @apiParam {String} password 密码
 * @apiParamExample {json} Request-Example
 * {
 *    username: 'zhangsan',
 *    password: 'ejyff8dagdsa8987f7das798gda789'
 * }
 * @apiSuccessExample Success-Response-1:
 *  HTTP/1.1 200 OK
 *  {
 *    code: 10200,
 *    msg: '操作成功',
 *    data: { id: 1, name: '用户姓名', username: '登录用户名', password:'', ... },
 *  }
 * @apiSuccessExample Error-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    code: 10400,
 *    msg: '密码错误!',
 *    data: []
 *  }
 * @apiSuccessExample Error-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    code: 10401,
 *    msg: '用户状态未启用!',
 *    data: []
 *  }
 * @apiSuccessExample Error-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    code: 10404,
 *    msg: '该用户名不存在!',
 *    data: []
 *  }
 * @apiSuccessExample Error-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    code: 10405,
 *    msg: '该用户名没有访问权限!',
 *    data: []
 *  }
 * @apiVersion 0.1.0
 */
router.post("/", async (ctx, next) => {
  await next();
  let { logUtils, resData, jwt } = ctx;
  try {
    let result = await usersService.login(ctx, models);
    switch (result.code) {
      case 400:
        resData.code = 10400;
        resData.msg = result.msg;
        break;
      case 403:
        resData.code = 10403;
        resData.msg = result.msg;
        break;
      case 404:
        resData.code = 10404;
        resData.msg = result.msg;
        break;
      case 405:
        resData.code = 10405;
        resData.msg = result.msg;
        break;
      default:
        resData.data = result;
        ctx.token = resData.token = jwt.sign({
          id: result.id,
          username: result.username,
          name: result.name
        });
        break;
    }

    ctx.body = resData;
  } catch (error) {
    logUtils.logError(ctx, error);
    ctx.status = 500;
  }
});
/**
 * @api {delete} /login logout
 * @apiName logout
 * @apiGroup login
 *
 * @apiSuccessExample Success-Response-1:
 *  HTTP/1.1 200 OK
 *  {
 *    code: 10200,
 *    msg: '操作成功',
 *    data: { id: 1, name: '用户姓名', username: '登录用户名', password:'', ... },
 *  }
 * @apiVersion 0.1.0
 */
router.delete("/", async (ctx, next) => {
  await next();
  let { logUtils, resData } = ctx;
  try {
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
