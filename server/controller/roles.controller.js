const Router = require("koa-router");
const models = require("../models");
const { rolesService } = require("../service");

const router = new Router();
/**
 * @api {get} /roles getRolesList
 * @apiName getRolesList
 * @apiGroup roles
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
 *        { id: 1, name: '角色名称', desc: '角色描述', ... },
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
 *      { id: 1, name: '角色名称', desc: '角色描述', ... },
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
      result = await rolesService.findAllByPages(ctx, models); // 分页查询全部
    } else {
      dbQuery.keys = dbQuery.keys ? dbQuery.keys : "";
      result = await rolesService.findAllByParams(ctx, models); // 按条件查询全部
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
 * @api {get} /roles/:id geRolesById
 * @apiName geRolesById
 * @apiGroup roles
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
 *      name: '管理员',
 *      ...
 *    }
 *  }
 * @apiSuccessExample Error-Response-1:
 *  HTTP/1.1 200 OK
 *  {
 *    code: 10404,
 *    msg: '该角色名称不存在!',
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
    let result = await rolesService.findById(ctx, models);
    if (!result) {
      resData.code = 10404;
      resData.msg = "未查询到该角色信息";
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
 * @api {post} /roles addRoles
 * @apiName addRoles
 * @apiGroup roles
 *
 * @apiParam {String} name 角色名称
 * @apiParam {String} desc 角色描述
 * @apiParam {String} [status=1] 状态
 *
 * @apiParamExample {json} Request-Example:
 *  {
 *    name: '管理员'
 *    desc: 'admin',
 *    status: '1'
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
 *      name: '管理员',
 *      ...
 *    }
 *  }
 * @apiSuccessExample Error-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    code: 10403,
 *    msg: '该角色名称已存在!',
 *    data: []
 *  }
 * @apiVersion 0.1.0
 */
router.post("/", async (ctx, next) => {
  await next();
  let { logUtils, resData } = ctx;
  try {
    let [result, created] = await rolesService.add(ctx, models);
    if (created) {
      resData.data = result;
    } else {
      resData.code = 10403;
      resData.msg = "该角色名称已存在!";
    }
    ctx.body = resData;
  } catch (error) {
    logUtils.logError(ctx, error);
  }
});
/**
 * @api {put} /roles/:id updateRoles
 * @apiName updateRoles
 * @apiGroup roles
 *
 * @apiParam {Number} id   role id
 * @apiParam {String} name 角色名称
 * @apiParam {String} desc 角色描述
 * @apiParam {Array}  access_id 权限id
 *
 * @apiParamExample {json} Request-Example-1:
 *  {
 *    id: 1
 *    name: '管理员'，
 *    desc: 'admin'
 *  }
 * @apiParamExample {json} Request-Example-2:
 *  {
 *    access_id: [1,2,3]
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
 *      name: '管理员',
 *      ...
 *    }
 *  }
 * @apiSuccessExample Error-Response-1:
 *  HTTP/1.1 200 OK
 *  {
 *    code: 10404,
 *    msg: '该角色名称不存在!',
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
    let result = await rolesService.update(ctx, models);
    if (!result) {
      resData.msg = "该角色不存在!";
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
