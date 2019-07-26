const Router = require("koa-router");
const models = require("../models");
const { manufactorsService } = require("../service");

const router = new Router();
/**
 * @api {get} /manufactors getManufactorsList
 * @apiName getManufactorsList
 * @apiGroup manufactors
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
 *        { id: 1, name: '供应商名称', desc: '供应商描述', ... },
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
 *      { id: 1, name: '分类名称', desc: '分类描述', ... },
 *      ...
 *    ]
 *  }
 *
 * @apiSampleRequest http://localhost:9999/api/manufactors
 * @apiVersion 0.1.0
 */
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
/**
 * @api {get} /manufactors/:id getManufactorsById
 * @apiName getManufactorsById
 * @apiGroup manufactors
 *
 * @apiParam {Number} id manufactor id
 * @apiSuccessExample Success-Response-1:
 *  HTTP/1.1 200 OK
 *  {
 *    code: 10200,
 *    msg: '操作成功',
 *    data: { id: 1, name: '供应商名称', desc: '供应商描述', ... },
 *  }
 * @apiSuccessExample Error-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    code: 10404,
 *    msg: '未查询到该供应商信息!',
 *    data: []
 *  }
 * @apiSuccessExample Error-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    code: 10400,
 *    msg: '请求参数错误!',
 *    data: []
 *  }
 * @apiSampleRequest http://localhost:9999/api/manufactors/:id
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
    let result = await manufactorsService.findById(ctx, models);
    if (!result) {
      resData.code = 10404;
      resData.msg = "未查询到该供应商信息!";
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
 * @api {post} /manufactors addManufactors
 * @apiName addManufactors
 * @apiGroup manufactors
 *
 * @apiParam {string} name 供应商名称
 * @apiParam {string} [desc] 供应商描述
 * @apiParam {string} [address] 地址
 * @apiParam {string} [contact] 联系人
 * @apiParam {string} [telephone] 联系电话
 * @apiParam {string} [fax] 传真
 * @apiParam {string} [email] 邮箱
 * @apiParamExample {json} Request-Example:
 * {
 *    name: '供应商名称',
 *    desc: '供应商描述',
 *    address: '地址',
 *    contact: '联系人',
 *    telephone: '联系电话',
 *    fax: '传真',
 *    email: '邮箱'
 * }
 * @apiSuccessExample Success-Response-1:
 *  HTTP/1.1 200 OK
 *  {
 *    code: 10200,
 *    msg: '操作成功',
 *    data: { id: 1, name: '供应商名称', desc: '供应商描述', ... },
 *  }
 * @apiSuccessExample Error-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    code: 10404,
 *    msg: '该供应商名称已存在!',
 *    data: []
 *  }
 * @apiSuccessExample Error-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    code: 10400,
 *    msg: '请求参数错误!',
 *    data: []
 *  }
 * @apiSampleRequest http://localhost:9999/api/manufactors
 * @apiVersion 0.1.0
 */
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
/**
 * @api {put} /manufactors/:id updateManufactors
 * @apiName updateManufactors
 * @apiGroup manufactors
 *
 * @apiParam {Number} id manufactor id
 * @apiParam {string} name 供应商名称
 * @apiParam {string} [desc] 供应商描述
 * @apiParam {string} [address] 地址
 * @apiParam {string} [contact] 联系人
 * @apiParam {string} [telephone] 联系电话
 * @apiParam {string} [fax] 传真
 * @apiParam {string} [email] 邮箱
 * @apiParamExample {json} Request-Example:
 * {
 *    name: '供应商名称',
 *    desc: '供应商描述',
 *    address: '地址',
 *    contact: '联系人',
 *    telephone: '联系电话',
 *    fax: '传真',
 *    email: '邮箱'
 * }
 * @apiSuccessExample Success-Response-1:
 *  HTTP/1.1 200 OK
 *  {
 *    code: 10200,
 *    msg: '操作成功',
 *    data: { id: 1, name: '供应商名称', desc: '供应商描述', ... },
 *  }
 * @apiSuccessExample Error-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    code: 10404,
 *    msg: '该供应商不存在!',
 *    data: []
 *  }
 * @apiSuccessExample Error-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    code: 10400,
 *    msg: '请求参数错误!',
 *    data: []
 *  }
 * @apiSampleRequest http://localhost:9999/api/manufactors/:id
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
    let result = await manufactorsService.update(ctx, models);
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
/**
 * @api {delete} /manufactors/:id deleteManufactors
 * @apiName deleteManufactors
 * @apiGroup manufactors
 *
 * @apiParam {Number} id manufactor id
 * @apiSuccessExample Success-Response-1:
 *  HTTP/1.1 200 OK
 *  {
 *    code: 10200,
 *    msg: '操作成功',
 *    data: { id: 1, name: '供应商名称', desc: '供应商描述', ... },
 *  }
 * @apiSuccessExample Error-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    code: 10404,
 *    msg: '该供应商不存在!',
 *    data: []
 *  }
 * @apiSuccessExample Error-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    code: 10400,
 *    msg: '请求参数错误!',
 *    data: []
 *  }
 * @apiSampleRequest http://localhost:9999/api/manufactors/:id
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
