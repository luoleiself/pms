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
 * @apiSampleRequest http://localhost:9999/api/roles
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

// router.all('/([^\d].*)', async (ctx, next) => {
//   await next();
//   let { resData } = ctx;
//   resData.code = 10404;
//   resData.msg = "未匹配到正确资源操作路由!";
//   ctx.body = resData;
// });

exports = module.exports = router;
