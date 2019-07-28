const Router = require("koa-router");
const models = require("../models");
const { goodsService } = require("../service");

const router = new Router();
/**
 * @api {get} /brands getGoodsList
 * @apiName getGoodsList
 * @apiGroup goods
 *
 * @apiParam {Number} [category_id] 分类id
 * @apiParam {Number} [brand_id] 品牌id
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
 *        { id: 1, name: '商品名称', keys: '商品关键字', ... },
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
 *      { id: 1, name: '商品名称', keys: '商品关键字', ... },
 *      ...
 *    ]
 *  }
 *
 * @apiSampleRequest http://localhost:9999/api/goods
 * @apiVersion 0.1.0
 */
router.get("/", async (ctx, next) => {
  await next();
  let { logUtils, resData, dbQuery } = ctx;
  try {
    let result = null;
    if (dbQuery.p && dbQuery.p_size) {
      result = await goodsService.findAllByPages(ctx, models); // 分页查询全部
    } else {
      dbQuery.keys = dbQuery.keys ? dbQuery.keys : "";
      result = await goodsService.findAllByParams(ctx, models); // 分页查询全部
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
 * @api {get} /goods/:id getBoodsById
 * @apiName getBoodsById
 * @apiGroup goods
 *
 * @apiParam {Number} id goods id
 * @apiSuccessExample Success-Response-1:
 *  HTTP/1.1 200 OK
 *  {
 *    code: 10200,
 *    msg: '操作成功',
 *    data: { id: 1, name: '商品名称', keys: '商品关键字', ... },
 *  }
 * @apiSuccessExample Error-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    code: 10404,
 *    msg: '未查询到该商品信息!',
 *    data: []
 *  }
 * @apiSuccessExample Error-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    code: 10400,
 *    msg: '请求参数错误!',
 *    data: []
 *  }
 * @apiSampleRequest http://localhost:9999/api/goods/:id
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
    let result = await goodsService.findById(ctx, models);
    if (!result) {
      resData.code = 10404;
      resData.msg = "未查询到该商品信息";
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
 * @api {post} /goods addGoods
 * @apiName addGoods
 * @apiGroup goods
 *
 * @apiParam {String} name 商品名称
 * @apiParam {String} [keys] 商品关键字
 * @apiParam {String} [desc] 商品描述
 * @apiParam {Number} category_id 分类id
 * @apiParam {Number} brand_id 品牌id
 *
 * @apiParamExample {json} Request-Example:
 *  {
 *    name: '商品名称',
 *    desc: '商品描述'，
 *    keys: '商品关键字',
 *    category_id: 1,
 *    brand_id: 1,
 *  }
 * @apiSuccessExample Success-Response-1:
 *  HTTP/1.1 200 OK
 *  {
 *    code: 10200,
 *    msg: '操作成功',
 *    data: { id: 1, name: '商品名称', keys: '商品关键字', ... },
 *  }
 * @apiSuccessExample Error-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    code: 10404,
 *    msg: '该商品名称已存在!',
 *    data: []
 *  }
 * @apiSuccessExample Error-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    code: 10400,
 *    msg: '请求参数错误!',
 *    data: []
 *  }
 * @apiSampleRequest http://localhost:9999/api/goods
 * @apiVersion 0.1.0
 */
router.post("/", async (ctx, next) => {
  await next();
  let { logUtils, resData } = ctx;
  try {
    let [result, created] = await goodsService.add(ctx, models);
    if (created) {
      resData.data = result;
    } else {
      resData.code = 10404;
      resData.msg = "该商品名称已存在!";
    }
    ctx.body = resData;
  } catch (error) {
    logUtils.logError(ctx, error);
    ctx.status = 500;
  }
});
/**
 * @api {put} /goods/:id updateGoods
 * @apiName updateGoods
 * @apiGroup goods
 *
 * @apiParam {Number} id 商品id
 * @apiParam {String} name 商品名称
 * @apiParam {String} [desc] 商品描述
 * @apiParam {String} [keys] 商品关键字
 * @apiParam {Number} category_id 分类id
 * @apiParam {Number} brand_id 品牌id
 *
 * @apiParamExample {json} Request-Example:
 *  {
 *    id: 1
 *    name: '商品名称',
 *    desc: '商品描述'，
 *    keys: '商品关键字',
 *    category_id: 1,
 *    brand_id: 1,
 *  }
 * @apiSuccessExample Success-Response-1:
 *  HTTP/1.1 200 OK
 *  {
 *    code: 10200,
 *    msg: '操作成功',
 *    data: { id: 1, name: '商品名称', desc: '商品描述', ... },
 *  }
 * @apiSuccessExample Error-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    code: 10404,
 *    msg: '该商品不存在!',
 *    data: []
 *  }
 * @apiSuccessExample Error-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    code: 10400,
 *    msg: '请求参数错误!',
 *    data: []
 *  }
 * @apiSampleRequest http://localhost:9999/api/goods/:id
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
    let result = await goodsService.update(ctx, models);
    if (!result) {
      resData.msg = "该商品不存在!";
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
 * @api {delete} /goods/:id deleteGoods
 * @apiName deleteGoods
 * @apiGroup goods
 *
 * @apiParam {Number} id 商品id
 * @apiSuccessExample Success-Response-1:
 *  HTTP/1.1 200 OK
 *  {
 *    code: 10200,
 *    msg: '操作成功',
 *    data: { id: 1, name: '商品名称', desc: '商品描述', ... },
 *  }
 * @apiSuccessExample Error-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    code: 10404,
 *    msg: '该商品不存在!',
 *    data: []
 *  }
 * @apiSuccessExample Error-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    code: 10400,
 *    msg: '请求参数错误!',
 *    data: []
 *  }
 * @apiSampleRequest http://localhost:9999/api/goods/:id
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
    let result = await goodsService.delete(ctx, models);
    if (!result) {
      resData.msg = "该商品不存在!";
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

// router.all("/*", async (ctx, next) => {
//   await next();
//   let { resData } = ctx;
//   resData.code = 10404;
//   resData.msg = "未匹配到正确资源操作路由!";
//   ctx.body = resData;
// });

exports = module.exports = router;
