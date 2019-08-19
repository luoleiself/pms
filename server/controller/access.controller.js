const Router = require("koa-router");
const models = require("../models");
const { accessService } = require("../service");

const router = new Router();
/**
 * @api {get} /access getAccessList
 * @apiName getAccessList
 * @apiGroup access
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
 *        { id: 1, name: '权限名称', path: '权限路由', ... },
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
 *      { id: 1, name: '权限名称', path: '权限路由', ... },
 *      ...
 *    ]
 *  }
 *
 * @apiVersion 0.1.0
 */
router.get("/", async (ctx, next) => {
  let { logUtils, resData, dbQuery } = ctx;
  await next();
  try {
    let result = null;
    if (dbQuery.p && dbQuery.p_size) {
      result = await accessService.findAllByPages(ctx, models); // 分页查询全部
    } else {
      dbQuery.keys = dbQuery.keys ? dbQuery.keys : "";
      result = await accessService.findAllByParams(ctx, models); // 按条件查询全部
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
/**
 * @api {get} /access/:id geAccessById
 * @apiName geAccessById
 * @apiGroup access
 *
 * @apiParam {Number} id access id
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
 *      name: '权限名称',
 *      ...
 *    }
 *  }
 * @apiSuccessExample Error-Response-1:
 *  HTTP/1.1 200 OK
 *  {
 *    code: 10404,
 *    msg: '该权限不存在!',
 *    data: []
 *  }
 * @apiSuccessExample Error-Response-2:
 *  HTTP/1.1 200 OK
 *  {
 *    code: 10400,
 *    msg: '请求参数错误!',
 *    data: []
 *  }
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
    let result = await accessService.findById(ctx, models);
    if (!result) {
      resData.code = 10404;
      resData.msg = "未查询到该权限信息";
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
 * @api {post} /access addAccess
 * @apiName addAccess
 * @apiGroup access
 *
 * @apiParam {String} name 权限名称
 * @apiParam {String} path 权限路由
 * @apiParam {String} alias 权限简称
 *
 * @apiParamExample {json} Request-Example:
 *  {
 *    name: '权限名称'
 *    path: '/home/access',
 *    alias: 'access',
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
 *      name: '权限名称',
 *      ...
 *    }
 *  }
 * @apiSuccessExample Error-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    code: 10403,
 *    msg: '该权限路由已存在!',
 *    data: []
 *  }
 * @apiVersion 0.1.0
 */
router.post("/", async (ctx, next) => {
  await next();
  let { logUtils, resData } = ctx;
  try {
    let [result, created] = await accessService.add(ctx, models);
    if (created) {
      resData.data = result;
    } else {
      resData.code = 10403;
      resData.msg = "该权限路由已存在!";
    }
    ctx.body = resData;
  } catch (error) {
    logUtils.logError(ctx, error);
  }
});
/**
 * @api {put} /access/:id updateAccess
 * @apiName updateAccess
 * @apiGroup access
 *
 * @apiParam {Number} id   access id
 * @apiParam {String} name 权限名称
 * @apiParam {String} path 权限路由
 * @apiParam {String} alias 权限简称
 *
 * @apiParamExample {json} Request-Example-1:
 *  {
 *    id: 1
 *    name: '权限名称'
 *    path: '/home/access',
 *    alias: 'access',
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
 *      name: '权限名称',
 *      ...
 *    }
 *  }
 * @apiSuccessExample Error-Response-1:
 *  HTTP/1.1 200 OK
 *  {
 *    code: 10404,
 *    msg: '该权限信息不存在!',
 *    data: []
 *  }
 * @apiSuccessExample Error-Response-2:
 *  HTTP/1.1 200 OK
 *  {
 *    code: 10400,
 *    msg: '请求参数错误!',
 *    data: []
 *  }
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
    let result = await accessService.update(ctx, models);
    if (!result) {
      resData.msg = "该权限信息不存在!";
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
 * @api {get} /access/tree/:id getAccessTreeById
 * @apiName getAccessTreeById
 * @apiGroup access
 *
 * @apiParam {Number} id access id
 * @apiSuccessExample Success-Response-1:
 *  HTTP/1.1 200 OK
 *  {
 *    code: 10200,
 *    msg: '操作成功',
 *    data: { id: 1, name: '登陆页', path:'/home/login', alias:'login',... },
 *  }
 * @apiSuccessExample Error-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    code: 10404,
 *    msg: '未查询到该权限信息!',
 *    data: []
 *  }
 * @apiSuccessExample Error-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    code: 10400,
 *    msg: '请求参数错误!',
 *    data: []
 *  }
 * @apiVersion 0.1.0
 */
router.get("/tree/:id", async (ctx, next) => {
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
    let result = await accessService.getTree(ctx, models);
    if (!result) {
      resData.code = 10404;
      resData.msg = "未查询到该权限信息!";
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
