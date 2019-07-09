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
  ctx.status = 200;
  if (ctx.status == 500) {
    resData.code = 10500;
    resData.msg = "服务器内部错误";
    ctx.body = resData;
  }
  logUtils.logAccess(ctx);
};
