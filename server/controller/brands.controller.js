const Router = require("koa-router");
const models = require("../models");
const { brandsService } = require("../service");

const router = new Router();
/**
 * @api {get} /brands getBrandsList
 * @apiName getBrandsList
 * @apiGroup brands
 *
 * @apiParam {Number} [manufactor_id] 供应商id
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
 *        { id: 1, name: '品牌名称', desc: '品牌描述', ...},
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
 *      { id: 1, name: '品牌名称', desc: '品牌描述', ...},
 *      ...
 *    ]
 *  }
 *
 * @apiSampleRequest http://localhost:9999/api/brands
 * @apiVersion 0.1.0
 */
router.get("/", async (ctx, next) => {
  await next();
  let { logUtils, resData, dbQuery } = ctx;
  try {
    let result = null;
    if (dbQuery.p && dbQuery.p_size) {
      result = await brandsService.findAllByPages(ctx, models); // 分页查询全部
    } else {
      dbQuery.keys = dbQuery.keys ? dbQuery.keys : "";
      result = await brandsService.findAllByParams(ctx, models); // 按条件查询全部
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
 * @api {get} /brands/:id getBrandById
 * @apiName getBrandById
 * @apiGroup brands
 *
 * @apiParam {Number} id brand id
 * @apiSuccessExample Success-Response-1:
 *  HTTP/1.1 200 OK
 *  {
 *    code: 10200,
 *    msg: '操作成功',
 *    data: { id: 1, name: '品牌名称', desc: '品牌描述', ... },
 *  }
 * @apiSuccessExample Error-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    code: 10404,
 *    msg: '未查询到该品牌信息!',
 *    data: []
 *  }
 * @apiSuccessExample Error-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    code: 10400,
 *    msg: '请求参数错误!',
 *    data: []
 *  }
 * @apiSampleRequest http://localhost:9999/api/brands/:id
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
/**
 * @api {post} /brands addBrand
 * @apiName addBrand
 * @apiGroup brands
 *
 * @apiParam {String} name 品牌名称
 * @apiParam {String} [desc] 品牌名称
 * @apiParam {Number} [pid] 所属品牌
 * @apiParam {Number} manufactor_id 供应商id
 *
 * @apiParamExample {json} Request-Example:
 *  {
 *    name: '品牌名称',
 *    desc: '品牌描述'，
 *    pid: '',
 *    manufactor_id: 1,
 *  }
 * @apiSuccessExample Success-Response-1:
 *  HTTP/1.1 200 OK
 *  {
 *    code: 10200,
 *    msg: '操作成功',
 *    data: { id: 1, name: '品牌名称', desc: '品牌描述', ... },
 *  }
 * @apiSuccessExample Error-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    code: 10404,
 *    msg: '该品牌名称已存在!',
 *    data: []
 *  }
 * @apiSuccessExample Error-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    code: 10400,
 *    msg: '请求参数错误!',
 *    data: []
 *  }
 * @apiSampleRequest http://localhost:9999/api/brands
 * @apiVersion 0.1.0
 */
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
/**
 * @api {put} /brands/:id updateBrand
 * @apiName updateBrand
 * @apiGroup brands
 *
 * @apiParam {Number} id 品牌id
 * @apiParam {String} name 品牌名称
 * @apiParam {String} [desc] 品牌名称
 * @apiParam {Number} [pid] 所属品牌
 * @apiParam {Number} manufactor_id 供应商id
 *
 * @apiParamExample {json} Request-Example:
 *  {
 *    id: 1
 *    name: '品牌名称',
 *    desc: '品牌描述'，
 *    pid: '',
 *    manufactor_id: 1,
 *  }
 * @apiSuccessExample Success-Response-1:
 *  HTTP/1.1 200 OK
 *  {
 *    code: 10200,
 *    msg: '操作成功',
 *    data: { id: 1, name: '品牌名称', desc: '品牌描述', ... },
 *  }
 * @apiSuccessExample Error-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    code: 10404,
 *    msg: '未查询到该品牌信息!',
 *    data: []
 *  }
 * @apiSuccessExample Error-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    code: 10400,
 *    msg: '请求参数错误!',
 *    data: []
 *  }
 * @apiSampleRequest http://localhost:9999/api/brands/:id
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
/**
 * @api {delete} /brands/:id deleteBrand
 * @apiName deleteBrand
 * @apiGroup brands
 *
 * @apiParam {Number} id 品牌id
 * @apiSuccessExample Success-Response-1:
 *  HTTP/1.1 200 OK
 *  {
 *    code: 10200,
 *    msg: '操作成功',
 *    data: { id: 1, name: '品牌名称', desc: '品牌描述', ... },
 *  }
 * @apiSuccessExample Error-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    code: 10404,
 *    msg: '未查询到该品牌信息!',
 *    data: []
 *  }
 * @apiSuccessExample Error-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    code: 10400,
 *    msg: '请求参数错误!',
 *    data: []
 *  }
 * @apiSampleRequest http://localhost:9999/api/brands/:id
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
/**
 * @api {get} /brands/tree/:id getBrandTreeById
 * @apiName getBrandTreeById
 * @apiGroup brands
 *
 * @apiParam {Number} id 品牌id
 * @apiSuccessExample Success-Response-1:
 *  HTTP/1.1 200 OK
 *  {
 *    code: 10200,
 *    msg: '操作成功',
 *    data: [
 *      { id: 1, name: '品牌名称', desc: '品牌描述', ... ,children:[]}
 *      ...
 *    ],
 *  }
 * @apiSuccessExample Error-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    code: 10404,
 *    msg: '未查询到该品牌信息!',
 *    data: []
 *  }
 * @apiSuccessExample Error-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    code: 10400,
 *    msg: '请求参数错误!',
 *    data: []
 *  }
 * @apiSampleRequest http://localhost:9999/api/brands/tree/:id
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

// router.all("/", async (ctx, next) => {
//   await next();
//   let { resData } = ctx;
//   resData.code = 10404;
//   resData.data = ctx.path;
//   resData.msg = "未匹配到正确资源操作路由!";
//   ctx.body = resData;
// });

exports = module.exports = router;
