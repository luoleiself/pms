const Router = require("koa-router");
const models = require("../models");
const { usersService } = require("../service");

const router = new Router();
/**
 * @apiDefine 400And404
 * @apiSuccessExample Error-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    code: 10404,
 *    msg: '该用户不存在!',
 *    data: []
 *  }
 * @apiSuccessExample Error-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    code: 10400,
 *    msg: '请求参数错误!',
 *    data: []
 *  }
 */

/**
 * @api {get} /users getUsersList
 * @apiName getUsersList
 * @apiGroup users
 *
 * @apiUse commonRequestParams
 * @apiUse commonRequestExample
 * @apiUse commonResponseParams
 *
 * @apiSuccessExample Success-Response-1:
 *  HTTP/1.1 200 OK
 *  {
 *    code: 10200,
 *    msg: '操作成功',
 *    data:{
 *      p: 1,
 *      p_size: 10,
 *      total: 30,
 *      rows:[
 *        {id: 1, name: '张三', username: 'zhangsan', ...},
 *        ...
 *      ]
 *    }
 *  }
 * @apiSuccessExample Success-Response-2:
 *  HTTP/1.1 200 OK
 *  {
 *    code: 10200,
 *    msg: '操作成功',
 *    data:[
 *      {id: 1, name: '张三', username: 'zhangsan', ...},
 *      ...
 *    ]
 *  }
 *
 * @apiSampleRequest http://localhost:9999/api/users
 * @apiVersion 0.1.0
 */
router.get("/", async (ctx, next) => {
  let { logUtils, resData, dbQuery } = ctx;
  await next();
  try {
    let result = null;
    if (dbQuery.p && dbQuery.p_size) {
      result = await usersService.findAllByPages(ctx, models); // 分页查询全部
    } else {
      dbQuery.keys = dbQuery.keys ? dbQuery.keys : "";
      result = await usersService.findAllByParams(ctx, models); // 分页查询全部
    }
    if (Array.isArray(result)) {
      resData.data = result;
    } else {
      resData.data = {
        total: result.count,
        p: +dbQuery.p,
        p_size: +dbQuery.p_size,
        rows: result.rows
      };
    }
    ctx.body = resData;
  } catch (error) {
    logUtils.logError(ctx, error);
    ctx.status = 500;
  }
});
/**
 * @api {get} /users/:id getUserById
 * @apiName getUserById
 * @apiGroup users
 *
 * @apiParam {Number} id user id
 * @apiSuccess {Number} [code=10200] 状态码
 * @apiSuccess {String} [msg='操作成功'] 提示信息
 * @apiSuccess {Object} [data] 结果
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    code: 10200,
 *    msg: '操作成功',
 *    data: {
 *      id: 1,
 *      name: '张三',
 *      username: 'zhangsan',
 *      ...
 *    }
 *  }
 * @apiUse 400And404
 * @apiSampleRequest http://localhost:9999/api/users/:id
 * @apiVersion 0.1.0
 */
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
/**
 * @api {post} /users addUser
 * @apiName addUser
 * @apiGroup users
 *
 * @apiParam {String} name 姓名
 * @apiParam {String} username 登陆用户名
 * @apiParam {String} password 登陆密码
 * @apiParam {Number} [sex] 性别 1->男，0->女
 * @apiParam {String} [address] 地址
 * @apiParam {String} [telephone] 电话
 * @apiParam {String} [department] 部门
 * @apiParam {Array} [role_id] 角色id
 *
 * @apiParamExample {json} Request-Example:
 *  {
 *    name: '张三'
 *    username: 'zhangsan',
 *    password: '123456',
 *    sex: 1,
 *    address: '北京市朝阳区朝阳路1号',
 *    telephone: '13112345678',
 *    department: '系统部',
 *    role_id: [1, 2]
 *  }
 * @apiSuccess {Number} [code=10200] 状态码
 * @apiSuccess {String} [msg='操作成功'] 提示信息
 * @apiSuccess {Object} [result] 结果
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    code: 10200,
 *    msg: '操作成功',
 *    data:{
 *      id: 1,
 *      name: '张三',
 *      username: 'zhangsan',
 *      ...
 *    }
 *  }
 * @apiSuccessExample Error-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    code: 10403,
 *    msg: '该登陆用户名已存在!',
 *    data: []
 *  }
 * @apiSampleRequest http://localhost:9999/api/users/:id
 * @apiVersion 0.1.0
 */
router.post("/", async (ctx, next) => {
  await next();
  let { logUtils, resData } = ctx;
  try {
    let result = await usersService.add(ctx, models);
    if (result.code == 403) {
      resData.code = 10403;
      resData.msg = result.msg;
    } else {
      resData.data = result;
    }
    ctx.body = resData;
  } catch (error) {
    logUtils.logError(ctx, error);
  }
});
/**
 * @api {put} /users/:id updateUser
 * @apiName updateUser
 * @apiGroup users
 *
 * @apiParam {Number} id user id
 * @apiParam {String} name 姓名
 * @apiParam {String} username 登陆用户名
 * @apiParam {String} password 登陆密码
 * @apiParam {Number} [sex] 性别 1->男，0->女
 * @apiParam {String} [address] 地址
 * @apiParam {String} [telephone] 电话
 * @apiParam {String} [department] 部门
 * @apiParam {Array} [role_id] 角色id
 *
 * @apiParamExample {json} Request-Example:
 *  {
 *    id: 1
 *    name: '张三'
 *    username: 'zhangsan',
 *    password: '123456',
 *    sex: 1,
 *    address: '北京市朝阳区朝阳路1号',
 *    telephone: '13112345678',
 *    department: '系统部',
 *    role_id: [1, 2]
 *  }
 * @apiSuccess {Number} [code=10200] 状态码
 * @apiSuccess {String} [msg='操作成功'] 提示信息
 * @apiSuccess {Object} [result] 结果
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    code: 10200,
 *    msg: '操作成功',
 *    data:{
 *      id: 1,
 *      name: '张三',
 *      username: 'zhangsan',
 *      ...
 *    }
 *  }
 * @apiUse 400And404
 * @apiSampleRequest http://localhost:9999/api/users/:id
 * @apiVersion 0.1.0
 */
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
    let result = await usersService.update(ctx, models);
    if (result.code == 404) {
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
/**
 * @api {delete} /users/:id deleteUser
 * @apiName deleteUser
 * @apiGroup users
 *
 * @apiParam {Number} id user id
 *
 * @apiSuccess {Number} [code=10200] 状态码
 * @apiSuccess {String} [msg='操作成功'] 提示信息
 * @apiSuccess {Object} [result] 结果
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    code: 10200,
 *    msg: '操作成功',
 *    data:{
 *      id: 1,
 *      name: '张三',
 *      username: 'zhangsan',
 *      ...
 *    }
 *  }
 * @apiUse 400And404
 * @apiSampleRequest http://localhost:9999/api/users/:id
 * @apiVersion 0.1.0
 */
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
