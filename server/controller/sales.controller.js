const Router = require("koa-router");
const models = require("../models");
const { salesService } = require("../service");

const router = new Router();
/**
 * @api {get} /sales getSalesList
 * @apiName getSalesList
 * @apiGroup sales
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
 *        { id: 1, price: '单价', amount: '数量', ... },
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
 *      { id: 1, price: '单价', amount: '数量', ... },
 *      ...
 *    ]
 *  }
 *
 * @apiSampleRequest http://localhost:9999/api/sales
 * @apiVersion 0.1.0
 */
router.get("/", async (ctx, next) => {
  await next();
  let { logUtils, resData, dbQuery } = ctx;
  try {
    let result = await salesService.findAllByPages(ctx, models);
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
 * @api {get} /sales/:id getSalesById
 * @apiName getSalesById
 * @apiGroup sales
 *
 * @apiParam {Number} id sales id
 * @apiSuccessExample Success-Response-1:
 *  HTTP/1.1 200 OK
 *  {
 *    code: 10200,
 *    msg: '操作成功',
 *    data: { id: 1, price: '单价', amount: '数量', ... },
 *  }
 * @apiSuccessExample Error-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    code: 10404,
 *    msg: '未查询到该销售信息!',
 *    data: []
 *  }
 * @apiSuccessExample Error-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    code: 10400,
 *    msg: '请求参数错误!',
 *    data: []
 *  }
 * @apiSampleRequest http://localhost:9999/api/sales/:id
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
    let result = await salesService.findById(ctx, models);
    if (!result) {
      resData.code = 10404;
      resData.msg = "未查询到该销售信息";
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
 * @api {post} /sales addSales
 * @apiName addSales
 * @apiGroup sales
 *
 * @apiParam {Number} goods_id  goods id
 * @apiParam {Number} [price] 单价
 * @apiParam {Number} [amount] 数量
 * @apiParamExample {json} Request-Example
 * {
 *    goods_id: 1,
 *    price: '',
 *    amount: ''
 * }
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    code: 10200,
 *    msg: '操作成功',
 *    data: { id: 1, price: '单价', amount: '数量', ... },
 *  }
 * @apiErrorExample Error-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    code: 10400,
 *    msg: '销售数量不能大于库存数量',
 *    data: [],
 *  }
 * @apiSampleRequest http://localhost:9999/api/sales
 * @apiVersion 0.1.0
 */
router.post("/", async (ctx, next) => {
  await next();
  let { logUtils, resData } = ctx;
  try {
    let result = await salesService.add(ctx, models);
    if (!result) {
      resData.code = 10400;
      resData.msg = "销售数量不能大于库存数量!";
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
 * @api {put} /sales/:id updateSales
 * @apiName updateSales
 * @apiGroup sales
 *
 * @apiParam {Number} id sales id
 * @apiParam {Number} goods_id goods id
 * @apiParam {Number} [price] 单价
 * @apiParam {Number} [amount] 数量
 * @apiParamExample {json} Request-Example
 * {
 *    goods_id: 1,
 *    price: '',
 *    amount: ''
 * }
 *
 * @apiSuccessExample Success-Response-1:
 *  HTTP/1.1 200 OK
 *  {
 *    code: 10200,
 *    msg: '操作成功',
 *    data: { id: 1, price: '单价', amount: '数量', ... },
 *  }
 * @apiSuccessExample Error-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    code: 10404,
 *    msg: '该销售信息不存在!',
 *    data: []
 *  }
 * @apiSuccessExample Error-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    code: 10400,
 *    msg: '销售数量不能大于库存数量!',
 *    data: []
 *  }
 * @apiSuccessExample Error-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    code: 10400,
 *    msg: '请求参数错误!',
 *    data: []
 *  }
 * @apiSampleRequest http://localhost:9999/api/sales/:id
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
    let result = await salesService.update(ctx, models);
    if (result.code === 0) {
      resData.code = 10400;
      resData.msg = result.msg;
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
 * @api {delete} /sales/:id deleteSales
 * @apiName deleteSales
 * @apiGroup sales
 *
 * @apiParam {Number} id sales id
 *
 * @apiSuccessExample Success-Response-1:
 *  HTTP/1.1 200 OK
 *  {
 *    code: 10200,
 *    msg: '操作成功',
 *    data: { id: 1, price: '单价', amount: '数量', ... },
 *  }
 * @apiSuccessExample Error-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    code: 10404,
 *    msg: '该销售信息不存在!',
 *    data: []
 *  }
 * @apiSuccessExample Error-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    code: 10400,
 *    msg: '请求参数错误!',
 *    data: []
 *  }
 * @apiSampleRequest http://localhost:9999/api/sales/:id
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
    let result = await salesService.delete(ctx, models);
    if (!result) {
      resData.msg = "该销售信息不存在!";
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
