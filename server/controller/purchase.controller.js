const Router = require("koa-router");
const models = require("../models");
const { purchaseService } = require("../service");

const router = new Router();
/**
 * @api {get} /purchase getPurchaseList
 * @apiName getPurchaseList
 * @apiGroup purchase
 *
 * @apiParam {Number} [p] 页码
 * @apiParam {Number} [p_size] 每页条数
 * @apiParam {Number} [start_time] 开始时间,日期时间戳秒数
 * @apiParam {Number} [end_time] 结束时间,日期时间戳秒数
 * @apiParam {Number} [goods_id] 商品id
 *
 * @apiParamExample {json} Request-Example
 * {
 *    P: 1,
 *    p_size: 10,
 *    start_time: 1564395476,
 *    end_time: 1564395476,
 *    goods_id: 1,
 * }
 *
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
 *        { id: 1, amount: '数量', ... },
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
 *      { id: 1, amount: '数量', ... },
 *      ...
 *    ]
 *  }
 *
 * @apiVersion 0.1.0
 */
router.get("/", async (ctx, next) => {
  await next();
  let { logUtils, resData, dbQuery } = ctx;
  try {
    let result = await purchaseService.findAllByPages(ctx, models);
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
/**
 * @api {get} /purchase/:id getPurchaseById
 * @apiName getPurchaseById
 * @apiGroup purchase
 *
 * @apiParam {Number} id purchase id
 * @apiSuccessExample Success-Response-1:
 *  HTTP/1.1 200 OK
 *  {
 *    code: 10200,
 *    msg: '操作成功',
 *    data: { id: 1, amount: '数量', ... },
 *  }
 * @apiSuccessExample Error-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    code: 10404,
 *    msg: '未查询到该采购信息!',
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
    let result = await purchaseService.findById(ctx, models);
    if (!result) {
      resData.code = 10404;
      resData.msg = "未查询到该采购信息!";
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
 * @api {post} /purchase addPurchase
 * @apiName addPurchase
 * @apiGroup purchase
 *
 * @apiParam {Number} goods_id  goods id
 * @apiParam {Number} [amount] 数量
 * @apiParamExample {json} Request-Example
 * {
 *    goods_id: 1,
 *    amount: ''
 * }
 *
 * @apiSuccessExample Success-Response-1:
 *  HTTP/1.1 200 OK
 *  {
 *    code: 10200,
 *    msg: '操作成功',
 *    data: { id: 1, amount: '数量', ... },
 *  }
 * @apiVersion 0.1.0
 */
router.post("/", async (ctx, next) => {
  await next();
  let { logUtils, resData } = ctx;
  try {
    let result = await purchaseService.add(ctx, models);
    resData.data = result;
    ctx.body = resData;
  } catch (error) {
    logUtils.logError(ctx, error);
    ctx.status = 500;
  }
});
/**
 * @api {put} /purchase/:id updatePurchase
 * @apiName updatePurchase
 * @apiGroup purchase
 *
 * @apiParam {Number} id purchase id
 * @apiParam {Number} goods_id goods id
 * @apiParam {Number} [amount] 数量
 * @apiParamExample {json} Request-Example
 * {
 *    goods_id: 1,
 *    amount: ''
 * }
 *
 * @apiSuccessExample Success-Response-1:
 *  HTTP/1.1 200 OK
 *  {
 *    code: 10200,
 *    msg: '操作成功',
 *    data: { id: 1, amount: '数量', ... },
 *  }
 * @apiSuccessExample Error-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    code: 10404,
 *    msg: '该采购信息不存在!',
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
    let result = await purchaseService.update(ctx, models);
    if (!result) {
      resData.code = 10404;
      resData.msg = "该采购信息不存在!";
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
 * @api {delete} /purchase/:id deletePurchase
 * @apiName deletePurchase
 * @apiGroup purchase
 *
 * @apiParam {Number} id purchase id
 *
 * @apiSuccessExample Success-Response-1:
 *  HTTP/1.1 200 OK
 *  {
 *    code: 10200,
 *    msg: '操作成功',
 *    data: { id: 1, amount: '数量', ... },
 *  }
 * @apiSuccessExample Error-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    code: 10404,
 *    msg: '该采购信息不存在!',
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
    let result = await purchaseService.delete(ctx, models);
    if (!result) {
      resData.msg = "该采购信息不存在!";
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

exports = module.exports = router;
