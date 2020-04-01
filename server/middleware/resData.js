const logUtils = require("../utils/logUtils");
exports = module.exports = async (ctx, next) => {
  ctx.logUtils = logUtils;
  ctx.resData = {
    code: 10200,
    msg: "操作成功",
    data: []
  };

  await next();

  let { resData } = ctx;
  if (ctx.status == 400) {
    resData.code = 10400;
    resData.msg = "请求参数错误";
    ctx.body = resData;
  }

  if (ctx.status == 500) {
    resData.code = 10500;
    resData.msg = "服务器内部错误";
    ctx.body = resData;
  }

  logUtils.logAccess(ctx);
};
