const fs = require("fs");
const path = require("path");
const Router = require("koa-router");

const router = new Router();
router.prefix("/api");

fs.readdirSync(__dirname)
  .filter(fileName => {
    return fileName.indexOf(".") !== 0 && fileName !== "index.js";
  })
  .forEach(fileName => {
    router.use(`/${path.basename(fileName, ".controller.js")}`, require(`./${fileName}`).routes());
  });
/**
 * @apiDefine commonRequestParams
 * @apiParam {Number} [p] 页码
 * @apiParam {Number} [p_size] 每页条数
 * @apiParam {Number} [status] 状态 1->启用,0->禁用
 * @apiParam {String} [keys] 查询关键字
 */
/**
 * @apiDefine commonRequestExample
 * @apiParamExample {json} Request-Example-1:
 *  {
 *    p: 1,
 *    p_size: 10,
 *    status: 1,
 *    keys: 'example'
 *  }
 * @apiParamExample {json} Request-Example-2:
 *  {
 *    status: 1,
 *    keys: 'example'
 *  }
 */

/**
 * @apiDefine commonResponseParams
 * @apiSuccess {Number} [code=10200] 状态码
 * @apiSuccess {String} [msg='操作成功'] 提示信息
 * @apiSuccess {Number} [p] 当前页码
 * @apiSuccess {Number} [p_size] 当前每页条数
 * @apiSuccess {Number} [total] 查询结果总条数
 * @apiSuccess {Array} [rows] 结果集
 */

/**
 * @api {all} /userss allPathNotMatched
 * @apiName allPath
 * @apiGroup all
 *
 * @apiSuccess {Object} result 200
 * @apiSuccessExample Error-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    code: 10404,
 *    data: [],
 *    msg: 'Not matched to any routing'
 *  }
 */
router.all("/*", async (ctx, next) => {
  await next();
  ctx.body = { code: 10404, msg: "Not matched to any routing" };
});

exports = module.exports = router;
